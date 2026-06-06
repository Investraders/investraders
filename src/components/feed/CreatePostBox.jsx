import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Image, Video, CircleDot, Send } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function CreatePostBox() {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const displayName = user?.full_name || user?.email?.split('@')[0] || 'User';

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
      post_type: 'text',
      visibility: 'public',
      likes: 0,
      liked_by: [],
    });
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

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
            <CircleDot className="w-3.5 h-3.5" /> Circle
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 text-xs font-medium hover:bg-green-500/20 transition-colors">
            <Image className="w-3.5 h-3.5" /> Photo
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-600 text-xs font-medium hover:bg-purple-500/20 transition-colors">
            <Video className="w-3.5 h-3.5" /> Video
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