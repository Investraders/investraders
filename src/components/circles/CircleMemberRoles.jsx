import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Shield, Crown, User, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ROLE_CONFIG = {
  owner: { label: 'Owner', icon: Crown, className: 'bg-amber-100 text-amber-700 border-amber-200' },
  moderator: { label: 'Moderator', icon: Shield, className: 'bg-blue-100 text-blue-700 border-blue-200' },
  member: { label: 'Member', icon: User, className: 'bg-slate-100 text-slate-600 border-slate-200' },
};

function RoleBadge({ role }) {
  const config = ROLE_CONFIG[role] || ROLE_CONFIG.member;
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${config.className}`}>
      <Icon className="w-2.5 h-2.5" />
      {config.label}
    </span>
  );
}

function MemberRow({ userId, role, isOwner, circle, canManage }) {
  const queryClient = useQueryClient();
  const displayName = `Member ${userId.slice(-4)}`;

  const changeRole = useMutation({
    mutationFn: async (newRole) => {
      const modIds = circle.moderator_ids || [];
      if (newRole === 'moderator') {
        if (!modIds.includes(userId)) {
          await base44.entities.Circle.update(circle.id, { moderator_ids: [...modIds, userId] });
        }
      } else {
        await base44.entities.Circle.update(circle.id, {
          moderator_ids: modIds.filter((id) => id !== userId),
        });
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['circle', circle.id] }),
  });

  const removeMember = useMutation({
    mutationFn: async () => {
      const members = (circle.member_ids || []).filter((id) => id !== userId);
      const mods = (circle.moderator_ids || []).filter((id) => id !== userId);
      await base44.entities.Circle.update(circle.id, { member_ids: members, moderator_ids: mods });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['circle', circle.id] }),
  });

  return (
    <div className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-muted/40 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center text-white text-xs font-bold shrink-0">
          {userId.slice(-1).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-medium">{isOwner ? 'You (Owner)' : displayName}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <RoleBadge role={role} />
        {canManage && !isOwner && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-muted text-muted-foreground">
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-sm">
              {role !== 'moderator' && (
                <DropdownMenuItem onClick={() => changeRole.mutate('moderator')}>
                  <Shield className="w-3.5 h-3.5 mr-2 text-blue-600" /> Make Moderator
                </DropdownMenuItem>
              )}
              {role === 'moderator' && (
                <DropdownMenuItem onClick={() => changeRole.mutate('member')}>
                  <User className="w-3.5 h-3.5 mr-2 text-slate-500" /> Demote to Member
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => removeMember.mutate()}
                className="text-destructive focus:text-destructive"
              >
                Remove from Circle
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}

export default function CircleMemberRoles({ circle, currentUserId }) {
  const [expanded, setExpanded] = useState(false);
  const isOwner = circle?.created_by_id === currentUserId;
  const isModerator = (circle?.moderator_ids || []).includes(currentUserId);
  const canManage = isOwner || isModerator;

  const memberIds = circle?.member_ids || [];
  const moderatorIds = circle?.moderator_ids || [];

  const getRole = (userId) => {
    if (userId === circle?.created_by_id) return 'owner';
    if (moderatorIds.includes(userId)) return 'moderator';
    return 'member';
  };

  // Sort: owner first, then mods, then members
  const sorted = [...memberIds].sort((a, b) => {
    const order = { owner: 0, moderator: 1, member: 2 };
    return order[getRole(a)] - order[getRole(b)];
  });

  const displayed = expanded ? sorted : sorted.slice(0, 4);

  return (
    <div className="px-6 pb-6">
      <div className="border rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-50 to-blue-50 border-b">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" /> Members & Roles
          </h3>
          <span className="text-xs text-muted-foreground">{memberIds.length} total</span>
        </div>

        {/* Role legend */}
        <div className="px-4 py-2 flex gap-3 border-b bg-muted/20">
          {Object.entries(ROLE_CONFIG).map(([key, cfg]) => (
            <div key={key} className="flex items-center gap-1">
              <RoleBadge role={key} />
            </div>
          ))}
        </div>

        <div className="p-2">
          {memberIds.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No members yet</p>
          ) : (
            <>
              {/* Always show owner if not in member_ids */}
              {circle?.created_by_id && !memberIds.includes(circle.created_by_id) && (
                <MemberRow
                  key={circle.created_by_id}
                  userId={circle.created_by_id}
                  role="owner"
                  isOwner={circle.created_by_id === currentUserId}
                  circle={circle}
                  canManage={canManage}
                />
              )}
              {displayed.map((uid) => (
                <MemberRow
                  key={uid}
                  userId={uid}
                  role={getRole(uid)}
                  isOwner={uid === circle?.created_by_id && uid === currentUserId}
                  circle={circle}
                  canManage={canManage}
                />
              ))}
              {sorted.length > 4 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="w-full text-xs text-primary hover:underline py-2 text-center"
                >
                  {expanded ? 'Show less' : `Show ${sorted.length - 4} more`}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}