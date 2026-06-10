import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle, FileText, BarChart3, Megaphone, Eye, Pencil, Trash2, Users } from 'lucide-react';
import CircleIcon from '@/components/circles/CircleIcon';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const NAV_ITEMS = [
  { label: 'Home', icon: Home, path: '/' },
  { label: 'Create Circle', icon: PlusCircle, path: '/create-circle' },
  { label: 'My Circles', icon: Users, path: '/my-circles' },
  { label: 'Create Poll', icon: BarChart3, path: '/create-poll' },
];

export default function Sidebar() {
  const location = useLocation();

  const { data: circles = [] } = useQuery({
    queryKey: ['my-circles-sidebar'],
    queryFn: () => base44.entities.Circle.list('-created_date', 6),
  });

  return (
    <aside className="hidden lg:block w-64 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-4">
      {/* Navigation */}
      <nav className="space-y-1 mb-6">
        {NAV_ITEMS.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
              {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
            </Link>
          );
        })}
      </nav>

      {/* Your Circles */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between px-3 mb-3">
          <h3 className="text-sm font-semibold text-foreground">Your created circles</h3>
          <Link to="/my-circles" className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Eye className="w-3 h-3 text-primary" />
          </Link>
        </div>

        <div className="space-y-2">
          {circles.slice(0, 5).map((circle) => (
            <Link
              key={circle.id}
              to={`/circle/${circle.id}`}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-muted transition-colors group"
            >
              <CircleIcon category={circle.category} size="md" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate flex items-center gap-1">
                  {circle.name}
                  {circle.member_ids?.length > 0 && (
                    <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{circle.member_ids.length}</span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground truncate">{circle.description || 'No description'}</p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>

        {circles.length > 5 && (
          <Link to="/my-circles" className="flex items-center gap-1 px-3 mt-3 text-sm text-primary hover:underline font-medium">
            View all circles →
          </Link>
        )}
      </div>
    </aside>
  );
}