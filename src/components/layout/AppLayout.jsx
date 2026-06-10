import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import RightPanel from './RightPanel';
import { useAuth } from '@/lib/AuthContext';

export default function AppLayout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      <div className="max-w-[1440px] mx-auto px-4 pb-4">
        <div className="flex rounded-2xl border-4 border-primary shadow-xl shadow-primary/20 overflow-hidden bg-background min-h-[calc(100vh-72px)]">
          <Sidebar />
          <main className="flex-1 min-w-0 p-4">
            <Outlet />
          </main>
          <RightPanel />
        </div>
      </div>
    </div>
  );
}