import React, { useState } from 'react';
import { 
  Sparkles, 
  Image as ImageIcon, 
  Calendar as CalendarIcon, 
  Send, 
  Clock, 
  Hash, 
  Wand2, 
  RefreshCw, 
  Check, 
  Copy, 
  Globe, 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Share2, 
  MoreHorizontal, 
  ThumbsUp, 
  Repeat, 
  Eye,
  Zap,
  Info
} from 'lucide-react';

interface PlatformMeta {
  key: string;
  name: string;
  icon: string;
  charLimit: number;
  badgeColor: string;
}

const PLATFORMS: PlatformMeta[] = [
  { key: 'instagram', name: 'Instagram', icon: '📸', charLimit: 2200, badgeColor: 'from-pink-500 to-purple-600' },
  { key: 'linkedin', name: 'LinkedIn', icon: '💼', charLimit: 3000, badgeColor: 'bg-blue-700' },
  { key: 'x', name: 'X (Twitter)', icon: '𝕏', charLimit: 280, badgeColor: 'bg-black' },
  { key: 'pinterest', name: 'Pinterest', icon: '📌', charLimit: 500, badgeColor: 'bg-red-600' },
  { key: 'facebook', name: 'Facebook', icon: '👍', charLimit: 63206, badgeColor: 'bg-blue-600' },
  { key: 'youtube', name: 'YouTube Shorts', icon: '▶️', charLimit: 5000, badgeColor: 'bg-red-500' },
  { key: 'telegram', name: 'Telegram', icon: '✈️', charLimit: 4096, badgeColor: 'bg-sky-500' },
  { key: 'bluesky', name: 'Bluesky', icon: '🦋', charLimit: 300, badgeColor: 'bg-sky-600' },
];

