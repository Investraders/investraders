import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Link2, Check, Search, UserPlus, Copy } from 'lucide-react';
import { getAppUrl } from '@/lib/app-url';

function generateToken() {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

export default function InviteToCircleModal({ circle, onClose }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [inviteLink, setInviteLink] = useState(null);
  const [sentTo, setSentTo] = useState([]); // user IDs already invited this session

  // Fetch accepted connections
  const { data: sentConns = [] } = useQuery({
    queryKey: ['conns-sent', user?.id],
    queryFn: () => base44.entities.Connection.filter({ requester_id: user?.id, status: 'accepted' }),
    enabled: !!user?.id,
  });
  const { data: receivedConns = [] } = useQuery({
    queryKey: ['conns-received', user?.id],
    queryFn: () => base44.entities.Connection.filter({ recipient_id: user?.id, status: 'accepted' }),
    enabled: !!user?.id,
  });

  const connectionIds = useMemo(() => {
    const ids = new Set();
    sentConns.forEach((c) => ids.add(c.recipient_id));
    receivedConns.forEach((c) => ids.add(c.requester_id));
    return [...ids].filter((id) => !(circle.member_ids || []).includes(id));
  }, [sentConns, receivedConns, circle.member_ids]);

  const { data: allUsers = [] } = useQuery({
    queryKey: ['all-users-invite'],
    queryFn: () => base44.entities.User.list(),
    enabled: connectionIds.length > 0,
  });

  const connections = useMemo(
    () => allUsers.filter((u) => connectionIds.includes(u.id)),
    [allUsers, connectionIds]
  );

  const filtered = connections.filter((u) =>
    u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const sendInvite = useMutation({
    mutationFn: async ({ inviteeId, inviteeName }) => {
      await base44.entities.CircleInvite.create({
        circle_id: circle.id,
        circle_name: circle.name,
        inviter_id: user.id,
        inviter_name: user.full_name || user.email?.split('@')[0],
        invitee_id: inviteeId,
        status: 'pending',
        token: generateToken(),
      });
      // Notify the invitee
      const inviterName = user.full_name || user.email?.split('@')[0] || 'Someone';
      await base44.entities.Notification.create({
        user_id: inviteeId,
        type: 'circle_invite',
        message: `${inviterName} invited you to join ${circle.name}`,
        circle_id: circle.id,
        circle_name: circle.name,
        is_read: false,
      });
    },
    onSuccess: (_, vars) => {
      setSentTo((prev) => [...prev, vars.inviteeId]);
      queryClient.invalidateQueries({ queryKey: ['circle-invites'] });
    },
  });

  const generateLink = useMutation({
    mutationFn: async () => {
      const token = generateToken();
      await base44.entities.CircleInvite.create({
        circle_id: circle.id,
        circle_name: circle.name,
        inviter_id: user.id,
        inviter_name: user.full_name || user.email?.split('@')[0],
        status: 'pending',
        token,
      });
      return token;
    },
    onSuccess: (token) => {
      const link = `${getAppUrl()}/join-circle?token=${token}`;
      setInviteLink(link);
    },
  });

  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-card rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div>
            <h2 className="font-semibold text-base">Invite to {circle.name}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Send via connection or share a link</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-muted">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Invite link section */}
          <div className="border rounded-xl p-3 bg-muted/30 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5" /> Invite Link
            </p>
            {inviteLink ? (
              <div className="flex gap-2">
                <Input value={inviteLink} readOnly className="h-8 text-xs rounded-lg" />
                <Button size="sm" variant="outline" className="h-8 shrink-0 rounded-lg gap-1" onClick={copyLink}>
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedLink ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="w-full h-8 text-xs rounded-lg gap-1.5"
                onClick={() => generateLink.mutate()}
                disabled={generateLink.isPending}
              >
                <Link2 className="w-3.5 h-3.5" />
                {generateLink.isPending ? 'Generating...' : 'Generate Invite Link'}
              </Button>
            )}
          </div>

          {/* Connections picker */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
              <UserPlus className="w-3.5 h-3.5" /> From Your Connections
            </p>
            {connectionIds.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4 bg-muted/30 rounded-xl">
                You have no connections who aren't already members.
              </p>
            ) : (
              <>
                <div className="relative mb-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search connections..."
                    className="pl-8 h-8 text-xs rounded-lg"
                  />
                </div>
                <div className="max-h-52 overflow-y-auto space-y-1">
                  {filtered.length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-3">No results</p>
                  )}
                  {filtered.map((u) => {
                    const alreadySent = sentTo.includes(u.id);
                    return (
                      <div key={u.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted transition-colors">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center text-white text-xs font-bold overflow-hidden shrink-0">
                          {u.avatar_url ? (
                            <img src={u.avatar_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            u.full_name?.charAt(0) || '?'
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{u.full_name || u.email}</p>
                        </div>
                        <Button
                          size="sm"
                          variant={alreadySent ? 'secondary' : 'default'}
                          className="h-7 text-xs rounded-full px-3 shrink-0"
                          disabled={alreadySent || sendInvite.isPending}
                          onClick={() => sendInvite.mutate({ inviteeId: u.id, inviteeName: u.full_name })}
                        >
                          {alreadySent ? <><Check className="w-3 h-3 mr-1" /> Sent</> : 'Invite'}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}