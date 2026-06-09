import React, { useState } from 'react';
import { X, Image, Type, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function CreateStoryModal({ onClose, onCreated }) {
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const submit = async () => {
    if (!text && !imageFile) return;
    setLoading(true);
    let image_url = null;
    if (imageFile) {
      const res = await base44.integrations.Core.UploadFile({ file: imageFile });
      image_url = res.file_url;
    }
    const userData = await base44.entities.User.filter({ id: user.id });
    const profile = userData?.[0];
    await base44.entities.Story.create({
      author_id: user.id,
      author_name: user.full_name || user.email?.split('@')[0],
      author_avatar: profile?.avatar_url || null,
      image_url,
      text: text || null,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      viewed_by: [],
      reactions: {},
    });
    setLoading(false);
    onCreated?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="font-semibold">Create Story</h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-muted">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          {/* Image Preview */}
          {preview && (
            <div className="relative rounded-xl overflow-hidden h-48">
              <img src={preview} className="w-full h-full object-cover" alt="" />
              <button
                className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1"
                onClick={() => { setPreview(null); setImageFile(null); }}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Text */}
          <Textarea
            placeholder="What's on your mind? (shown on story)"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[80px] text-sm resize-none"
          />

          {/* Image upload */}
          <label className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Image className="w-4 h-4" />
            {imageFile ? imageFile.name : 'Add Image'}
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>

          <Button
            className="w-full rounded-full bg-primary"
            disabled={(!text && !imageFile) || loading}
            onClick={submit}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Share Story
          </Button>
        </div>
      </div>
    </div>
  );
}