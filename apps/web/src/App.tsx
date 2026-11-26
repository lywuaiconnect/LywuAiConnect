import { useState } from 'react';
import { Layout } from './components/layout';
import { LandingPage } from './pages/index';
import { ComposePage } from './pages/compose';
import { CalendarPage } from './pages/calendar';
import { InboxPage } from './pages/inbox';
import { AnalyticsPage } from './pages/analytics';
import { ChannelsPage } from './pages/channels';
import { AIAssistant } from './components/ai-assistant';

export default function App() {
  const [page, setPage] = useState<'landing' | 'compose' | 'calendar' | 'inbox' | 'analytics' | 'channels'>('landing');

  return (
    <Layout currentPage={page} onNavigate={setPage}>
      {page === 'landing' && <LandingPage onGetStarted={() => setPage('compose')} />}
      {page === 'compose' && <ComposePage />}
      {page === 'calendar' && <CalendarPage />}
      {page === 'inbox' && <InboxPage />}
      {page === 'analytics' && <AnalyticsPage />}
      {page === 'channels' && <ChannelsPage />}
      <AIAssistant currentPage={page} onNavigate={setPage} />
    </Layout>
  );
}
