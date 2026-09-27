import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { useToast } from '@/components/ui/use-toast';

/**
 * Admin-only alert showing how many investment projects are waiting for review.
 * Updates live while the app is open.
 */
export default function PendingReviewAlert() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const subscribed = useRef(false);
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (!isAdmin) return undefined;
    let active = true;

    const refresh = async () => {
      try {
        const pending = await base44.entities.InvestmentProject.filter({ project_status: 'SUBMITTED' });
        if (active) setCount(pending.length);
      } catch {
        // leave the previous count in place
      }
    };

    refresh();

    const unsubscribe = base44.entities.InvestmentProject.subscribe((event) => {
      if (!active) return;
      if (subscribed.current && event.type === 'create' && event.data?.project_status === 'SUBMITTED') {
        toast({
          title: 'New project awaiting your review',
          description: event.data?.title || 'A new investment project was submitted.',
        });
      }
      refresh();
    });

    subscribed.current = true;

    return () => {
      active = false;
      subscribed.current = false;
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [isAdmin]);

  if (!isAdmin) return null;

  return (
    <button
      onClick={() => navigate('/admin?tab=Projects')}
      title="Projects awaiting your review"
      className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors relative"
    >
      <ClipboardList className="w-4 h-4 text-white" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 bg-amber-400 text-slate-900 text-[10px] rounded-full flex items-center justify-center font-bold">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  );
}