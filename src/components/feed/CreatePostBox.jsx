import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Image, Video, CircleDot, FileText, X, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const ACCEPTED = '.pdf,.xls,.xlsx,.csv,.doc,.docx';

export default function CreatePostBox() {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [attachedFile, setAttachedFile] = useState(null); // { url, name, type }
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();
  const displayName = user?.full_name || user?.email?.split('@')[0] || 'User';

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setAttachedFile({ url: file_url, name: file.name, type: file.type });
    setUploading(false);
    e.target.value = '';
  };

  const createPost = useMutation({
    mutationFn: (data) => base44.entities.Post.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setContent('');
    },
  });

  const handlePost = () => {
    if (!content.trim()) return;
    createPost.mutate({
      content,
      author_name: displayName,
      post_type: attachedFile ? 'document' : 'text',
      visibility: 'public',
      likes: 0,
      liked_by: [],
      ...(attachedFile && {
        file_url: attachedFile.url,
        file_name: attachedFile.name,
        file_type: attachedFile.type,
      }),
    });
    setAttachedFile(null);
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-4 mb-5 shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {displayName.charAt(0)}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">Hello! {displayName}</p>
          <p className="text-xs text-muted-foreground">What's in your mind to post today..</p>
        </div>
      </div>

      <Textarea
        placeholder="Write something what you want post..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[80px] border-border resize-none mb-3"
      />

      {/* File attachment preview */}
      {attachedFile && (
        <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200">
          <FileText className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="text-xs text-amber-700 font-medium flex-1 truncate">{attachedFile.name}</span>
          <button onClick={() => setAttachedFile(null)} className="text-amber-400 hover:text-amber-600">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <input ref={fileInputRef} type="file" accept={ACCEPTED} className="hidden" onChange={handleFileSelect} />

      <div className="flex items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
            <CircleDot className="w-3.5 h-3.5" /> Circle
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 text-xs font-medium hover:bg-green-500/20 transition-colors">
            <Image className="w-3.5 h-3.5" /> Photo
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-600 text-xs font-medium hover:bg-purple-500/20 transition-colors">
            <Video className="w-3.5 h-3.5" /> Video
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 text-xs font-medium hover:bg-amber-500/20 transition-colors disabled:opacity-50"
          >
            {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5" />}
            {uploading ? 'Uploading...' : 'File'}
          </button>
        </div>
        <Button
          onClick={handlePost}
          disabled={!content.trim() || createPost.isPending}
          size="sm"
          className="rounded-full bg-primary hover:bg-primary/90 px-5"
        >
          Post
        </Button>
      </div>
    </div>
  );
}