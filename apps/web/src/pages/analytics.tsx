import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MousePointerClick, 
  Eye, 
  Sparkles, 
  ArrowUpRight, 
  ExternalLink,
  Calendar,
  Share2
} from 'lucide-react';

export function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const stats = [
    {
      label: 'Total Impressions',
      value: '148,290',
      change: '+24.8%',
      trend: 'up',
      icon: Eye,
      subtext: 'vs previous 30 days'
    },
    {
      label: 'Engagement Rate',
      value: '4.82%',
      change: '+1.2%',
      trend: 'up',
      icon: TrendingUp,
      subtext: 'Industry benchmark: 2.1%'
    },
    {
      label: 'Clicks to LywuAi Website',
      value: '8,420',
      change: '+38.5%',
      trend: 'up',
      icon: MousePointerClick,
      subtext: 'High-intent buyer traffic'
    },
    {
      label: 'Audience Growth',
      value: '+2,140',
      change: '+18.0%',
      trend: 'up',
      icon: Users,
      subtext: 'Across all 8 channels'
    },
  ];

  const channelPerformance = [
    { name: 'LinkedIn', icon: '💼', posts: 14, impressions: '62.4k', clicks: '3,840', rate: '6.1%', barWidth: '92%' },
    { name: 'Instagram', icon: '📸', posts: 22, impressions: '48.1k', clicks: '2,150', rate: '4.5%', barWidth: '78%' },
    { name: 'Pinterest', icon: '📌', posts: 18, impressions: '24.8k', clicks: '1,420', rate: '5.7%', barWidth: '55%' },
    { name: 'X (Twitter)', icon: '𝕏', posts: 34, impressions: '12.9k', clicks: '1,010', rate: '3.2%', barWidth: '40%' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Social Analytics & Insights
            </h1>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">
              Answers, Not Just Data
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-0.5">
            Discover what content drives real website visits, conversions, and audience growth.
          </p>
        </div>

        {/* Time range picker */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          {(['7d', '30d', '90d'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeRange === r ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Last {r === '7d' ? '7 Days' : r === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{s.label}</span>
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{s.value}</span>
                <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm">
                  {s.change}
                </span>
              </div>

              <p className="text-xs text-slate-400">{s.subtext}</p>
            </div>
          );
        })}
      </div>

      {/* BUFFER-STYLE "ANSWERS" HERO SECTION */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-blue-500/20 text-blue-300 rounded-lg border border-blue-400/30">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
              Buffer-Style AI Answers & Recommendations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 space-y-1.5">
              <p className="text-xs text-slate-300 font-medium">When is your best time to post?</p>
              <h3 className="text-lg font-bold text-white">Tuesdays at 10:15 AM</h3>
              <p className="text-xs text-slate-400">Posts at this slot receive 2.4x more engagement and link clicks.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 space-y-1.5">
              <p className="text-xs text-slate-300 font-medium">What is your top converting format?</p>
              <h3 className="text-lg font-bold text-white">Visuals with LywuAi Links</h3>
              <p className="text-xs text-slate-400">Pinterest and LinkedIn drive 72% of all visits to your live website.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 space-y-1.5">
              <p className="text-xs text-slate-300 font-medium">How often should you post?</p>
              <h3 className="text-lg font-bold text-white">4 to 6 Times / Week</h3>
              <p className="text-xs text-slate-400">Maintaining this frequency keeps algorithmic distribution at maximum.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Channels Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Performance by Channel</h2>
            <p className="text-xs text-slate-500">Impressions, website clicks, and engagement across active platforms.</p>
          </div>
          <span className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
            Export Report <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="space-y-4">
          {channelPerformance.map((ch) => (
            <div key={ch.name} className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <span className="text-base">{ch.icon}</span>
                  <span>{ch.name}</span>
                  <span className="text-xs font-normal text-slate-400">({ch.posts} posts)</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-slate-600">{ch.impressions} views</span>
                  <span className="font-bold text-blue-600">{ch.clicks} clicks</span>
                  <span className="text-emerald-600 font-semibold">{ch.rate} ER</span>
                </div>
              </div>

              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: ch.barWidth }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
