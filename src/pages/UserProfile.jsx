import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PostCard from '@/components/feed/PostCard';
import ConnectionButton from '@/components/profile/ConnectionButton';
import CirclesGrid from '@/components/profile/CirclesGrid';
import { Camera, MapPin, Edit2, Check, X, Users, Loader2 } from 'lucide-react';

export default function UserProfile() {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const queryClient = useQueryClient();

  const isOwnProfile = !userId || userId === currentUser?.id;
  const profileId = isOwnProfile ? currentUser?.id : userId;

  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(null); // 'avatar' | 'cover' | null
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [localProfile, setLocalProfile] = useState({
    headline: '',
    location: '',
    bio: '',
    avatar_url: '',
    cover_image_url: '',
  });

  const coverInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  // Sync localProfile from currentUser when not editing
  useEffect(() => {
    if (currentUser && isOwnProfile && !isEditing) {
      setLocalProfile({
        headline: currentUser.headline || '',
        location: currentUser.location || '',
        bio: currentUser.bio || '',
        avatar_url: currentUser.avatar_url || '',
        cover_image_url: currentUser.cover_image_url || '',
      });
    }
  }, [currentUser?.id, isEditing]);

  // Fetch other user's public profile
  const { data: otherProfile, isLoading: loadingOther } = useQuery({
    queryKey: ['public-profile', profileId],
    queryFn: async () => {
      const res = await base44.functions.invoke('getPublicProfile', { user_id: profileId });
      return res.data;
    },
    enabled: !isOwnProfile && !!profileId,
  });

  const profile = isOwnProfile ? localProfile : otherProfile;
  const displayName = isOwnProfile
    ? (currentUser?.full_name || currentUser?.email?.split('@')[0] || 'User')
    : (otherProfile?.full_name || otherProfile?.email?.split('@')[0] || 'User');

  // Save profile
  const saveProfile = useMutation({
    mutationFn: () => base44.auth.updateMe({
      headline: localProfile.headline,
      location: localProfile.location,
      bio: localProfile.bio,
    }),
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const handleImageUpload = async (file, type) => {
    setUploading(type);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    const update = type === 'avatar' ? { avatar_url: file_url } : { cover_image_url: file_url };
    await base44.auth.updateMe(update);
    setLocalProfile((p) => ({ ...p, ...update }));
    setUploading(null);
  };

  // Connections count
  const { data: sentConns = [] } = useQuery({
    queryKey: ['profile-conns-sent', profileId],
    queryFn: () => base44.entities.Connection.filter({ requester_id: profileId }),
    enabled: !!profileId,
  });
  const { data: receivedConns = [] } = useQuery({
    queryKey: ['profile-conns-received', profileId],
    queryFn: () => base44.entities.Connection.filter({ recipient_id: profileId }),
    enabled: !!profileId,
  });
  const connectionsCount = [...sentConns, ...receivedConns].filter((c) => c.status === 'accepted').length;

  // Posts
  const { data: posts = [] } = useQuery({
    queryKey: ['profile-posts', profileId],
    queryFn: () => base44.entities.Post.filter({ created_by_id: profileId }, '-created_date', 5),
    enabled: !!profileId,
  });

  const avatarUrl = isOwnProfile ? localProfile.avatar_url : otherProfile?.avatar_url;
  const coverUrl = isOwnProfile ? localProfile.cover_image_url : otherProfile?.cover_image_url;

  if (!isOwnProfile && loadingOther) {
    return (
      <div className="max-w-2xl mx-auto flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-3 pb-8">
      {/* Cover + Avatar */}
      <div className="relative">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-400 rounded-2xl overflow-hidden relative">
          {coverUrl && (
            <img src={coverUrl} alt="cover" className="w-full h-full object-cover" />
          )}
          {isOwnProfile && (
            <label className="absolute bottom-3 right-3 cursor-pointer bg-black/40 hover:bg-black/60 text-white p-2 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-medium">
              {uploading === 'cover' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
              Edit Cover
              <input
                ref={coverInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => e.target.files[0] && handleImageUpload(e.target.files[0], 'cover')}
              />
            </label>
          )}
        </div>

        {/* Avatar */}
        <div className="absolute -bottom-12 left-6">
          <div className="relative">
            <div
              className={`w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-gradient-to-br from-blue-400 to-cyan-300 shadow-lg ${!isOwnProfile ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
              onClick={() => !isOwnProfile && setLightboxOpen(true)}
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            {isOwnProfile && (
              <label className="absolute bottom-0 right-0 cursor-pointer bg-primary text-white p-1.5 rounded-full shadow-md hover:bg-primary/90 transition-colors">
                {uploading === 'avatar' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Camera className="w-3 h-3" />}
                <input
                  ref={avatarInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => e.target.files[0] && handleImageUpload(e.target.files[0], 'avatar')}
                />
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-card rounded-2xl border shadow-sm pt-16 pb-5 px-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-foreground">{displayName}</h1>

            {isOwnProfile && isEditing ? (
              <Input
                value={localProfile.headline}
                onChange={(e) => setLocalProfile((p) => ({ ...p, headline: e.target.value }))}
                placeholder="Headline (e.g. Investor & Crypto Enthusiast)"
                className="mt-1.5 h-8 text-sm"
              />
            ) : (
              profile?.headline && (
                <p className="text-sm text-foreground mt-1">{profile.headline}</p>
              )
            )}

            {isOwnProfile && isEditing ? (
              <div className="flex items-center gap-2 mt-1.5">
                <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <Input
                  value={localProfile.location}
                  onChange={(e) => setLocalProfile((p) => ({ ...p, location: e.target.value }))}
                  placeholder="Location"
                  className="h-7 text-xs"
                />
              </div>
            ) : (
              profile?.location && (
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" /> {profile.location}
                </p>
              )
            )}

            <p className="text-sm text-primary font-medium mt-1.5 flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {connectionsCount} connection{connectionsCount !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 mt-1">
            {isOwnProfile ? (
              isEditing ? (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="rounded-full bg-primary h-8"
                    onClick={() => saveProfile.mutate()}
                    disabled={saveProfile.isPending}
                  >
                    <Check className="w-3.5 h-3.5 mr-1" /> Save
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-full h-8" onClick={() => setIsEditing(false)}>
                    <X className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ) : (
                <Button size="sm" variant="outline" className="rounded-full h-8 gap-1.5" onClick={() => setIsEditing(true)}>
                  <Edit2 className="w-3.5 h-3.5" /> Edit Profile
                </Button>
              )
            ) : (
              <ConnectionButton currentUserId={currentUser?.id} targetUserId={profileId} />
            )}
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-card rounded-2xl border shadow-sm p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold">About</h2>
        </div>
        {isOwnProfile && isEditing ? (
          <Textarea
            value={localProfile.bio}
            onChange={(e) => setLocalProfile((p) => ({ ...p, bio: e.target.value }))}
            placeholder="Tell your story — your background, investment philosophy, interests..."
            className="min-h-[100px] text-sm"
          />
        ) : (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {profile?.bio || (isOwnProfile ? 'Add a bio to tell others about yourself...' : 'No bio yet.')}
          </p>
        )}
      </div>

      {/* Circles */}
      <div className="bg-card rounded-2xl border shadow-sm p-6">
        <h2 className="text-base font-semibold mb-4">Circles</h2>
        <CirclesGrid userId={profileId} />
      </div>

      {/* Recent Activity */}
      {posts.length > 0 && (
        <div>
          <h2 className="text-base font-semibold mb-3 px-1">Recent Activity</h2>
          <div className="space-y-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* Lightbox — other user's profile picture */}
      {lightboxOpen && !isOwnProfile && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button className="absolute top-4 right-4 text-white p-2 hover:text-gray-300">
            <X className="w-6 h-6" />
          </button>
          <div className="text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-64 h-64 rounded-full overflow-hidden mx-auto border-4 border-white shadow-2xl">
              {avatarUrl ? (
                <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-cyan-300 text-white text-8xl font-bold">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <p className="text-white text-center font-semibold text-xl mt-4">{displayName}</p>
            {otherProfile?.headline && (
              <p className="text-gray-300 text-sm mt-1">{otherProfile.headline}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}