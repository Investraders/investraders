import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { Navigate } from 'react-router-dom';
import { Shield, Users, Trash2, BarChart2, FileText, Bell, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';

const TABS = ['Overview', 'Users', 'Posts', 'Circles'];

export default function AdminDashboard() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState('Overview');
  const [search, setSearch] = useState('');

  const { data: allUsers = [] } = useQuery({ queryKey: ['admin-users'], queryFn: () => base44.entities.User.list() });
  const { data: allPosts = [] } = useQuery({ queryKey: ['admin-posts'], queryFn: () => base44.entities.Post.list('-created_date', 100) });
  const { data: allCircles = [] } = useQuery({ queryKey: ['admin-circles'], queryFn: () => base44.entities.Circle.list() });
  const { data: allNotifications = [] } = useQuery({ queryKey: ['admin-notifs'], queryFn: () => base44.entities.Notification.list('-created_date', 50) });

  const deletePost = useMutation({
    mutationFn: (id) => base44.entities.Post.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-posts'] }),
  });

  const deleteCircle = useMutation({
    mutationFn: (id) => base44.entities.Circle.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-circles'] }),
  });

  const changeUserRole = useMutation({
    mutationFn: ({ id, role }) => base44.entities.User.update(id, { role }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  if (user?.role !== 'admin') return <Navigate to="/" replace />;

  const filteredUsers = allUsers.filter((u) =>
    (u.full_name || u.email || '').toLowerCase().includes(search.toLowerCase())
  );
  const filteredPosts = allPosts.filter((p) =>
    (p.content || '').toLowerCase().includes(search.toLowerCase())
  );
  const filteredCircles = allCircles.filter((c) =>
    (c.name || '').toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    { label: 'Total Users', value: allUsers.length, icon: Users, color: 'text-blue-500 bg-blue-50' },
    { label: 'Total Posts', value: allPosts.length, icon: FileText, color: 'text-green-500 bg-green-50' },
    { label: 'Total Circles', value: allCircles.length, icon: Circle, color: 'text-purple-500 bg-purple-50' },
    { label: 'Notifications Sent', value: allNotifications.length, icon: Bell, color: 'text-orange-500 bg-orange-50' },
  ];

  return (
    <div className="max-w-5xl mx-auto py-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Platform management & oversight</p>
        </div>
      </div>

      <div className="flex gap-1 mb-6 bg-muted/50 p-1 rounded-xl w-fit">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setSearch(''); }}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${tab === t ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab !== 'Overview' && (
        <Input
          placeholder={`Search ${tab.toLowerCase()}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 max-w-sm"
        />
      )}

      {tab === 'Overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-card border rounded-2xl p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-card border rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b font-semibold text-sm flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-primary" /> Recent Posts
            </div>
            <div className="divide-y">
              {allPosts.slice(0, 5).map((p) => (
                <div key={p.id} className="px-5 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {(p.author_name || 'U').charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{p.content?.slice(0, 80)}</p>
                    <p className="text-xs text-muted-foreground">{p.author_name} · {p.created_date ? format(new Date(p.created_date), 'MMM d') : ''}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'Users' && (
        <div className="bg-card border rounded-2xl overflow-hidden">
          <div className="divide-y">
            {filteredUsers.map((u) => (
              <div key={u.id} className="flex items-center gap-3 px-5 py-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center text-white text-sm font-bold shrink-0 overflow-hidden">
                  {u.avatar_url ? <img src={u.avatar_url} alt="" className="w-full h-full object-cover" /> : (u.full_name || u.email || 'U').charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{u.full_name || '—'}</p>
                  <p className="text-xs text-muted-foreground">{u.email}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>
                  {u.role || 'user'}
                </span>
                {u.id !== user.id && (
                  <Button size="sm" variant="outline" className="h-7 text-xs"
                    onClick={() => changeUserRole.mutate({ id: u.id, role: u.role === 'admin' ? 'user' : 'admin' })}>
                    {u.role === 'admin' ? 'Demote' : 'Make Admin'}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'Posts' && (
        <div className="bg-card border rounded-2xl overflow-hidden">
          <div className="divide-y">
            {filteredPosts.map((p) => (
              <div key={p.id} className="flex items-start gap-3 px-5 py-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                  {(p.author_name || 'U').charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm line-clamp-2">{p.content}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{p.author_name} · {p.created_date ? format(new Date(p.created_date), 'MMM d, yyyy') : ''} · {p.likes || 0} likes</p>
                </div>
                <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:bg-destructive/10 shrink-0"
                  onClick={() => deletePost.mutate(p.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'Circles' && (
        <div className="bg-card border rounded-2xl overflow-hidden">
          <div className="divide-y">
            {filteredCircles.map((c) => (
              <div key={c.id} className="flex items-center gap-3 px-5 py-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {(c.name || 'C').charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.member_ids?.length || 0} members · {c.category || 'general'} · {c.privacy || 'public'}</p>
                </div>
                <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:bg-destructive/10 shrink-0"
                  onClick={() => deleteCircle.mutate(c.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}