export function ComposePage() {
  const [content, setContent] = useState(
    "🚀 Excited to announce our new website created in 60 seconds with LywuAi! Free hosting on Cloudflare's edge with instant zero-code publishing.\n\nCheck it out and let me know your thoughts 👇\nhttps://lywuai.com"
  );
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram', 'linkedin', 'x', 'pinterest']);
  const [previewPlatform, setPreviewPlatform] = useState<string>('instagram');
  const [tone, setTone] = useState<'high_converting' | 'casual' | 'thought_leadership' | 'punchy'>('high_converting');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('Modern minimal SaaS dashboard with vibrant gradient lighting');
  const [imageUrl, setImageUrl] = useState<string>(
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1080&auto=format&fit=crop&q=80'
  );
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scheduledSuccess, setScheduledSuccess] = useState(false);

  const togglePlatform = (key: string) => {
    if (selectedPlatforms.includes(key)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter((p) => p !== key));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, key]);
    }
  };

  // AI Enhancer
  const handleAIEnhance = (mode: 'viral' | 'hashtags' | 'website') => {
    setIsEnhancing(true);
    setTimeout(() => {
      if (mode === 'viral') {
        setContent(
          `⚡ Building a website used to take weeks and thousands of dollars.\n\nToday, we generated and launched our full brand live on Cloudflare's global edge in 60 seconds using LywuAi.\n\nHere is how we did it with zero code and zero hosting fees 👇\nhttps://lywuai.com\n\n#BuildInPublic #AIWebsite #SaaS #Cloudflare`
        );
      } else if (mode === 'hashtags') {
        if (!content.includes('#')) {
          setContent(
            `${content}\n\n#AIWebsites #SocialGrowth #CloudflareEdge #WebDevelopment #Automation #Productivity`
          );
        }
      } else if (mode === 'website') {
        setContent(
          `🌐 We just updated our live website at LywuAi!\n\nExplore our latest services, customer reviews, and interactive booking system.\n\nLive preview: https://lywuai.com\n\nWhat do you think of the new design? Let us know in the comments!`
        );
      }
      setIsEnhancing(false);
    }, 600);
  };

  // AI Image Generator
  const handleGenerateImage = () => {
    if (!imagePrompt.trim()) return;
    setIsGeneratingImage(true);
    setTimeout(() => {
      // Pollinations free AI image endpoint
      const freeImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
        imagePrompt
      )}?width=1080&height=1080&nologo=true&seed=${Math.floor(Math.random() * 100000)}`;
      setImageUrl(freeImageUrl);
      setIsGeneratingImage(false);
    }, 1200);
  };

  const currentLimit = PLATFORMS.find((p) => p.key === previewPlatform)?.charLimit || 2200;
  const isOverLimit = content.length > currentLimit;

  const handleSchedule = () => {
    setScheduledSuccess(true);
    setTimeout(() => setScheduledSuccess(false), 3000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              AI Post Composer
            </h1>
            <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Multi-Publish
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-0.5">
            Craft your post once, optimize with AI, and preview across every social network in real time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 shadow-xs"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handleSchedule}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-lg text-sm font-semibold shadow-sm shadow-blue-600/30 transition-all flex items-center gap-2"
          >
            <Clock className="w-4 h-4" />
            <span>Add to Queue</span>
          </button>
        </div>
      </div>

      {scheduledSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl flex items-center justify-between text-sm shadow-xs animate-slide-up">
          <div className="flex items-center gap-2 font-medium">
            <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
            Post scheduled successfully to {selectedPlatforms.length} channels for the next optimal slot!
          </div>
          <span className="text-xs text-emerald-600 font-semibold">Tues 10:15 AM (AI Recommended)</span>
        </div>
      )}

      {/* Target Platforms Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Publish To ({selectedPlatforms.length} selected):
          </span>
          <span className="text-xs text-slate-400">Click to toggle channels</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map((platform) => {
            const isSelected = selectedPlatforms.includes(platform.key);
            return (
              <button
                key={platform.key}
                onClick={() => togglePlatform(platform.key)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300'
                }`}
              >
                <span>{platform.icon}</span>
                <span>{platform.name}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split Grid: Editor (Left) & Device Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Composer & AI Tools */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            {/* Tone selector */}
            <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100">
              <span className="font-semibold text-slate-600">Tone & Style:</span>
              <div className="flex gap-1.5">
                {[
                  { key: 'high_converting', label: '🚀 Viral / Engaging' },
                  { key: 'thought_leadership', label: '💼 Professional' },
                  { key: 'casual', label: '☕ Friendly' },
                  { key: 'punchy', label: '⚡ Punchy' },
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTone(t.key as any)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                      tone === t.key
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Textarea */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What do you want to share? Type your idea or click an AI action below..."
              rows={8}
              className="w-full text-sm sm:text-base text-slate-900 placeholder:text-slate-400 border-none outline-none resize-none leading-relaxed font-normal"
            />

            {/* Character Limits & Stats */}
            <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100 text-slate-500">
              <div className="flex items-center gap-3">
                <span className={`font-mono font-semibold ${isOverLimit ? 'text-red-600' : 'text-slate-700'}`}>
                  {content.length} characters
                </span>
                <span>·</span>
                <span>{content.trim() ? content.trim().split(/\s+/).length : 0} words</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span>Limit for {previewPlatform}:</span>
                <span className="font-mono font-semibold text-slate-700">{currentLimit}</span>
              </div>
            </div>
          </div>

          {/* AI Copilot Quick Actions */}
          <div className="bg-gradient-to-r from-blue-50/70 via-indigo-50/70 to-purple-50/70 border border-blue-200/80 rounded-2xl p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  AI Assistant (OpenRouter Free Tier)
                </span>
              </div>
              <span className="text-[11px] font-semibold text-indigo-700 bg-white/80 px-2 py-0.5 rounded-full border border-indigo-100">
                ⚡ 100% Free
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() => handleAIEnhance('viral')}
                disabled={isEnhancing}
                className="flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all hover:scale-[1.01]"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Make It Viral</span>
              </button>

              <button
                onClick={() => handleAIEnhance('hashtags')}
                disabled={isEnhancing}
                className="flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all hover:scale-[1.01]"
              >
                <Hash className="w-3.5 h-3.5 text-blue-500" />
                <span>Add Smart Tags</span>
              </button>

              <button
                onClick={() => handleAIEnhance('website')}
                disabled={isEnhancing}
                className="flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all hover:scale-[1.01]"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>Promote Website</span>
              </button>
            </div>
          </div>

          {/* Media / Free AI Image Generator */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-bold text-slate-900">Post Visual / Media</span>
              </div>
              <span className="text-[11px] text-slate-500">Pollinations AI · No API key needed</span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                placeholder="Describe image to generate with AI..."
                className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-colors"
              />
              <button
                onClick={handleGenerateImage}
                disabled={isGeneratingImage}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5"
              >
                {isGeneratingImage ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                <span>{isGeneratingImage ? 'Generating...' : 'Generate'}</span>
              </button>
            </div>

            {imageUrl && (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100 group">
                <img src={imageUrl} alt="Post attachment" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button 
                    onClick={() => setImageUrl('')}
                    className="px-3 py-1 bg-white/90 hover:bg-white text-red-600 rounded-lg text-xs font-semibold shadow-xs"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Realistic Device Mockup Preview (Buffer Signature) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Live Preview
                </span>
              </div>

              {/* Preview Platform Switcher */}
              <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                {['instagram', 'linkedin', 'x', 'pinterest'].map((pKey) => (
                  <button
                    key={pKey}
                    onClick={() => setPreviewPlatform(pKey)}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold capitalize transition-all ${
                      previewPlatform === pKey
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {pKey === 'x' ? '𝕏' : pKey}
                  </button>
                ))}
              </div>
            </div>

            {/* MOCKUP CONTAINER */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 overflow-hidden">
              {/* INSTAGRAM MOCKUP */}
              {previewPlatform === 'instagram' && (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs max-w-sm mx-auto text-xs">
                  {/* Insta Header */}
                  <div className="flex items-center justify-between p-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-pink-600 p-[1.5px]">
                        <div className="w-full h-full bg-white rounded-full p-[1px]">
                          <div className="w-full h-full bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-[10px]">
                            L
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 font-bold text-slate-900 leading-none">
                          lywuai.official
                          <span className="w-2.5 h-2.5 bg-blue-500 rounded-full inline-block text-[8px] text-white text-center leading-[10px]">✓</span>
                        </div>
                        <span className="text-[10px] text-slate-400">Sponsored / Live Website</span>
                      </div>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-slate-400" />
                  </div>

                  {/* Insta Image */}
                  {imageUrl && (
                    <div className="aspect-square w-full bg-slate-100 overflow-hidden">
                      <img src={imageUrl} alt="Insta post" className="w-full h-full object-cover" />
                    </div>
                  )}

                  {/* Insta Action Bar */}
                  <div className="p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-slate-700 hover:text-red-500 cursor-pointer" />
                        <MessageCircle className="w-5 h-5 text-slate-700 cursor-pointer" />
                        <Share2 className="w-5 h-5 text-slate-700 cursor-pointer" />
                      </div>
                      <Bookmark className="w-5 h-5 text-slate-700 cursor-pointer" />
                    </div>

                    <p className="font-bold text-slate-900 text-[11px]">1,284 likes</p>

                    {/* Insta Caption */}
                    <div className="text-[11px] text-slate-800 leading-relaxed space-y-1">
                      <span className="font-bold text-slate-900 mr-1.5">lywuai.official</span>
                      <span className="whitespace-pre-line">{content}</span>
                    </div>

                    <p className="text-[10px] text-slate-400 pt-1 uppercase">2 hours ago</p>
                  </div>
                </div>
              )}

              {/* LINKEDIN MOCKUP */}
              {previewPlatform === 'linkedin' && (
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs max-w-sm mx-auto text-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-md bg-blue-700 text-white flex items-center justify-center font-bold text-sm">
                        L
                      </div>
                      <div>
                        <div className="flex items-center gap-1 font-bold text-slate-900 leading-tight">
                          LywuAi Technologies
                          <span className="text-slate-400 font-normal">· 1st</span>
                        </div>
                        <p className="text-[10px] text-slate-500">Live Your Website Using AI · 12,450 followers</p>
                        <p className="text-[10px] text-slate-400 flex items-center gap-1">Just now · 🌐</p>
                      </div>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-slate-400" />
                  </div>

                  <p className="text-slate-800 whitespace-pre-line text-xs leading-relaxed">
                    {content}
                  </p>

                  {imageUrl && (
                    <div className="rounded-lg overflow-hidden border border-slate-100 aspect-video bg-slate-100">
                      <img src={imageUrl} alt="LinkedIn media" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-600 font-semibold text-[11px]">
                    <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                      <ThumbsUp className="w-3.5 h-3.5" /> Like
                    </span>
                    <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                      <MessageCircle className="w-3.5 h-3.5" /> Comment
                    </span>
                    <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                      <Repeat className="w-3.5 h-3.5" /> Repost
                    </span>
                    <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                      <Send className="w-3.5 h-3.5" /> Send
                    </span>
                  </div>
                </div>
              )}

              {/* X (TWITTER) MOCKUP */}
              {previewPlatform === 'x' && (
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs max-w-sm mx-auto text-xs space-y-3">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      𝕏
                    </div>
                    <div className="space-y-1 w-full">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-slate-900">LywuAi</span>
                          <span className="text-[9px] bg-blue-500 text-white rounded-full px-1">✓</span>
                          <span className="text-slate-400">@lywuai_hq · 1m</span>
                        </div>
                        <MoreHorizontal className="w-3.5 h-3.5 text-slate-400" />
                      </div>

                      <p className="text-slate-900 text-xs whitespace-pre-line leading-relaxed">
                        {content}
                      </p>

                      {imageUrl && (
                        <div className="mt-2 rounded-xl overflow-hidden border border-slate-100 aspect-video bg-slate-100">
                          <img src={imageUrl} alt="X media" className="w-full h-full object-cover" />
                        </div>
                      )}

                      <div className="pt-2 flex items-center justify-between text-slate-400 text-[10px]">
                        <span className="flex items-center gap-1 hover:text-blue-500 cursor-pointer">
                          <MessageCircle className="w-3.5 h-3.5" /> 42
                        </span>
                        <span className="flex items-center gap-1 hover:text-green-500 cursor-pointer">
                          <Repeat className="w-3.5 h-3.5" /> 18
                        </span>
                        <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer">
                          <Heart className="w-3.5 h-3.5" /> 156
                        </span>
                        <span className="flex items-center gap-1 hover:text-blue-500 cursor-pointer">
                          <Bookmark className="w-3.5 h-3.5" /> 29
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PINTEREST MOCKUP */}
              {previewPlatform === 'pinterest' && (
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs max-w-[260px] mx-auto text-xs space-y-2 pb-3">
                  <div className="aspect-[2/3] w-full bg-slate-100 overflow-hidden relative group">
                    <img src={imageUrl} alt="Pinterest Pin" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-red-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-full shadow-md">
                      Save
                    </div>
                    <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs text-slate-900 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      <Globe className="w-2.5 h-2.5 text-red-600" /> lywuai.com
                    </div>
                  </div>

                  <div className="px-3 space-y-1">
                    <p className="font-bold text-slate-900 text-xs line-clamp-1">
                      {content.slice(0, 45)}...
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                      <div className="w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center text-[8px] font-bold">
                        P
                      </div>
                      <span>LywuAi Pins</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
