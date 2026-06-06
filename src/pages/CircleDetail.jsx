import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import CircleVisual from '@/components/circles/CircleVisual';
import CircleLeaderboard from '@/components/circles/CircleLeaderboard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, Send, Users, MessageCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';

export default function CircleDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [newQuestion, setNewQuestion] = useState('');
  const [newResponse, setNewResponse] = useState('');
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [selectedResponseData, setSelectedResponseData] = useState(null);

  const { data: circle, isLoading: loadingCircle } = useQuery({
    queryKey: ['circle', id],
    queryFn: async () => {
      const circles = await base44.entities.Circle.filter({ id });
      return circles[0];
    },
  });

  const { data: questions = [] } = useQuery({
    queryKey: ['circle-questions', id],
    queryFn: () => base44.entities.CircleQuestion.filter({ circle_id: id }, '-created_date', 10),
  });

  const activeQuestion = questions.find((q) => q.status === 'active') || questions[0];

  const { data: responses = [] } = useQuery({
    queryKey: ['circle-responses', activeQuestion?.id],
    queryFn: () =>
      activeQuestion ? base44.entities.CircleResponse.filter({ question_id: activeQuestion.id }) : Promise.resolve([]),
    enabled: !!activeQuestion,
  });

  const createQuestion = useMutation({
    mutationFn: (text) =>
      base44.entities.CircleQuestion.create({
        circle_id: id,
        question_text: text,
        question_number: questions.length + 1,
        total_members: circle?.member_ids?.length || 0,
        status: 'active',
        closes_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['circle-questions', id] });
      setNewQuestion('');
      setShowQuestionForm(false);
    },
  });

  const submitResponse = useMutation({
    mutationFn: (text) =>
      base44.entities.CircleResponse.create({
        question_id: activeQuestion.id,
        circle_id: id,
        response_text: text,
        author_name: user?.full_name || user?.email?.split('@')[0] || 'User',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['circle-responses', activeQuestion?.id] });
      setNewResponse('');
    },
  });

  const joinCircle = useMutation({
    mutationFn: async () => {
      const members = circle?.member_ids || [];
      if (!members.includes(user?.id)) {
        await base44.entities.Circle.update(id, { member_ids: [...members, user.id] });
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['circle', id] }),
  });

  const isMember = circle?.member_ids?.includes(user?.id) || circle?.created_by_id === user?.id;

  // Build member list for visual
  const memberNames = (circle?.member_ids || []).map((_, i) => ({ name: `Member ${i + 1}` }));
  if (memberNames.length < 8) {
    while (memberNames.length < 8) memberNames.push({ name: '?' });
  }

  if (loadingCircle) {
    return (
      <div className="max-w-2xl mx-auto space-y-4 py-8">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-[400px] w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
        {/* Circle Header */}
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg">
              {circle?.name?.charAt(0)}
            </div>
            <div>
              <h1 className="text-xl font-bold">{circle?.name}</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                {circle?.member_ids?.length || 0} members · {circle?.privacy}
              </p>
            </div>
          </div>
          {!isMember && (
            <Button onClick={() => joinCircle.mutate()} className="rounded-full bg-primary">
              Join Circle
            </Button>
          )}
        </div>

        {/* Circle Visual */}
        <CircleVisual
          members={memberNames}
          question={activeQuestion?.question_text}
          selectedResponse={selectedResponseData}
          questionNumber={activeQuestion?.question_number}
          closesAt={activeQuestion?.closes_at}
          totalResponses={responses.length}
          totalMembers={circle?.member_ids?.length || 0}
          circleName={circle?.name}
        />

        {/* Responses */}
        {responses.length > 0 && (
          <div className="px-6 pb-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-primary" /> Responses
            </h3>
            <div className="space-y-2">
              <AnimatePresence>
                {responses.map((r) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-xl border cursor-pointer transition-colors ${
                      selectedResponseData?.id === r.id ? 'bg-primary/10 border-primary/30' : 'hover:bg-muted'
                    }`}
                    onClick={() =>
                      setSelectedResponseData(selectedResponseData?.id === r.id ? null : r)
                    }
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center text-white text-[10px] font-bold">
                        {r.author_name?.charAt(0)}
                      </div>
                      <span className="text-sm font-medium">{r.author_name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground ml-9">{r.response_text}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Submit Response */}
        {isMember && activeQuestion && (
          <div className="px-6 pb-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newResponse.trim()) submitResponse.mutate(newResponse);
              }}
              className="flex gap-2"
            >
              <Input
                placeholder="Share your answer..."
                value={newResponse}
                onChange={(e) => setNewResponse(e.target.value)}
                className="flex-1 rounded-full h-10"
              />
              <Button type="submit" disabled={!newResponse.trim()} size="icon" className="rounded-full h-10 w-10 bg-primary">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        )}

        {/* Leaderboard */}
        <CircleLeaderboard circleId={id} />

        {/* New Question */}
        {isMember && (
          <div className="px-6 pb-6">
            {showQuestionForm ? (
              <div className="space-y-3">
                <Textarea
                  placeholder="Ask a question to your circle..."
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="min-h-[80px]"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={() => { if (newQuestion.trim()) createQuestion.mutate(newQuestion); }}
                    disabled={!newQuestion.trim()}
                    className="rounded-full bg-primary"
                  >
                    Post Question
                  </Button>
                  <Button variant="outline" onClick={() => setShowQuestionForm(false)} className="rounded-full">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => setShowQuestionForm(true)}
                variant="outline"
                className="w-full rounded-full border-dashed"
              >
                <Plus className="w-4 h-4 mr-2" /> Ask a New Question
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}