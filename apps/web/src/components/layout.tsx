import React, { useState } from 'react';
import { 
  PenTool, 
  Calendar as CalendarIcon, 
  MessageSquare, 
  BarChart3, 
  Share2, 
  ExternalLink, 
  Sparkles, 
  Plus, 
  Globe, 
  Menu, 
  X as CloseIcon,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

interface LayoutProps {
  currentPage: string;
  onNavigate: (page: 'landing' | 'compose' | 'calendar' | 'inbox' | 'analytics' | 'channels') => void;
  children: React.ReactNode;
}

export function Layout({ currentPage, onNavigate, children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'compose', label: 'Composer', icon: PenTool, badge: 'AI' },
    { key: 'calendar', label: 'Calendar & Queue', icon: CalendarIcon },
    { key: 'analytics', label: 'Analytics', icon: BarChart3 },
    { key: 'inbox', label: 'Community Inbox', icon: MessageSquare, count: '3' },
    { key: 'channels', label: 'Channels', icon: Share2 },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      {/* Top Banner: Synergy with LywuAi (Live Your Website Using AI) */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 text-white text-xs md:text-sm py-2 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase">
              Synergy
            </span>
            <span className="hidden sm:inline font-medium">Need a stunning website to link to from your social posts?</span>
            <span className="sm:hidden font-medium">Create a website with AI</span>
          </div>
          <a
            href="https://lywuai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-amber-200 transition-colors bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-xs"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Open LywuAi Builder</span>
            <ExternalLink className="w-3 h-3 opacity-75" />
          </a>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none group" 
            onClick={() => onNavigate('landing')}
          >
            <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  LiwuAI<span className="text-blue-600">Connect</span>
                </span>
                <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded-sm border border-blue-200">
                  FREE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-none hidden sm:block">
                The AI Social Media Workspace
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => onNavigate(item.key as any)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {item.count && (
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions / CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => onNavigate('compose')}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-lg text-sm font-semibold shadow-sm shadow-blue-600/30 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">New Post</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1 shadow-lg animate-fade-in">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    onNavigate(item.key as any);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-500" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
            <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 px-3">
              <span>Host: Cloudflare Free Tier</span>
              <a 
                href="https://lywuai.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-blue-600 font-semibold flex items-center gap-1"
              >
                LywuAi Website Builder <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 text-slate-500 text-xs py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">LiwuAI Connect</span>
            <span>·</span>
            <span>AI-First Social Media Workspace</span>
            <span>·</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Free Forever
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('landing')} className="hover:text-blue-600">Home</button>
            <button onClick={() => onNavigate('compose')} className="hover:text-blue-600">AI Composer</button>
            <button onClick={() => onNavigate('calendar')} className="hover:text-blue-600">Calendar</button>
            <button onClick={() => onNavigate('channels')} className="hover:text-blue-600">Channels</button>
            <a 
              href="https://lywuai.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
            >
              LywuAi.com <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
