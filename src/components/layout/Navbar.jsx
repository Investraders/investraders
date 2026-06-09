import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Search, LayoutGrid, TrendingUp, LogOut, User } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotificationBell from '@/components/layout/NotificationBell';

export default function Navbar({ user }) {
  const displayName = user?.full_name || user?.email?.split('@')[0] || 'User';
  const initials = displayName.charAt(0).toUpperCase();

  const { data: userProfile } = useQuery({
    queryKey: ['my-profile', user?.id],
    queryFn: () => base44.entities.User.filter({ id: user?.id }),
    enabled: !!user?.id,
    select: (data) => data?.[0],
  });
  const avatarUrl = userProfile?.avatar_url || null;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border px-4 md:px-6 h-16 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 shrink-0">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-blue-700 hidden sm:block">Investraders</span>
      </Link>

      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-10 h-10 bg-muted border-0 rounded-full" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-secondary transition-colors">
          <LayoutGrid className="w-4 h-4 text-muted-foreground" />
        </button>
        <NotificationBell />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 ml-2">
              {avatarUrl ? (
                <img src={avatarUrl} alt={displayName} className="w-9 h-9 rounded-full object-cover" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-semibold text-sm">
                  {initials}
                </div>
              )}
              <span className="text-sm font-medium hidden md:block">{displayName}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to="/profile"><User className="w-4 h-4 mr-2" /> My Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => base44.auth.logout()}>
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}