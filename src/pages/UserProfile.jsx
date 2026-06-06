import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import ProfileRing from '@/components/profile/ProfileRing';
import CirclesGrid from '@/components/profile/CirclesGrid';
import AboutCard from '@/components/profile/AboutCard';
import PhotosCard from '@/components/profile/PhotosCard';
import PostCard from '@/components/feed/PostCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function UserProfile() {
  const { user } = useAuth();

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['user-posts', user?.id],
    queryFn: () => base44.entities.Post.filter({ created_by_id: user?.id }, '-created_date', 5),
    enabled: !!user?.id,
  });

  return (
    <div className="max-w-5xl mx-auto">
      {/* Top section: profile ring left, circles grid right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Left – profile ring */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden relative">
          {/* Decorative blobs */}
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-blue-100/60 -translate-x-8 translate-y-8 pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-blue-100/40 translate-x-6 -translate-y-6 pointer-events-none" />
          <ProfileRing user={user} />
        </div>

        {/* Right – circles grid */}
        <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
          <CirclesGrid userId={user?.id} />
        </div>
      </div>

      {/* Bottom section: left column (about + photos), right column (posts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-4">
          <AboutCard user={user} />
          <PhotosCard />
        </div>

        {/* Right column – posts feed */}
        <div className="space-y-4">
          {isLoading ? (
            Array(2).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="w-28 h-4" />
                    <Skeleton className="w-16 h-3" />
                  </div>
                </div>
                <Skeleton className="w-full h-16" />
                <Skeleton className="w-full h-48" />
              </div>
            ))
          ) : posts.length === 0 ? (
            // Show sample post if no real posts yet
            <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center text-white font-bold text-sm">S</div>
                  <div>
                    <p className="text-sm font-semibold">Sadique Akhtar</p>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                      <span className="text-xs text-muted-foreground">Public</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                </p>
              </div>
              <div className="px-4 pb-4">
                <img
                  src="https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&h=400&fit=crop"
                  alt="post"
                  className="w-full rounded-xl object-cover max-h-56"
                />
              </div>
              <div className="px-4 pb-3">
                <p className="text-xs text-muted-foreground">Post on : 4 Feb 2021</p>
              </div>
            </div>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>
      </div>
    </div>
  );
}