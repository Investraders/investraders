import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CalendarDays, Plus, X, Clock, Tag } from 'lucide-react';
import { format, isFuture, isPast, isToday } from 'date-fns';

const EVENT_TYPE_STYLES = {
  discussion: 'bg-blue-100 text-blue-700',
  meeting: 'bg-purple-100 text-purple-700',
  webinar: 'bg-green-100 text-green-700',
  analysis: 'bg-amber-100 text-amber-700',
  other: 'bg-slate-100 text-slate-700',
};

export default function CircleEventCalendar({ circleId, isMember }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    event_date: '',
    event_type: 'discussion',
  });

  const { data: events = [] } = useQuery({
    queryKey: ['circle-events', circleId],
    queryFn: () => base44.entities.CircleEvent.filter({ circle_id: circleId }, 'event_date', 20),
  });

  const createEvent = useMutation({
    mutationFn: () =>
      base44.entities.CircleEvent.create({
        ...form,
        circle_id: circleId,
        author_name: user?.full_name || user?.email?.split('@')[0] || 'Member',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['circle-events', circleId] });
      setForm({ title: '', description: '', event_date: '', event_type: 'discussion' });
      setShowForm(false);
    },
  });

  const deleteEvent = useMutation({
    mutationFn: (id) => base44.entities.CircleEvent.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['circle-events', circleId] }),
  });

  const upcoming = events.filter((e) => isFuture(new Date(e.event_date)) || isToday(new Date(e.event_date)));
  const past = events.filter((e) => isPast(new Date(e.event_date)) && !isToday(new Date(e.event_date)));

  const EventItem = ({ event }) => (
    <div className="flex items-start gap-3 p-3 rounded-xl border bg-white hover:shadow-sm transition-shadow">
      <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-primary/10 shrink-0">
        <span className="text-[10px] text-primary font-semibold uppercase">
          {format(new Date(event.event_date), 'MMM')}
        </span>
        <span className="text-lg font-bold text-primary leading-none">
          {format(new Date(event.event_date), 'd')}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold truncate">{event.title}</p>
          {event.created_by_id === user?.id && (
            <button
              onClick={() => deleteEvent.mutate(event.id)}
              className="text-muted-foreground hover:text-destructive shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {format(new Date(event.event_date), 'h:mm a')}
          </span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${EVENT_TYPE_STYLES[event.event_type] || EVENT_TYPE_STYLES.other}`}>
            {event.event_type}
          </span>
        </div>
        {event.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{event.description}</p>
        )}
        <p className="text-[10px] text-muted-foreground mt-1">by {event.author_name}</p>
      </div>
    </div>
  );

  return (
    <div className="px-6 pb-6">
      <div className="border rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-primary" /> Events
          </h3>
          {isMember && (
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs rounded-full"
              onClick={() => setShowForm(!showForm)}
            >
              <Plus className="w-3 h-3 mr-1" /> Schedule
            </Button>
          )}
        </div>

        <div className="p-4 space-y-4">
          {/* Create Form */}
          {showForm && (
            <div className="border rounded-xl p-4 space-y-3 bg-muted/30">
              <Input
                placeholder="Event title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="h-9 text-sm"
              />
              <Textarea
                placeholder="Description (optional)"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="min-h-[60px] text-sm"
              />
              <div className="flex gap-2">
                <input
                  type="datetime-local"
                  value={form.event_date}
                  onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                  className="flex-1 h-9 text-sm border border-input rounded-md px-3 bg-background"
                />
                <select
                  value={form.event_type}
                  onChange={(e) => setForm({ ...form, event_type: e.target.value })}
                  className="h-9 text-sm border border-input rounded-md px-2 bg-background"
                >
                  <option value="discussion">Discussion</option>
                  <option value="meeting">Meeting</option>
                  <option value="webinar">Webinar</option>
                  <option value="analysis">Analysis</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="rounded-full bg-primary"
                  disabled={!form.title.trim() || !form.event_date}
                  onClick={() => createEvent.mutate()}
                >
                  Create Event
                </Button>
                <Button size="sm" variant="outline" className="rounded-full" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Upcoming */}
          {upcoming.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Upcoming</p>
              {upcoming.map((e) => <EventItem key={e.id} event={e} />)}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No upcoming events. {isMember && 'Schedule one!'}
            </p>
          )}

          {/* Past */}
          {past.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Past</p>
              {past.slice(0, 3).map((e) => (
                <div key={e.id} className="opacity-50">
                  <EventItem event={e} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}