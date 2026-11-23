import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  PenTool, 
  Calendar as CalendarIcon, 
  BarChart3, 
  MessageSquare, 
  Zap, 
  Globe, 
  ExternalLink,
  Layers,
  Heart,
  Repeat,
  Share2,
  Bookmark
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted?: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [interactivePlatform, setInteractivePlatform] = useState<'instagram' | 'linkedin' | 'x'>('instagram');

  const platforms = [
    { name: 'Instagram', icon: '📸', desc: 'Reels, Carousels, Stories' },
    { name: 'LinkedIn', icon: '💼', desc: 'Articles, Carousels, Posts' },
    { name: 'Pinterest', icon: '📌', desc: 'Pins driving web traffic' },
    { name: 'YouTube', icon: '▶️', desc: 'Shorts & Community Posts' },
    { name: 'X (Twitter)', icon: '𝕏', desc: 'Threads & Announcements' },
    { name: 'Telegram', icon: '✈️', desc: 'Unlimited Subscribers' },
    { name: 'Facebook', icon: '👍', desc: 'Pages & Group Updates' },
    { name: 'Bluesky', icon: '🦋', desc: 'Decentralized AT Protocol' },
  ];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      if (onGetStarted) onGetStarted();
    }, 800);
  };

  return (
    <div className="space-y-20 md:space-y-28 animate-fade-in -mt-2">
      {/* HERO SECTION (Buffer Style) */}
      <section className="relative pt-8 md:pt-16 pb-12 text-center max-w-4xl mx-auto space-y-6">
        {/* Top Trust Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>The Free, AI-Native Buffer Alternative</span>
          <span className="w-1 h-1 rounded-full bg-blue-400"></span>
          <span className="text-blue-900 font-bold">No Credit Card Required</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
          Your social media workspace,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            powered by AI.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Plan, write, and schedule posts across 8+ social channels at once. Built entirely on Cloudflare's free edge stack with zero monthly fees.
        </p>

        {/* Low-Friction Email Capture (Buffer Signature) */}
        <div className="max-w-md mx-auto pt-2">
          {submitted ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center justify-center gap-2 text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Account created! Redirecting to your AI composer...
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                required
                className="flex-1 px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-2 shrink-0"
              >
                <span>Get started free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="flex items-center justify-center gap-4 text-xs text-slate-400 mt-3 font-medium">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Free forever plan
            </span>
            <span>·</span>
            <span>No credit card required</span>
            <span>·</span>
            <span>Instant setup</span>
          </div>
        </div>

        {/* Live Social Proof Counter (Buffer Inspired) */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
          <div className="flex -space-x-2">
            {['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=80'].map((src, i) => (
              <img key={i} src={src} alt="User avatar" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
            ))}
          </div>
          <span>
            Trusted by <strong className="text-slate-900 font-bold">28,000+</strong> creators, solopreneurs, and growing startups
          </span>
        </div>
      </section>

      {/* LIVE INTERACTIVE DEMO (Show, Don't Just Tell) */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-sm max-w-5xl mx-auto space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Interactive Product Preview
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Write once. Watch AI adapt for every platform.
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Switch between platforms below to see how LiwuAI Connect formats your content in real time.
          </p>
        </div>

        {/* Platform switcher tabs */}
        <div className="flex justify-center gap-2">
          {(['instagram', 'linkedin', 'x'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setInteractivePlatform(p)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold capitalize transition-all border ${
                interactivePlatform === p
                  ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {p === 'x' ? '𝕏 Twitter' : p === 'instagram' ? '📸 Instagram' : '💼 LinkedIn'}
            </button>
          ))}
        </div>

        {/* Interactive Mockup Display */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-8 max-w-xl mx-auto">
          {interactivePlatform === 'instagram' && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs text-xs space-y-3 pb-4">
              <div className="flex items-center gap-2 p-3 border-b border-slate-100">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-pink-600 p-[1.5px]">
                  <div className="w-full h-full bg-white rounded-full p-[1px]">
                    <div className="w-full h-full bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-[10px]">L</div>
                  </div>
                </div>
                <div>
                  <p className="font-bold text-slate-900">lywuai.official ✓</p>
                  <p className="text-[10px] text-slate-400">Sponsored · Link in Bio</p>
                </div>
              </div>
              <div className="aspect-video w-full bg-slate-100 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80" 
                  alt="Post visual" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="px-4 space-y-2">
                <div className="flex justify-between text-slate-700">
                  <div className="flex gap-3">
                    <Heart className="w-4 h-4 hover:text-red-500" />
                    <MessageSquare className="w-4 h-4" />
                    <Share2 className="w-4 h-4" />
                  </div>
                  <Bookmark className="w-4 h-4" />
                </div>
                <p className="text-[11px] text-slate-800 leading-relaxed">
                  <strong className="text-slate-900 mr-1">lywuai.official</strong>
                  Launched our website in 60s with @lywuai! Free edge hosting, responsive templates, and zero code. Tap the link in our bio to try it free! 🚀✨
                  <span className="block text-blue-600 font-semibold mt-1">#AIWebsites #BuildInPublic #Cloudflare</span>
                </p>
              </div>
            </div>
          )}

          {interactivePlatform === 'linkedin' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs text-xs space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-md bg-blue-700 text-white flex items-center justify-center font-bold text-sm">L</div>
                <div>
                  <p className="font-bold text-slate-900">LywuAi Technologies · 1st</p>
                  <p className="text-[10px] text-slate-500">Live Your Website Using AI · 12,450 followers</p>
                </div>
              </div>
              <p className="text-slate-800 leading-relaxed">
                Traditional website builders cost $29/mo and charge extra for every feature. We built LywuAi to run 100% on Cloudflare's free edge tier with no credit card required.<br/><br/>
                Explore the platform: https://lywuai.com
              </p>
              <div className="aspect-video rounded-xl overflow-hidden border border-slate-100 bg-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80" 
                  alt="LinkedIn media" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          )}

          {interactivePlatform === 'x' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs text-xs space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">𝕏</div>
                <div className="space-y-1.5 w-full">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-slate-900">LywuAi</span>
                    <span className="text-slate-400">@lywuai_hq · 1m</span>
                  </div>
                  <p className="text-slate-800 leading-relaxed">
                    Most SaaS tools gate basic features behind a paywall. We didn't.<br/><br/>
                    Publish unlimited AI websites & schedule all your socials free forever: https://lywuai.com
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4 FEATURE PILLARS (Buffer Anatomy) */}
      <section className="space-y-10 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            All-In-One Toolkit
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Everything you need to grow on social media
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: PenTool,
              color: 'text-blue-600 bg-blue-50',
              title: 'Create & Compose',
              desc: 'AI-assisted writing, platform character checks, tone shifts, and free image generation with Pollinations.'
            },
            {
              icon: CalendarIcon,
              color: 'text-indigo-600 bg-indigo-50',
              title: 'Publish & Queue',
              desc: 'Visual drag-and-drop calendar with AI-predicted optimal time slots that maximize your reach.'
            },
            {
              icon: MessageSquare,
              color: 'text-purple-600 bg-purple-50',
              title: 'Community Inbox',
              desc: 'Unified comment triage across Instagram, Facebook, and LinkedIn with 1-click AI replies.'
            },
            {
              icon: BarChart3,
              color: 'text-emerald-600 bg-emerald-50',
              title: 'Answers & Insights',
              desc: 'Answers, not just analytics. Understand what posts drive real clicks back to your LywuAi website.'
            }
          ].map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all space-y-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${pillar.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{pillar.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ECOSYSTEM SYNERGY: LYWUAI BUILDER + CONNECT */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold border border-white/10">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>The Complete Growth Flywheel</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Build your website with LywuAi. <br />
            Promote it everywhere with Connect.
          </h2>

          <p className="text-blue-200 text-sm sm:text-base leading-relaxed">
            A website without social distribution gets zero traffic. Social posts without a high-converting website get zero sales. Together, LywuAi and LiwuAI Connect give you a free, self-sustaining business machine.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="https://lywuai.com"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-white text-blue-900 hover:bg-blue-50 font-bold rounded-xl text-sm transition-all flex items-center gap-2 shadow-md"
            >
              <span>Build Website on LywuAi</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* TRANSPARENT PRICING SECTION (Buffer Style) */}
      <section className="space-y-8 max-w-4xl mx-auto text-center">
        <div>
          <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Transparent Pricing
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
            Free forever for individuals & creators
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            No surprise charges. No credit card required to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Free Forever */}
          <div className="bg-white rounded-2xl border-2 border-blue-600 p-6 shadow-md space-y-5 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
              Popular Free Plan
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-lg">Free Forever</h3>
              <p className="text-xs text-slate-500">For creators & solopreneurs</p>
              <div className="mt-3">
                <span className="text-3xl font-extrabold text-slate-900">$0</span>
                <span className="text-xs text-slate-400"> / month</span>
              </div>
            </div>

            <ul className="text-xs text-slate-600 space-y-2.5">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Up to 3 Social Channels</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> 10 Scheduled Posts / channel</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> AI Composer & OpenRouter</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Pollinations Image Generation</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> No credit card needed</li>
            </ul>

            <button
              onClick={onGetStarted}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              Get Started Free
            </button>
          </div>

          {/* Pro */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Essentials</h3>
              <p className="text-xs text-slate-500">For power publishers</p>
              <div className="mt-3">
                <span className="text-3xl font-extrabold text-slate-900">$5</span>
                <span className="text-xs text-slate-400"> / month</span>
              </div>
            </div>

            <ul className="text-xs text-slate-600 space-y-2.5">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Unlimited Channels</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Unlimited Scheduled Posts</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> First-Comment Scheduling</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Advanced AI Analytics</li>
            </ul>

            <button
              onClick={onGetStarted}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              Start 14-Day Trial
            </button>
          </div>

          {/* Team */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Team</h3>
              <p className="text-xs text-slate-500">For agencies & groups</p>
              <div className="mt-3">
                <span className="text-3xl font-extrabold text-slate-900">$10</span>
                <span className="text-xs text-slate-400"> / month</span>
              </div>
            </div>

            <ul className="text-xs text-slate-600 space-y-2.5">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Everything in Essentials</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Unlimited Team Seats</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Draft Approval Workflows</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Client Report Sharing</li>
            </ul>

            <button
              onClick={onGetStarted}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
