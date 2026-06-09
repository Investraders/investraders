import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { computeReputation } from '@/lib/reputation';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ShieldCheck } from 'lucide-react';

export default function ReputationBadges({ userId }) {
  const { data: posts = [], isLoading: loadingPosts } = useQuery({
    queryKey: ['rep-posts', userId],
    queryFn: () => base44.entities.Post.filter({ created_by_id: userId }),
    enabled: !!userId,
  });

  const { data: responses = [], isLoading: loadingResponses } = useQuery({
    queryKey: ['rep-responses', userId],
    queryFn: () => base44.entities.CircleResponse.filter({ created_by_id: userId }),
    enabled: !!userId,
  });

  const { data: sentConns = [] } = useQuery({
    queryKey: ['rep-conns-sent', userId],
    queryFn: () => base44.entities.Connection.filter({ requester_id: userId }),
    enabled: !!userId,
  });

  const { data: receivedConns = [] } = useQuery({
    queryKey: ['rep-conns-received', userId],
    queryFn: () => base44.entities.Connection.filter({ recipient_id: userId }),
    enabled: !!userId,
  });

  const { data: circles = [], isLoading: loadingCircles } = useQuery({
    queryKey: ['rep-circles'],
    queryFn: () => base44.entities.Circle.list(),
    enabled: !!userId,
  });

  const isLoading = loadingPosts || loadingResponses || loadingCircles;

  const { earnedBadges, stats } = useMemo(() => {
    if (!userId) return { earnedBadges: [], stats: {} };
    return computeReputation({
      userId,
      posts,
      responses,
      connections: [...sentConns, ...receivedConns],
      circles,
    });
  }, [userId, posts, responses, sentConns, receivedConns, circles]);

  if (isLoading) {
    return (
      <div className="flex gap-2 flex-wrap">
        {Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-7 w-28 rounded-full" />)}
      </div>
    );
  }

  if (earnedBadges.length === 0) return null;

  return (
    <TooltipProvider>
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          <ShieldCheck className="w-3.5 h-3.5" /> Reputation
        </div>
        <div className="flex flex-wrap gap-2">
          {earnedBadges.map((badge) => (
            <Tooltip key={badge.id}>
              <TooltipTrigger asChild>
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border cursor-default select-none ${badge.color}`}
                >
                  <span>{badge.emoji}</span>
                  {badge.label}
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                {badge.description}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Mini stats */}
        <div className="flex flex-wrap gap-3 pt-1">
          {[
            { label: 'Posts', value: stats.postCount },
            { label: 'Responses', value: stats.responseCount },
            { label: 'Upvotes', value: stats.totalUpvotes },
            { label: 'Likes received', value: stats.totalLikes },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-sm font-bold text-foreground">{value}</p>
              <p className="text-[10px] text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}