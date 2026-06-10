import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, FileText, Download, FileSpreadsheet, File } from 'lucide-react';
import EmojiReactions from '@/components/feed/EmojiReactions';
import CommentSection from '@/components/feed/CommentSection';
import SharePostModal from '@/components/feed/SharePostModal';
import { Badge } from '@/components/ui/badge';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

export default function PostCard({ post }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const liked = post.liked_by?.includes(user?.id);
  const saved = post.saved_by?.includes(user?.id);

  // If post has no saved avatar, look up the author's current profile avatar
  const { data: authorProfile } = useQuery({
    queryKey: ['author-profile', post.created_by_id],
    queryFn: () => base44.entities.User.filter({ id: post.created_by_id }),
    enabled: !post.author_avatar && !!post.created_by_id,
    select: (data) => data?.[0],
  });
  const resolvedAvatar = post.author_avatar || authorProfile?.avatar_url || null;

  const toggleLike = useMutation({
    mutationFn: async () => {
      const likedBy = post.liked_by || [];
      const newLikedBy = liked ? likedBy.filter((id) => id !== user?.id) : [...likedBy, user?.id];
      await base44.entities.Post.update(post.id, { liked_by: newLikedBy, likes: newLikedBy.length });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  });

  const toggleSave = useMutation({
    mutationFn: async () => {
      const savedBy = post.saved_by || [];
      const newSavedBy = saved ? savedBy.filter((id) => id !== user?.id) : [...savedBy, user?.id];
      await base44.entities.Post.update(post.id, { saved_by: newSavedBy });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['saved-posts', user?.id] });
    },
  });

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {resolvedAvatar ? (
            <img src={resolvedAvatar} alt={post.author_name} className="w-11 h-11 rounded-full object-cover" />
          ) : (
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center text-white font-bold text-sm">
              {post.author_name?.charAt(0) || 'U'}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold">{post.author_name || 'Unknown'}</p>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-[10px] px-2 py-0">
                {post.visibility || 'Public'}
              </Badge>
            </div>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-sm text-foreground leading-relaxed">{post.content}</p>
      </div>

      {post.image_url && (
        <div className="px-4 pb-3">
          <img src={post.image_url} alt="" className="w-full rounded-xl object-cover max-h-96" />
        </div>
      )}

      {post.video_url && (
        <div className="px-4 pb-3">
          <video src={post.video_url} controls className="w-full rounded-xl max-h-96 bg-black" />
        </div>
      )}

      {post.file_url && (
        <div className="px-4 pb-3">
          <a
            href={post.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 transition-colors group"
          >
            {post.file_type?.includes('spreadsheet') || post.file_name?.match(/\.(xls|xlsx|csv)$/i)
              ? <FileSpreadsheet className="w-8 h-8 text-green-600 shrink-0" />
              : post.file_type?.includes('pdf') || post.file_name?.match(/\.pdf$/i)
              ? <FileText className="w-8 h-8 text-red-500 shrink-0" />
              : <File className="w-8 h-8 text-amber-600 shrink-0" />
            }
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-amber-800 truncate">{post.file_name || 'Attached Document'}</p>
              <p className="text-xs text-amber-600">Click to open</p>
            </div>
            <Download className="w-4 h-4 text-amber-500 group-hover:text-amber-700 shrink-0" />
          </a>
        </div>
      )}

      <div className="px-4 pb-2">
        <p className="text-xs text-muted-foreground">
          {post.created_date ? format(new Date(post.created_date), 'dd MMM yyyy') : ''}
        </p>
      </div>

      <div className="px-4 pb-3">
        <EmojiReactions post={post} />
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button
            onClick={() => toggleLike.mutate()}
            className={`flex items-center gap-1.5 text-sm transition-colors ${liked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'}`}
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            <span>{post.likes || 0}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className={`flex items-center gap-1.5 text-sm transition-colors ${showComments ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Comment</span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowShare(true)}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => toggleSave.mutate()}
            className={`transition-colors ${saved ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
          >
            <Bookmark className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {showComments && (
        <div className="px-4 pb-4 border-t pt-3">
          <CommentSection postId={post.id} />
        </div>
      )}

      {showShare && <SharePostModal post={post} onClose={() => setShowShare(false)} />}
    </div>
  );
}