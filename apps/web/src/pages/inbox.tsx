import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  Search, 
  CheckCircle2, 
  Clock, 
  Globe, 
  ThumbsUp, 
  CornerDownRight,
  Filter
} from 'lucide-react';

interface CommentItem {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  platform: 'instagram' | 'linkedin' | 'x' | 'facebook' | 'pinterest';
  postTitle: string;
  content: string;
  time: string;
  sentiment: 'positive' | 'question' | 'lead';
  isReplied: boolean;
  replyDraft?: string;
}

export function InboxPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [customReplies, setCustomReplies] = useState<Record<string, string>>({});

  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: 'c1',
      author: 'David Chen',
      handle: '@davidchen_design',
      avatar: 'DC',
      platform: 'instagram',
      postTitle: 'LywuAi 2.0 Launch Showcase',
      content: 'Can I connect a custom domain to the website built with LywuAi, or does it only stay on cloudflare?',
      time: '12m ago',
      sentiment: 'question',
      isReplied: false,
      replyDraft: 'Hi David! Yes, you can bind any custom domain in Cloudflare with 1 click, completely free with SSL included!'
    },
    {
      id: 'c2',
      author: 'Elena Rostova',
      handle: 'Elena Rostova, VP Growth',
      avatar: 'ER',
      platform: 'linkedin',
      postTitle: 'Top 5 Design Trends for 2027',
      content: 'This zero-code edge deployment is exactly what our agency has been looking for. Are team collaboration features included?',
      time: '1h ago',
      sentiment: 'lead',
      isReplied: false,
      replyDraft: 'Hi Elena! Yes, multi-seat team workspaces and approval queues are fully supported. Would love to share an invite!'
    },
    {
      id: 'c3',
      author: 'Marcus Brody',
      handle: '@marcus_cooks',
      avatar: 'MB',
      platform: 'facebook',
      postTitle: 'Customer Spotlight: Local Bistro',
      content: 'Our restaurant website has been running smoothly without paying a single dollar in monthly hosting. Thank you!',
      time: '3h ago',
      sentiment: 'positive',
      isReplied: true,
      replyDraft: 'Thank you so much Marcus! So proud to power your bistro online!'
    },
    {
      id: 'c4',
      author: 'Sophie Martin',
      handle: '@sophiemartin',
      avatar: 'SM',
      platform: 'pinterest',
      postTitle: 'Minimalist Portfolio Templates',
      content: 'Where can I see the live template preview before choosing one?',
      time: '5h ago',
      sentiment: 'question',
      isReplied: false,
      replyDraft: 'You can explore all interactive live demos at https://lywuai.com with zero signup required!'
    }
  ]);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return '📸';
      case 'linkedin': return '💼';
      case 'x': return '𝕏';
      case 'facebook': return '👍';
      case 'pinterest': return '📌';
      default: return '💬';
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'lead':
        return (
          <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            🚀 High-Intent Lead
          </span>
        );
      case 'question':
        return (
          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            ❓ Question
          </span>
        );
      case 'positive':
        return (
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            😊 Positive Feedback
          </span>
        );
      default:
        return null;
    }
  };

  const handleSendReply = (id: string) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, isReplied: true } : c));
    setActiveReplyId(null);
  };

  const handleApplyAiPreset = (id: string, preset: 'website' | 'thanks') => {
    const text = preset === 'website' 
      ? "You can check out the live builder and templates at https://lywuai.com — it's 100% free with no credit card!" 
      : "Thanks so much for the kind words! Really appreciate your support! 🙌";
    setCustomReplies(prev => ({ ...prev, [id]: text }));
    setActiveReplyId(id);
  };

  const filteredComments = comments.filter(c => {
    if (selectedPlatform !== 'all' && c.platform !== selectedPlatform) return false;
    if (searchQuery && !c.content.toLowerCase().includes(searchQuery.toLowerCase()) && !c.author.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Community & Engagement Inbox
            </h1>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
              Triage at 10x Speed
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-0.5">
            Reply to comments, answer prospective customer questions, and auto-draft AI replies across all channels.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search comments..."
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500 transition-colors shadow-xs"
          />
        </div>
      </div>

      {/* Platform Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5">
        {[
          { key: 'all', label: 'All Channels' },
          { key: 'instagram', label: '📸 Instagram' },
          { key: 'linkedin', label: '💼 LinkedIn' },
          { key: 'facebook', label: '👍 Facebook' },
          { key: 'pinterest', label: '📌 Pinterest' },
        ].map((p) => (
          <button
            key={p.key}
            onClick={() => setSelectedPlatform(p.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              selectedPlatform === p.key
                ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.map((comment) => {
          const isReplying = activeReplyId === comment.id;
          const currentText = customReplies[comment.id] || comment.replyDraft || '';

          return (
            <div
              key={comment.id}
              className={`bg-white rounded-2xl border p-5 shadow-xs transition-all space-y-4 ${
                comment.isReplied ? 'border-slate-200/80 bg-slate-50/40' : 'border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-200 to-slate-300 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    {comment.avatar}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{comment.author}</span>
                      <span className="text-xs text-slate-400 font-mono">{comment.handle}</span>
                      <span className="text-base" title={comment.platform}>{getPlatformIcon(comment.platform)}</span>
                      {getSentimentBadge(comment.sentiment)}
                    </div>

                    <p className="text-xs text-slate-500">
                      On post: <span className="font-medium text-slate-700 italic">"{comment.postTitle}"</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {comment.time}
                  </span>
                  {comment.isReplied && (
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Replied
                    </span>
                  )}
                </div>
              </div>

              {/* Comment Content */}
              <p className="text-sm text-slate-800 bg-slate-50/60 p-3.5 rounded-xl border border-slate-100 leading-relaxed">
                "{comment.content}"
              </p>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
                {/* AI Instant Suggestions */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" /> AI Quick Drafts:
                  </span>
                  <button
                    onClick={() => handleApplyAiPreset(comment.id, 'thanks')}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
                  >
                    🙌 Warm Thanks
                  </button>
                  <button
                    onClick={() => handleApplyAiPreset(comment.id, 'website')}
                    className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-medium transition-colors flex items-center gap-1"
                  >
                    <Globe className="w-3 h-3" /> Share LywuAi Link
                  </button>
                </div>

                <button
                  onClick={() => setActiveReplyId(isReplying ? null : comment.id)}
                  className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <CornerDownRight className="w-3.5 h-3.5" />
                  {isReplying ? 'Close Reply' : 'Open Reply Editor'}
                </button>
              </div>

              {/* Reply Box */}
              {isReplying && (
                <div className="pt-2 border-t border-slate-100 space-y-3 animate-slide-up">
                  <textarea
                    value={currentText}
                    onChange={(e) => setCustomReplies({ ...customReplies, [comment.id]: e.target.value })}
                    placeholder="Write a reply..."
                    rows={2}
                    className="w-full p-3 bg-white border border-blue-200 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setActiveReplyId(null)}
                      className="px-3 py-1.5 text-slate-500 hover:text-slate-800 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSendReply(comment.id)}
                      className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                    >
                      <Send className="w-3 h-3" />
                      <span>Post Reply to {comment.platform}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
