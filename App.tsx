
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Message, Role } from './types';
import { geminiService } from './services/geminiService';
import { INITIAL_GREETING, COLORS } from './constants';
import { ShieldIcon, PhoneIcon, SendIcon } from './components/Icons';
import { LionVisual } from './components/LionVisual';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: INITIAL_GREETING,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const assistantId = (Date.now() + 1).toString();
    const initialAssistantMessage: Message = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, initialAssistantMessage]);

    try {
      await geminiService.sendMessage(inputValue, (fullText) => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === assistantId ? { ...msg, content: fullText } : msg
          )
        );
      });
    } catch (err) {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === assistantId 
            ? { ...msg, content: "I encountered a minor disruption in my link. Please try again, or if this is urgent, contact our response team at 845-600-0082." } 
            : msg
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  const QuickAction = ({ label, onClick }: { label: string; onClick: () => void }) => (
    <button 
      onClick={onClick}
      className="px-4 py-2 text-sm bg-gray-800/50 border border-gray-700 hover:border-[#c9a96e] hover:text-[#c9a96e] rounded-full transition-all duration-300 orbitron whitespace-nowrap"
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col h-screen bg-[#1f2a3a] cyber-grid overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-[#1a222f] border-b border-[#c9a96e]/20 z-20 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#c9a96e]/10 rounded-lg">
            <ShieldIcon className="w-8 h-8 text-[#c9a96e]" />
          </div>
          <div>
            <h1 className="text-xl font-bold orbitron text-[#c9a96e] tracking-wider uppercase">Lion of Cyber</h1>
            <p className="text-[10px] orbitron text-gray-400 tracking-widest">PROACTIVE DEFENSE SENTINEL</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="tel:8456000082" className="flex items-center gap-2 text-sm text-[#e5e7eb] hover:text-[#c9a96e] transition-colors">
            <PhoneIcon className="w-4 h-4 text-[#c9a96e]" />
            <span className="orbitron">845-600-0082</span>
          </a>
          <a 
            href="https://www.lionofcyber.com/contact-us" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-1.5 bg-[#c9a96e] text-[#1a222f] orbitron text-xs font-bold rounded hover:bg-[#d4b47a] transition-all"
          >
            FREE ASSESSMENT
          </a>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-hidden flex flex-col relative max-w-5xl mx-auto w-full px-4 pt-4">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-6 pb-24 px-2 scroll-smooth"
        >
          {/* Centered Lion Visual */}
          <LionVisual />

          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`
                max-w-[85%] md:max-w-[75%] p-4 rounded-2xl shadow-sm
                ${msg.role === 'user' 
                  ? 'bg-[#c9a96e]/10 border border-[#c9a96e]/20 text-[#e5e7eb] rounded-tr-none' 
                  : 'bg-[#1a222f]/80 border border-gray-700/50 text-[#e5e7eb] rounded-tl-none'}
              `}>
                <div className={`text-xs orbitron mb-2 ${msg.role === 'user' ? 'text-[#c9a96e]/80 text-right' : 'text-[#c9a96e]/80'}`}>
                  {msg.role === 'user' ? 'PRIDE MEMBER' : 'LION AI'}
                </div>
                <div className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                  {msg.content || (
                    <div className="flex gap-1 items-center h-5">
                      <div className="w-1.5 h-1.5 bg-[#c9a96e] rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-[#c9a96e] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-1.5 h-1.5 bg-[#c9a96e] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    </div>
                  )}
                </div>
                <div className="text-[10px] mt-3 opacity-30 text-right uppercase tracking-tighter">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Quick Actions */}
        <div className="absolute bottom-24 left-0 right-0 px-4 overflow-x-auto no-scrollbar flex gap-2 justify-center pb-2">
           <QuickAction 
             label="🚨 EMERGENCY RESPONSE" 
             onClick={() => {
                setInputValue("I have an active security incident! Help!");
                handleSendMessage();
             }} 
           />
           <QuickAction 
             label="🔒 2026 THREATS" 
             onClick={() => {
                setInputValue("What are the top cyber threats for 2026?");
                handleSendMessage();
             }} 
           />
           <QuickAction 
             label="🛡️ FREE ASSESSMENT" 
             onClick={() => window.open('https://www.lionofcyber.com/contact-us', '_blank')} 
           />
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#1f2a3a] via-[#1f2a3a] to-transparent">
          <form 
            onSubmit={handleSendMessage}
            className="relative flex items-center bg-[#1a222f] border border-[#c9a96e]/30 rounded-full gold-glow transition-all focus-within:border-[#c9a96e]"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="How can I help you guard your pride today?"
              disabled={isTyping}
              className="flex-1 bg-transparent py-4 pl-6 pr-14 text-sm md:text-base text-[#e5e7eb] focus:outline-none placeholder:text-gray-500"
            />
            <button
              type="submit"
              disabled={isTyping || !inputValue.trim()}
              className="absolute right-2 p-2 rounded-full bg-[#c9a96e] text-[#1a222f] hover:bg-[#d4b47a] transition-all disabled:opacity-50 disabled:grayscale"
            >
              <SendIcon className="w-6 h-6" />
            </button>
          </form>
          <p className="text-[9px] text-center mt-2 text-gray-500 orbitron tracking-tighter">
            PROACTIVE 24/7 SUPPORT POWERED BY LION OF CYBER • © 2026
          </p>
        </div>
      </main>
    </div>
  );
};

export default App;
