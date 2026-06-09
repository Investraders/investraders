import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, CheckCircle, X } from 'lucide-react';

export default function PendingInvites() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: invites = [] } = useQuery({
    queryKey: ['pending-invites', user?.id],
    queryFn: () => base44.entities.CircleInvite.filter({ invitee_id: user?.id, status: 'pending' }),
    enabled: !!user?.id,
    refetchInterval: 20000,
  });

  const acceptInvite = useMutation({
    mutationFn: async (invite) => {
      const circles = await base44.entities.Circle.filter({ id: invite.circle_id });
      const circle = circles[0];
      const members = circle?.member_ids || [];
      if (!members.includes(user.id)) {
        await base44.entities.Circle.update(invite.circle_id, { member_ids: [...members, user.id] });
      }
      await base44.entities.CircleInvite.update(invite.id, { status: 'accepted' });
      return invite.circle_id;
    },
    onSuccess: (circleId) => {
      queryClient.invalidateQueries({ queryKey: ['pending-invites', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['circle', circleId] });
      navigate(`/circle/${circleId}`);
    },
  });

  const declineInvite = useMutation({
    mutationFn: (id) => base44.entities.CircleInvite.update(id, { status: 'declined' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pending-invites', user?.id] }),
  });

  if (invites.length === 0) return null;

  return (
    <div className="mb-5 bg-card rounded-2xl border border-primary/20 shadow-sm overflow-hidden">
      <div className="px-4 py-3 bg-primary/5 border-b border-primary/10">
        <h3 className="text-sm font-semibold flex items-center gap-2 text-primary">
          <Users className="w-4 h-4" />
          Circle Invitations ({invites.length})
        </h3>
      </div>
      <div className="divide-y">
        {invites.map((invite) => (
          <div key={invite.id} className="flex items-center gap-3 px-4 py-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center text-white text-sm font-bold shrink-0">
              {invite.circle_name?.charAt(0) || '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{invite.circle_name}</p>
              <p className="text-xs text-muted-foreground">from {invite.inviter_name}</p>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <Button
                size="sm"
                variant="outline"
                className="h-7 px-2 text-xs rounded-full text-destructive border-destructive/30 hover:bg-destructive/10"
                onClick={() => declineInvite.mutate(invite.id)}
                disabled={declineInvite.isPending}
              >
                <X className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                className="h-7 px-3 text-xs rounded-full bg-primary gap-1"
                onClick={() => acceptInvite.mutate(invite)}
                disabled={acceptInvite.isPending}
              >
                <CheckCircle className="w-3 h-3" /> Accept
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}