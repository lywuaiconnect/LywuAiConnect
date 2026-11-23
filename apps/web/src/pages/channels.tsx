import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Plus, 
  ExternalLink, 
  AlertCircle, 
  ShieldCheck, 
  Zap,
  RefreshCw,
  Sparkles,
  Send
} from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  platform: string;
  handle: string;
  avatar: string;
  status: 'connected' | 'not_connected';
  badge?: string;
  method: string;
  description: string;
}

export function ChannelsPage() {
  const [channels, setChannels] = useState<Channel[]>([
    {
      id: 'ig',
      name: 'Instagram Business / Creator',
      platform: 'instagram',
      handle: '@lywuai.official',
      avatar: '📸',
      status: 'connected',
      badge: 'Auto-Post via Make / Webhook',
      method: 'Webhook Bridge / Dispatcher',
      description: 'Schedule reels, carousels, and stories without Meta developer paperwork.'
    },
    {
      id: 'li',
      name: 'LinkedIn Profile & Company Page',
      platform: 'linkedin',
      handle: 'LywuAi Technologies',
      avatar: '💼',
      status: 'connected',
      badge: 'Direct 1-Click Publishing',
      method: 'LinkedIn Partner API',
      description: 'Post thought leadership articles, links, and PDF carousels.'
    },
    {
      id: 'pin',
      name: 'Pinterest Boards',
      platform: 'pinterest',
      handle: '@lywuaidesigns',
      avatar: '📌',
      status: 'connected',
      badge: 'Free Developer API',
      method: 'Pinterest API v5',
      description: 'Drive high-converting visual traffic directly back to your LywuAi website.'
    },
    {
      id: 'yt',
      name: 'YouTube Shorts & Channel',
      platform: 'youtube',
      handle: 'LywuAi Studio',
      avatar: '▶️',
      status: 'connected',
      badge: 'Google OAuth 2.0',
      method: 'YouTube Data API v3',
      description: 'Upload short-form clips and community tab updates.'
    },
    {
      id: 'x',
      name: 'X (Twitter)',
      platform: 'x',
      handle: '@lywuai_hq',
      avatar: '𝕏',
      status: 'connected',
      badge: 'Free Webhook / Telegram Bot',
      method: 'Make.com Bridge',
      description: 'Tweet threads and announcements without paying $100/mo API fees.'
    },
    {
      id: 'tg',
      name: 'Telegram Channel / Group',
      platform: 'telegram',
      handle: 't.me/lywuai_announcements',
      avatar: '✈️',
      status: 'connected',
      badge: 'Instant Free Bot',
      method: 'Telegram Bot API',
      description: 'Instant broadcasts to unlimited subscribers. Zero rate limits.'
    },
    {
      id: 'fb',
      name: 'Facebook Page',
      platform: 'facebook',
      handle: 'LywuAi Official Page',
      avatar: '👍',
      status: 'connected',
      badge: 'Make.com Verified Partner',
      method: 'Webhook Bridge',
      description: 'Publish updates, photo albums, and website links to your Facebook audience.'
    },
    {
      id: 'bsky',
      name: 'Bluesky (AT Protocol)',
      platform: 'bluesky',
      handle: '@lywuai.bsky.social',
      avatar: '🦋',
      status: 'not_connected',
      badge: '100% Open & Free',
      method: 'AT Protocol API',
      description: 'The fastest growing decentralized network. Instant setup with app password.'
    },
    {
      id: 'tt',
      name: 'TikTok Business',
      platform: 'tiktok',
      handle: '@lywuai_creators',
      avatar: '🎵',
      status: 'not_connected',
      badge: 'Push-to-Publish',
      method: 'Dispatcher Notification',
      description: 'Get notified with captions & video ready to paste into TikTok.'
    }
  ]);

  const toggleConnect = (id: string) => {
    setChannels(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: c.status === 'connected' ? 'not_connected' : 'connected'
        };
      }
      return c;
    }));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Connected Channels
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your social accounts across Instagram, Pinterest, YouTube, Facebook, LinkedIn, X, and Telegram.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            No Tax Paperwork Needed
          </span>
        </div>
      </div>

      {/* Zero Paperwork Explainer Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-5 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/20">
            <Zap className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900">
              How LiwuAI Connect bypasses bureaucratic API barriers
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We leverage verified partner bridges (Make.com/Zapier), open protocols (Bluesky/Telegram/Pinterest), and our instant Telegram Push-to-Post dispatcher. You don’t need an LLC, business tax ID, or enterprise approval to schedule and publish across all your favorite networks.
            </p>
          </div>
        </div>
      </div>

      {/* Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {channels.map((channel) => {
          const isConnected = channel.status === 'connected';
          return (
            <div 
              key={channel.id}
              className={`bg-white rounded-2xl border transition-all p-5 flex flex-col justify-between shadow-xs hover:shadow-md ${
                isConnected 
                  ? 'border-slate-200 hover:border-blue-300' 
                  : 'border-slate-200/60 bg-slate-50/50 opacity-90'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-1 bg-slate-50 rounded-xl border border-slate-100">{channel.avatar}</span>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm leading-snug">{channel.name}</h3>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">{channel.handle}</p>
                    </div>
                  </div>

                  <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    isConnected 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {isConnected ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Active
                      </>
                    ) : (
                      'Disconnected'
                    )}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                  {channel.description}
                </p>

                <div className="bg-slate-50 rounded-lg p-2.5 text-[11px] text-slate-600 border border-slate-100 mb-4 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Connection:</span>
                    <span className="font-medium text-slate-700">{channel.method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Protocol:</span>
                    <span className="text-blue-600 font-semibold">{channel.badge}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => toggleConnect(channel.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isConnected
                      ? 'text-slate-500 hover:text-red-600 hover:bg-red-50'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                  }`}
                >
                  {isConnected ? 'Disconnect' : 'Connect Account'}
                </button>

                {isConnected && (
                  <button 
                    onClick={() => alert(`Test post ping sent to ${channel.name}!`)}
                    className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline"
                  >
                    <Send className="w-3 h-3" /> Test Post
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
