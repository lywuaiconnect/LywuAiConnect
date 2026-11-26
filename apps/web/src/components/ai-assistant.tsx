import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, X, Sparkles, HelpCircle, Calendar, PenTool, Users, BarChart3 } from 'lucide-react';

interface AIAssistantProps {
  currentPage: string;
  onNavigate: (page: 'landing' | 'compose' | 'calendar' | 'inbox' | 'analytics' | 'channels') => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const FEATURE_HELP = {
  compose: {
    title: "AI Composer",
    description: "Generate, rewrite, and optimize social media posts using AI. Create content for any platform with smart suggestions.",
    features: [
      "AI-powered post generation",
      "Platform-specific formatting",
      "Hashtag suggestions",
      "Tone adjustment (professional, casual, creative, energetic)",
      "Content repurposing across platforms",
      "Grammar and spelling correction"
    ],
    howToUse: "Click 'Composer' in the top nav, type your idea, then hit 'Generate with AI' to get instant content suggestions.",
    quickTips: [
      "Paste a URL for AI to create platform-specific posts",
      "Use 'Repurpose' to convert content for different platforms",
      "Save drafts to save your work"
    ]
  },
  calendar: {
    title: "Calendar & Queue",
    description: "Schedule posts for optimal timing. View your content calendar and manage your publishing queue.",
    features: [
      "Drag-and-drop scheduling",
      "AI-suggested best times",
      "Multi-channel queue view",
      "Calendar month view",
      "Time zone support",
      "Recurring post scheduling"
    ],
    howToUse: "Go to Calendar tab. Drag posts from Composer to schedule, or click time slots to add posts.",
    quickTips: [
      "AI shows optimal posting times based on engagement data",
      "Queue order changes execution sequence",
      "Click calendar days to open Composer"
    ]
  },
  analytics: {
    title: "Analytics Dashboard",
    description: "Track your social media performance with detailed analytics and insights.",
    features: [
      "Engagement metrics (likes, comments, shares)",
      "Reach and impressions dashboard",
      "Top performing posts analysis",
      "Platform comparison charts",
      "Audience insights",
      "Growth trends over time"
    ],
    howToUse: "Navigate to Analytics tab to view visual charts and detailed metrics for your posts.",
    quickTips: [
      "Click any post to see detailed breakdown",
      "Filter by date range or platform",
      "Export data as CSV for reports"
    ]
  },
  channels: {
    title: "Social Channels",
    description: "Connect and manage all your social media accounts in one place.",
    features: [
      "Multi-platform support (Instagram, Twitter, LinkedIn, Facebook, TikTok, Pinterest)",
      "Unified dashboard",
      "Token management & refresh",
      "Connection status monitoring",
      "Platform-specific settings"
    ],
    howToUse: "Click 'Channels', then 'Connect' to link any supported social media platform.",
    quickTips: [
      "Some platforms require business/creator accounts",
      "Tokens auto-refresh for continuous posting",
      "Test connections before scheduling"
    ]
  },
  inbox: {
    title: "Community Inbox",
    description: "Manage comments and messages from all your social platforms in one unified inbox.",
    features: [
      "Unified comment feed across all platforms",
      "AI-powered reply suggestions",
      "Sentiment analysis (positive/negative/neutral)",
      "Quick reply templates",
      "Assign comments to team members",
      "Mark as read/unread status"
    ],
    howToUse: "Visit Inbox tab to see all incoming comments, replies, and messages from connected platforms.",
    quickTips: [
      "Use AI suggestions to craft professional replies",
      "Mark important comments with tags",
      "Filter by sentiment or urgency"
    ]
  },
  landing: {
    title: "Landing / Welcome",
    description: "Your starting point for all social media management with AI assistance.",
    features: [
      "Get Started wizard",
      "Platform introductions",
      "Quick feature demos",
      "Free tier benefits overview"
    ],
    howToUse: "Start here to explore the platform, connect accounts, and schedule your first post.",
    quickTips: [
      "Click 'Get Started' to begin onboarding",
      "Use AI Assistant button anytime for help",
      "All features are available in free tier"
    ]
  }
};

const HELP_TOPICS = {
  'getting started': {
    title: 'Getting Started',
    content: `To get started with LiwuAI Connect:\n\n1. **Connect your social channels** - Go to Channels tab\n2. **Set up your profile** - Add profile picture and bio\n3. **Create your first post** - Use the Composer (AI helps!)\n4. **Schedule or post** - Use Calendar or Post Now\n5. **Monitor performance** - Check Analytics regularly\n\nNeed help with any step? Just ask me!\n\n💡 Tip: Start with 1-2 channels for best results.`
  },
  'ai features': {
    title: 'AI Features',
    content: `LiwuAI Connect's AI Assistant can:\n\n• **Generate post ideas** - Brainstorm content in seconds\n• **Rewrite content** - Improve tone and clarity\n• **Add hashtags** - Platform-optimized suggestions\n• **Suggest best times** - Based on engagement patterns\n• **Repurpose content** - Turn one post into many\n• **Answer questions** - Ask me anything about features\n\nTry asking: "Make this more engaging" or "What hashtags should I use?"`
  },
  'scheduling': {
    title: 'Scheduling Posts',
    content: `How to schedule posts:\n\n1. Click **Composer** in navigation\n2. Write or paste your content\n3. Click **Schedule** (not "Post Now")\n4. Choose date and time\n5. Select which channels to post to\n6. Click **Schedule Post**\n\n**Pro Tips:**\n• AI suggests optimal posting times\n• View all scheduled posts in Calendar\n• Edit or cancel anytime before posting\n• Schedule unlimited posts in free tier`
  },
  'platform integration': {
    title: 'Platform Integration',
    content: `Supported platforms & how to connect:\n\n**Direct API Integrations:**\n• Instagram (Business/Creator accounts)\n• Twitter/X\n• LinkedIn\n• Pinterest\n• Facebook (Pages only, not personal profiles)\n• YouTube\n\n**Via Partners (Make/Zapier):**\n• TikTok\n• Reddit\n• Discord\n• Telegram\n\n**Federated Platforms:**\n• Bluesky\n• Mastodon\n\n**To connect:**\n1. Go to **Channels** tab\n2. Click **Connect** for your platform\n3. Authorize the connection\n4. Return to LiwuAI Connect`
  }
};

export function AIAssistant({ currentPage, onNavigate }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: `Hi! I'm your AI Assistant 👋 I can help you navigate LiwuAI Connect.

Currently you're on: **${currentPage === 'landing' ? 'Home/Landing Page' :
  currentPage === 'compose' ? 'Composer' :
  currentPage === 'calendar' ? 'Calendar' :
  currentPage === 'analytics' ? 'Analytics' :
  currentPage === 'channels' ? 'Channels' :
  currentPage === 'inbox' ? 'Community Inbox' : currentPage}**

What would you like to know about? I can help with:
• How to use specific features
• Getting started tips
• Platform-specific questions
• Workflow optimization

Try asking: "How do I schedule a post?" or "What can I do with the Composer?"`
        }
      ]);
    }
  }, [currentPage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleQuickQuestion = (question: string) => {
    setMessages(prev => [...prev, { role: 'user', content: question }]);
    getAIResponse(question);
  };

  const getAIResponse = async (question: string) => {
    setIsLoading(true);

    const lowerQuestion = question.toLowerCase();

    let response = '';

    if (lowerQuestion.includes('schedule') || lowerQuestion.includes('post') && lowerQuestion.includes('when')) {
      response = `To schedule a post:\n\n1. Click the "Composer" button in the top right\n2. Write or paste your content\n3. Click "Schedule" instead of "Post"\n4. Choose your date and time\n5. Select which channels to post to\n\n💡 Pro tip: Check the Calendar view to see optimal posting times suggested by AI!`;
    } else if (lowerQuestion.includes('composer') || lowerQuestion.includes('ai') && lowerQuestion.includes('write')) {
      response = `The AI Composer helps you:\n\n• Generate post ideas automatically\n• Rewrite and improve existing content\n• Optimize for different platforms (Twitter, LinkedIn, Instagram)\n• Add relevant hashtags\n• Adjust tone (professional, casual, creative, energetic)\n\nJust type your idea in the Composer and click "Generate" to let AI help craft your message.`;
    } else if (lowerQuestion.includes('how to connect') || lowerQuestion.includes('channel')) {
      response = `To connect social channels:\n\n1. Go to the "Channels" page in the navigation\n2. Click "Connect" for your platform\n3. You'll be redirected to the platform's OAuth\n4. Grant permission and you're done!\n\nSupported platforms: Instagram, Facebook, Twitter/X, LinkedIn, TikTok, Pinterest, Bluesky, Mastodon, Threads, and more.`;
    } else if (lowerQuestion.includes('analytics') || lowerQuestion.includes('performance')) {
      response = `Analytics Dashboard features:\n\n• Track engagement rates (likes, comments, shares)\n• See your most successful posts\n• Compare performance across platforms\n• Get AI suggestions to improve your strategy\n\nNavigate to Analytics to explore insights about your content performance.`;
    } else if (lowerQuestion.includes('free') || lowerQuestion.includes('cost')) {
      response = `LiwuAI Connect is 100% free forever!\n\n• No credit card required\n• No time limits\n• All basic features included\n• Premium features for power users coming soon\n\nCreated by the team behind LiwuAi - the AI website builder.`;
    } else {
      response = `I can help you with:\n\n**Posting & Content:**\n• Scheduling posts\n• AI content generation\n• Platform optimization\n\n**Analytics:**\n• Performance tracking\n• Best time suggestions\n• Content insights\n\n**Management:**\n• Connecting channels\n• Team collaboration\n• Comment inbox\n\nTry asking me specific questions like:\n"How do I schedule my first post?"\n"What platforms can I connect?"\n"How does the AI composer work?"`;
    }

    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: inputValue }]);
    setInputValue('');
    getAIResponse(inputValue);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-lg hover:scale-110 transition-all flex items-center justify-center"
        title="Ask AI Assistant"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 z-50 w-full max-w-sm h-[500px] md:h-[600px] bg-white rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg">AI Assistant</h3>
            <p className="text-xs opacity-90">LwuAI Connect Help</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Actions */}
      <div className="p-3 border-b border-slate-200 bg-slate-50">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleQuickQuestion("How do I schedule a post?")}
            className="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
          >
            Schedule Post
          </button>
          <button
            onClick={() => handleQuickQuestion("How do I connect my channels?")}
            className="text-xs px-3 py-1.5 bg-green-50 text-green-700 rounded-full hover:bg-green-100 transition-colors"
          >
            Connect Channels
          </button>
          <button
            onClick={() => handleQuickQuestion("What can the AI do?")}
            className="text-xs px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full hover:bg-purple-100 transition-colors"
          >
            AI Features
          </button>
          <button
            onClick={() => handleQuickQuestion("How does analytics work?")}
            className="text-xs px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full hover:bg-teal-100 transition-colors"
          >
            Analytics
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message, i) => (
          <div
            key={i}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                AI
              </div>
            )}
            <div
              className={`rounded-2xl px-4 py-3 max-w-[280px] ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-800'
              }`}
            >
              <p className="whitespace-pre-line text-sm">{message.content}</p>
            </div>
            {message.role === 'user' && (
              <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              AI
            </div>
            <div className="bg-slate-100 rounded-2xl px-4 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-slate-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKey}
            placeholder="Ask me anything about LiwuAI Connect..."
            className="flex-1 px-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-slate-400 text-center mt-1">
          AI Assistant available 24/7 • Type your question and I'll help!
        </p>
      </div>
    </div>
  );
}