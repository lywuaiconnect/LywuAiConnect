import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  ExternalLink
} from 'lucide-react';

interface ScheduledPost {
  id: string;
  title: string;
  content: string;
  time: string;
  dateStr: string;
  dayNumber: number;
  platforms: string[];
  status: 'scheduled' | 'draft' | 'published';
  image?: string;
  isAiOptimal?: boolean;
}

export function CalendarPage() {
  const [viewMode, setViewMode] = useState<'month' | 'queue'>('month');
  const [selectedChannel, setSelectedChannel] = useState<string>('all');

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentMonthName = 'November 2026';

  const scheduledPosts: ScheduledPost[] = [
    {
      id: '1',
      title: 'LywuAi 2.0 Launch Showcase',
      content: '🚀 Live Your Website Using AI! Deploy responsive websites on Cloudflare free tier in 60s.',
      time: '10:15 AM',
      dateStr: 'Tue, Nov 24',
      dayNumber: 24,
      platforms: ['instagram', 'linkedin', 'x'],
      status: 'scheduled',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
      isAiOptimal: true,
    },
    {
      id: '2',
      title: 'Top 5 Design Trends for 2027',
      content: 'Clean whitespace, glassmorphism, and instant zero-latency edge delivery.',
      time: '02:30 PM',
      dateStr: 'Thu, Nov 26',
      dayNumber: 26,
      platforms: ['pinterest', 'linkedin'],
      status: 'scheduled',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=200&auto=format&fit=crop&q=80',
      isAiOptimal: true,
    },
    {
      id: '3',
      title: 'Customer Spotlight: Local Bistro',
      content: 'How Chef Marcus doubled reservations in 1 week with an AI-generated website.',
      time: '06:00 PM',
      dateStr: 'Sat, Nov 28',
      dayNumber: 28,
      platforms: ['facebook', 'instagram', 'telegram'],
      status: 'draft',
      isAiOptimal: false,
    },
  ];

  const getPlatformIcon = (key: string) => {
    switch (key) {
      case 'instagram': return '📸';
      case 'linkedin': return '💼';
      case 'x': return '𝕏';
      case 'pinterest': return '📌';
      case 'facebook': return '👍';
      case 'telegram': return '✈️';
      case 'youtube': return '▶️';
      default: return '🌐';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Publishing Queue & Calendar
            </h1>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
              Buffer Style
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-0.5">
            Visualize your upcoming posts, AI best-time slots, and multi-channel publishing schedule.
          </p>
        </div>

        {/* View Switcher & Actions */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-semibold">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'month' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Calendar View
            </button>
            <button
              onClick={() => setViewMode('queue')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'queue' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Queue Stream ({scheduledPosts.length})
            </button>
          </div>

          <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-xs transition-all">
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Schedule Slot</span>
          </button>
        </div>
      </div>

      {/* AI Recommendation Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-4 flex items-center justify-between text-xs text-slate-700 shadow-xs">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 bg-blue-600 text-white rounded-lg">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <div>
            <span className="font-bold text-slate-900">AI Scheduling Insight:</span> Your audience engagement peaks on{' '}
            <strong className="text-blue-700">Tuesdays at 10:15 AM</strong> and{' '}
            <strong className="text-blue-700">Thursdays at 2:30 PM</strong>.
          </div>
        </div>
        <span className="hidden md:inline font-semibold text-blue-700 bg-white/80 px-2.5 py-1 rounded-full border border-blue-100">
          Auto-Scheduled to Optimal Times
        </span>
      </div>

      {/* CALENDAR VIEW */}
      {viewMode === 'month' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          {/* Month Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-slate-900">{currentMonthName}</h2>
              <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-medium">
                3 Posts Scheduled
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days Grid Header */}
          <div className="grid grid-cols-7 gap-px border-b border-slate-100 pb-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
            {daysOfWeek.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          {/* Calendar Month Cells */}
          <div className="grid grid-cols-7 gap-2">
            {/* Blank leading days */}
            {[...Array(0)].map((_, i) => (
              <div key={`blank-${i}`} className="min-h-[100px] bg-slate-50/50 rounded-xl" />
            ))}

            {/* 30 Days */}
            {[...Array(30)].map((_, i) => {
              const day = i + 1;
              const post = scheduledPosts.find((p) => p.dayNumber === day);
              const isToday = day === 22;

              return (
                <div
                  key={`day-${day}`}
                  className={`min-h-[110px] p-2 rounded-xl border flex flex-col justify-between transition-all group hover:border-blue-300 ${
                    isToday
                      ? 'bg-blue-50/40 border-blue-300 ring-1 ring-blue-300'
                      : post
                      ? 'bg-white border-slate-200 shadow-xs'
                      : 'bg-white border-slate-100 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                        isToday ? 'bg-blue-600 text-white' : 'text-slate-700'
                      }`}
                    >
                      {day}
                    </span>
                    {isToday && <span className="text-[10px] font-bold text-blue-600">Today</span>}
                  </div>

                  {post && (
                    <div className="mt-1.5 p-1.5 bg-slate-50 rounded-lg border border-slate-200/80 text-[11px] space-y-1 hover:bg-blue-50/50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 text-[10px] flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5 text-blue-600" />
                          {post.time}
                        </span>
                        <div className="flex -space-x-1">
                          {post.platforms.map((p) => (
                            <span key={p} className="text-xs" title={p}>
                              {getPlatformIcon(p)}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="font-medium text-slate-700 line-clamp-1">{post.title}</p>
                      {post.isAiOptimal && (
                        <span className="inline-block bg-amber-100 text-amber-800 text-[9px] font-bold px-1 rounded-sm">
                          ⚡ AI Peak
                        </span>
                      )}
                    </div>
                  )}

                  {!post && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end">
                      <button className="text-slate-400 hover:text-blue-600 p-1">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* QUEUE STREAM VIEW (Buffer Style Stream) */}
      {viewMode === 'queue' && (
        <div className="space-y-4">
          {scheduledPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
            >
              <div className="flex items-start gap-4">
                {post.image ? (
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl shrink-0">
                    📝
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">{post.title}</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        post.status === 'scheduled'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {post.status}
                    </span>
                    {post.isAiOptimal && (
                      <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-200 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" /> AI Recommended Slot
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 max-w-2xl">{post.content}</p>

                  <div className="flex items-center gap-3 pt-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      {post.dateStr} at {post.time}
                    </span>
                    <span>·</span>
                    <div className="flex items-center gap-1.5">
                      <span>Publishing to:</span>
                      {post.platforms.map((p) => (
                        <span key={p} className="text-sm">
                          {getPlatformIcon(p)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors">
                  Edit
                </button>
                <button className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold transition-colors">
                  Post Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
