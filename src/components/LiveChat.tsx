'use client';

import { useState, useRef, useEffect } from 'react';

function nanoid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

const QUICK_REPLIES = [
  'How do I create an event?',
  'What kinds of events?',
  'Themes and design?',
  'Privacy / data?',
];

const BOT_RESPONSES: Record<string, string> = {
  'how do i create an event?': 'Pick a category (Fashion, Food, Art, Wellness, Music, or Markets), add your details, and AI builds your page in under a minute. Head to /create to get started.',
  'what kinds of events?': 'Popup is built for pop-ups, sample sales, trunk shows, supper clubs, tastings, gallery openings, retreats, listening parties, and artisan markets. Fashion, food, art, wellness, music — you name it.',
  'themes and design?': 'We have 10 themes: Atelier, Harvest, Gallery, Botanica, Soirée, Brutalist, Zen, Maximalist, Neon, and Vintage. Each transforms your page with its own fonts, colors, and layout. Try them at /create.',
  'privacy / data?': 'We respect your data. No selling, no dark patterns. Event data is stored securely. You can delete your account and data at any time.',
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase().trim();
  for (const [key, response] of Object.entries(BOT_RESPONSES)) {
    if (lower.includes(key) || key.includes(lower)) return response;
  }
  if (lower.includes('create') || lower.includes('event') || lower.includes('make')) return BOT_RESPONSES['how do i create an event?'];
  if (lower.includes('pop') || lower.includes('fashion') || lower.includes('food') || lower.includes('tasting') || lower.includes('market')) return BOT_RESPONSES['what kinds of events?'];
  if (lower.includes('theme') || lower.includes('design') || lower.includes('look')) return BOT_RESPONSES['themes and design?'];
  if (lower.includes('privacy') || lower.includes('data') || lower.includes('gdpr')) return BOT_RESPONSES['privacy / data?'];
  return 'I can help with: creating events, event types (pop-ups, tastings, markets), themes and design, or privacy. Ask me anything!';
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function LiveChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) queueMicrotask(() => setUnread(0));
  }, [open]);

  const botDelayRef = useRef(1000);
  useEffect(() => {
    botDelayRef.current = 800 + Math.random() * 400;
  }, []);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: `u-${nanoid()}`, text: text.trim(), sender: 'user', timestamp: new Date() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const botText = getBotResponse(text);
      const botMsg: Message = { id: `b-${nanoid()}`, text: botText, sender: 'bot', timestamp: new Date() };
      setMessages((m) => [...m, botMsg]);
      setTyping(false);
      if (!open) setUnread((u) => u + 1);
    }, botDelayRef.current);
  };

  const handleQuickReply = (text: string) => {
    sendMessage(text);
  };

  return (
    <>
      <button
        onClick={() => { setOpen(!open); if (!open) inputRef.current?.focus(); }}
        className="fixed bottom-6 right-6 z-[9998] w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105"
        style={{ background: 'var(--accent)', color: 'var(--background)', boxShadow: '0 0 20px rgba(196,165,116,0.4)' }}
        aria-label="Open chat"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-xs font-bold bg-[#8B2500] text-white">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 z-[9998] w-[380px] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden flex flex-col shadow-2xl"
          style={{ background: 'rgba(45,36,32,0.98)', border: '1px solid rgba(196,165,116,0.2)', boxShadow: '0 0 40px rgba(196,165,116,0.15)', height: 480 }}
        >
          <div className="px-4 py-3 flex items-center justify-between" style={{ background: 'rgba(196,165,116,0.1)', borderBottom: '1px solid rgba(196,165,116,0.2)' }}>
            <span className="font-semibold text-[#C4A574]">Popup</span>
            <button onClick={() => setOpen(false)} className="text-sm text-[#A89070]" aria-label="Close">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ background: 'rgba(45,36,32,0.5)' }}>
            {messages.length === 0 && (
              <div className="text-sm mb-4 text-[#A89070]">
                Hi! I can help with creating events, event types, themes, or privacy. Ask anything.
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[85%] rounded-xl px-4 py-2 text-sm"
                  style={{
                    background: m.sender === 'user' ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                    color: m.sender === 'user' ? 'var(--background)' : '#F5EDE4',
                    border: m.sender === 'bot' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="rounded-xl px-4 py-2 text-sm" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            )}
            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleQuickReply(q)}
                    className="text-xs px-3 py-2 rounded-lg transition-all hover:border-[#C4A574]"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#A89070' }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
            className="p-4 flex gap-2"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 px-4 py-2 rounded-lg text-sm outline-none"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#F5EDE4' }}
            />
            <button type="submit" className="px-4 py-2 rounded-lg font-medium text-sm" style={{ background: 'var(--accent)', color: 'var(--background)' }}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
