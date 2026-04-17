import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
}

interface ChatBarProps {
  onSendMessage: (msg: string) => void;
  messages: ChatMessage[];
}

export const ChatBar: React.FC<ChatBarProps> = ({ onSendMessage, messages }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', borderLeft: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
      {/* Header */}
      <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>
        AegisAgent Asistente
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.length === 0 && <div style={{ color: 'var(--text-secondary)', textAlign: 'center', fontSize: '0.875rem', marginTop: '2rem' }}>Dime qué deseas analizar...</div>}
        {messages.map((m) => (
          <div key={m.id} style={{ display: 'flex', gap: '0.75rem', flexDirection: m.sender === 'user' ? 'row-reverse' : 'row' }}>
            <div style={{ flexShrink: 0, width: '32px', height: '32px', borderRadius: '50%', backgroundColor: m.sender === 'user' ? 'var(--info)' : 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {m.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div style={{ 
              backgroundColor: m.sender === 'user' ? 'var(--bg-tertiary)' : 'rgba(47, 129, 247, 0.1)', 
              padding: '0.75rem 1rem', 
              borderRadius: '8px', 
              fontSize: '0.875rem',
              border: m.sender === 'agent' ? '1px solid rgba(47, 129, 247, 0.3)' : '1px solid var(--border-color)',
              maxWidth: '85%'
            }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            type="text" 
            placeholder="Analiza la IP 192..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            style={{ flex: 1, padding: '0.75rem', borderRadius: '24px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
          />
          <button 
            onClick={handleSend}
            style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <Send size={18} style={{ marginLeft: '-2px' }}/>
          </button>
        </div>
      </div>
    </div>
  );
};
