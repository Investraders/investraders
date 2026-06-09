import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, MessageCircle, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

function makeConversationId(a, b) {
  return [a, b].sort().join('_');
}

export default function Messages() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const bottomRef = useRef(null);

  const urlParams = new URLSearchParams(window.location.search);
  const initWithId = urlParams.get('with');

  const [activeConvId, setActiveConvId] = useState(null);
  const [activeParticipant, setActiveParticipant] = useState(null); // { id, name, avatar }
  const [newMessage, setNewMessage] = useState('');

  // All messages involving current user
  const { data: allMessages = [] } = useQuery({
    queryKey: ['dms', user?.id],
    queryFn: () => base44.entities.DirectMessage.filter({ sender_id: user?.id }),
    enabled: !!user?.id,
    refetchInterval: 1500,
  });

  const { data: receivedMessages = [] } = useQuery({
    queryKey: ['dms-received', user?.id],
    queryFn: () => base44.entities.DirectMessage.filter({ recipient_id: user?.id }),
    enabled: !!user?.id,
    refetchInterval: 1500,
  });

  // Real-time subscriptions
  useEffect(() => {
    if (!user?.id) return;
    const unsub1 = base44.entities.DirectMessage.subscribe((event) => {
      if (event.data?.sender_id === user.id || event.data?.recipient_id === user.id) {
        queryClient.invalidateQueries({ queryKey: ['dms', user.id] });
        queryClient.invalidateQueries({ queryKey: ['dms-received', user.id] });
      }
    });
    return () => unsub1();
  }, [user?.id]);

  // All users for display names
  const { data: allUsers = [] } = useQuery({
    queryKey: ['all-users-dm'],
    queryFn: () => base44.entities.User.list(),
    enabled: !!user?.id,
  });

  const getUserById = (id) => allUsers.find((u) => u.id === id);

  // Build conversation list from all messages
  const conversations = useMemo(() => {
    const combined = [...allMessages, ...receivedMessages];
    const convMap = {};
    combined.forEach((msg) => {
      const otherId = msg.sender_id === user?.id ? msg.recipient_id : msg.sender_id;
      const convId = msg.conversation_id;
      if (!convMap[convId] || new Date(msg.created_date) > new Date(convMap[convId].lastDate)) {
        const other = getUserById(otherId);
        convMap[convId] = {
          convId,
          otherId,
          otherName: other?.full_name || msg.sender_name || 'User',
          otherAvatar: other?.avatar_url || msg.sender_avatar,
          lastMessage: msg.content,
          lastDate: msg.created_date,
          unreadCount: combined.filter(
            (m) => m.conversation_id === convId && m.recipient_id === user?.id && !m.is_read
          ).length,
        };
      }
    });
    return Object.values(convMap).sort((a, b) => new Date(b.lastDate) - new Date(a.lastDate));
  }, [allMessages, receivedMessages, allUsers]);

  // When navigated with ?with=userId, open or create that conversation
  useEffect(() => {
    if (!initWithId || !user?.id || allUsers.length === 0) return;
    const convId = makeConversationId(user.id, initWithId);
    const other = getUserById(initWithId);
    setActiveConvId(convId);
    setActiveParticipant({
      id: initWithId,
      name: other?.full_name || 'User',
      avatar: other?.avatar_url || null,
    });
  }, [initWithId, user?.id, allUsers.length]);

  // Messages in the active conversation
  const convMessages = useMemo(() => {
    const combined = [...allMessages, ...receivedMessages];
    return combined
      .filter((m) => m.conversation_id === activeConvId)
      .sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
  }, [allMessages, receivedMessages, activeConvId]);

  // Mark messages as read when opening a conversation
  const markRead = useMutation({
    mutationFn: async (msgs) => {
      await Promise.all(
        msgs
          .filter((m) => m.recipient_id === user?.id && !m.is_read)
          .map((m) => base44.entities.DirectMessage.update(m.id, { is_read: true }))
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dms', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['dms-received', user?.id] });
    },
  });

  useEffect(() => {
    if (convMessages.length > 0) {
      markRead.mutate(convMessages);
    }
  }, [activeConvId, convMessages.length]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [convMessages]);

  const sendMessage = useMutation({
    mutationFn: () =>
      base44.entities.DirectMessage.create({
        conversation_id: activeConvId,
        sender_id: user.id,
        recipient_id: activeParticipant.id,
        content: newMessage.trim(),
        sender_name: user.full_name || user.email?.split('@')[0],
        sender_avatar: user.avatar_url || null,
        is_read: false,
      }),
    onSuccess: () => {
      setNewMessage('');
      queryClient.invalidateQueries({ queryKey: ['dms', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['dms-received', user?.id] });
    },
  });

  const openConversation = (conv) => {
    const other = getUserById(conv.otherId);
    setActiveConvId(conv.convId);
    setActiveParticipant({
      id: conv.otherId,
      name: conv.otherName,
      avatar: other?.avatar_url || conv.otherAvatar,
    });
  };

  const totalUnread = conversations.reduce((s, c) => s + c.unreadCount, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-card border rounded-2xl shadow-sm overflow-hidden flex" style={{ height: 'calc(100vh - 7rem)' }}>
        
        {/* Sidebar — conversation list */}
        <div className={`w-full md:w-80 border-r flex flex-col shrink-0 ${activeConvId ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              <h2 className="text-base font-semibold">Messages</h2>
              {totalUnread > 0 && (
                <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5 font-bold">
                  {totalUnread}
                </span>
              )}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <MessageCircle className="w-10 h-10 text-muted-foreground/40 mb-3" />
                <p className="text-sm text-muted-foreground">No conversations yet.</p>
                <p className="text-xs text-muted-foreground mt-1">Visit a member's profile to start chatting.</p>
              </div>
            ) : (
              conversations.map((conv) => (
                <button
                  key={conv.convId}
                  onClick={() => openConversation(conv)}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left border-b last:border-0 ${
                    activeConvId === conv.convId ? 'bg-primary/5' : ''
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center text-white text-sm font-bold shrink-0 overflow-hidden">
                    {conv.otherAvatar ? (
                      <img src={conv.otherAvatar} alt="" className="w-full h-full object-cover" />
                    ) : (
                      conv.otherName?.charAt(0)
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium truncate ${conv.unreadCount > 0 ? 'text-foreground' : 'text-foreground'}`}>
                        {conv.otherName}
                      </p>
                      {conv.lastDate && (
                        <span className="text-[10px] text-muted-foreground shrink-0 ml-1">
                          {format(new Date(conv.lastDate), 'MMM d')}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="text-xs text-muted-foreground truncate flex-1">{conv.lastMessage}</p>
                      {conv.unreadCount > 0 && (
                        <span className="bg-primary text-primary-foreground text-[10px] rounded-full px-1.5 py-0.5 font-bold shrink-0">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Chat panel */}
        <div className={`flex-1 flex flex-col ${activeConvId ? 'flex' : 'hidden md:flex'}`}>
          {!activeConvId ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <MessageCircle className="w-14 h-14 text-muted-foreground/30 mb-4" />
              <p className="text-base font-medium text-muted-foreground">Select a conversation</p>
              <p className="text-sm text-muted-foreground/60 mt-1">or visit a profile to start a new one</p>
            </div>
          ) : (
            <>
              {/* Chat header */}
              <div className="px-4 py-3 border-b flex items-center gap-3">
                <button
                  onClick={() => { setActiveConvId(null); setActiveParticipant(null); }}
                  className="md:hidden p-1 rounded-full hover:bg-muted"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center text-white text-sm font-bold overflow-hidden shrink-0">
                  {activeParticipant?.avatar ? (
                    <img src={activeParticipant.avatar} alt="" className="w-full h-full object-cover" />
                  ) : (
                    activeParticipant?.name?.charAt(0)
                  )}
                </div>
                <p className="font-semibold text-sm">{activeParticipant?.name}</p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {convMessages.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-sm text-muted-foreground">Say hello to {activeParticipant?.name}!</p>
                  </div>
                )}
                {convMessages.map((msg) => {
                  const isMine = msg.sender_id === user?.id;
                  return (
                    <div key={msg.id} className={`flex items-end gap-2 ${isMine ? 'justify-end' : 'justify-start'}`}>
                      {!isMine && (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center text-white text-xs font-bold overflow-hidden shrink-0">
                          {msg.sender_avatar ? (
                            <img src={msg.sender_avatar} alt="" className="w-full h-full object-cover" />
                          ) : (
                            msg.sender_name?.charAt(0)
                          )}
                        </div>
                      )}
                      <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                        isMine
                          ? 'bg-primary text-primary-foreground rounded-br-sm'
                          : 'bg-muted text-foreground rounded-bl-sm'
                      }`}>
                        <p className="leading-relaxed">{msg.content}</p>
                        <p className={`text-[10px] mt-1 ${isMine ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground'}`}>
                          {msg.created_date ? format(new Date(msg.created_date), 'HH:mm') : ''}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="px-4 py-3 border-t flex items-center gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Write a message..."
                  className="rounded-full"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && newMessage.trim()) {
                      e.preventDefault();
                      sendMessage.mutate();
                    }
                  }}
                />
                <Button
                  size="icon"
                  className="rounded-full shrink-0"
                  disabled={!newMessage.trim() || sendMessage.isPending}
                  onClick={() => sendMessage.mutate()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}