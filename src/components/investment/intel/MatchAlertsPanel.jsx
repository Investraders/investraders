import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Bell, BellRing, Loader2, ArrowRight, Sparkles } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { matchProjectsToInvestor } from '@/lib/investmentNetwork';
import { formatMTND } from '@/lib/investment';

export default function MatchAlertsPanel({ projects, sectors, governorates }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);

  const { data: myOrgs = [] } = useQuery({
    queryKey: ['my-investment-org', user?.id],
    queryFn: () => base44.entities.InvestmentOrganization.filter({ created_by_id: user.id }),
    enabled: !!user?.id,
  });
  const { data: alerts = [] } = useQuery({
    queryKey: ['my-match-alert', user?.id],
    queryFn: () => base44.entities.MatchAlert.filter({ user_id: user.id }),
    enabled: !!user?.id,
  });

  const org = myOrgs[0] || null;
  const alert = alerts[0] || null;
  const enabled = !!alert?.enabled;
  const seen = alert?.seen_project_ids || [];

  const matches = useMemo(
    () => (org ? matchProjectsToInvestor(projects, org, sectors, governorates) : []),
    [org, projects, sectors, governorates]
  );
  const newMatches = useMemo(() => matches.filter((m) => !seen.includes(m.project.id)), [matches, seen]);

  const refresh = () => queryClient.invalidateQueries({ queryKey: ['my-match-alert', user?.id] });

  const enable = async () => {
    if (!org) {
      toast({ title: 'Create an investor profile first', description: 'Match alerts use your investment mandate.' });
      return;
    }
    setSaving(true);
    try {
      if (alert) {
        await base44.entities.MatchAlert.update(alert.id, {
          enabled: true, organization_id: org.id, seen_project_ids: matches.map((m) => m.project.id), last_checked: new Date().toISOString(),
        });
      } else {
        await base44.entities.MatchAlert.create({
          user_id: user.id, enabled: true, organization_id: org.id,
          seen_project_ids: matches.map((m) => m.project.id), last_checked: new Date().toISOString(),
        });
      }
      refresh();
      toast({ title: 'Match alerts enabled', description: `Watching for new opportunities matching ${org.display_name}.` });
    } finally {
      setSaving(false);
    }
  };

  const disable = async () => {
    if (!alert) return;
    setSaving(true);
    try {
      await base44.entities.MatchAlert.update(alert.id, { enabled: false });
      refresh();
    } finally {
      setSaving(false);
    }
  };

  const markSeen = async () => {
    if (!alert) return;
    setSaving(true);
    try {
      await base44.entities.MatchAlert.update(alert.id, {
        seen_project_ids: matches.map((m) => m.project.id), last_checked: new Date().toISOString(),
      });
      refresh();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border bg-card p-5 mb-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF9F43]/10 flex items-center justify-center shrink-0">
            {enabled ? <BellRing className="w-5 h-5 text-[#FF9F43]" /> : <Bell className="w-5 h-5 text-[#FF9F43]" />}
          </div>
          <div>
            <h2 className="font-semibold leading-tight flex items-center gap-2">
              Match Alerts
              {enabled && newMatches.length > 0 && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FF9F43] text-white">{newMatches.length} new</span>
              )}
            </h2>
            <p className="text-xs text-muted-foreground">Get alerted when new opportunities match your investment mandate.</p>
          </div>
        </div>
        {saving ? (
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        ) : (
          <Switch checked={enabled} onCheckedChange={(v) => (v ? enable() : disable())} />
        )}
      </div>

      <div className="mt-4">
        {!org ? (
          <div className="rounded-xl border border-dashed p-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="text-sm text-muted-foreground flex-1">Create your investor profile so alerts can match opportunities to your mandate.</p>
            <Button asChild size="sm" className="bg-[#1769FF] hover:bg-[#1769FF]/90 shrink-0">
              <Link to="/investment-network/profile">Create profile</Link>
            </Button>
          </div>
        ) : !enabled ? (
          <p className="text-sm text-muted-foreground">
            Alerts are off. Enable to track new opportunities matching <span className="font-medium text-foreground">{org.display_name}</span>.
          </p>
        ) : newMatches.length === 0 ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-[#20B26B]" /> You're up to date — {matches.length} matches tracked for {org.display_name}.
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">{newMatches.length} new match{newMatches.length > 1 ? 'es' : ''} since your last check</span>
              <button onClick={markSeen} className="text-xs font-medium text-[#1769FF] hover:underline">Mark all as seen</button>
            </div>
            <div className="space-y-2">
              {newMatches.slice(0, 5).map(({ project, sector, governorate, score }) => (
                <Link key={project.id} to={`/project/${project.id}`} className="flex items-center gap-3 rounded-xl border p-3 hover:shadow-md transition-all">
                  <div className="w-9 h-9 rounded-lg bg-[#20B26B]/10 flex items-center justify-center text-[#20B26B] text-xs font-bold shrink-0">{score}%</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{project.title}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {governorate?.name || 'Tunisia'}{sector ? ` · ${sector.name}` : ''} · {formatMTND(project.investment_required)}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#1769FF] shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}