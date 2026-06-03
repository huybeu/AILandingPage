'use client';
import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { sendChatMessage, type ChatMessage } from '@/lib/chat';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'bot'; text: string }>>([]);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const msgsRef = useRef<HTMLDivElement>(null);

  const QUICK = ['Khoá học dành cho ai?', 'Học phí bao nhiêu?', '6 AI tặng kèm là gì?', 'Thời gian học?'];

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages]);

  const handleOpen = () => {
    setOpen(true);
    if (messages.length === 0) {
      setMessages([{ role: 'bot', text: 'Xin chào! 👋 Tôi là trợ lý AI tư vấn về khoá học <strong>Quản Trị AI</strong> của diễn giả Lê Công Năng. Bạn muốn hỏi điều gì?' }]);
    }
  };

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    setInput('');
    setShowQuick(false);
    const userMsg = { role: 'user' as const, text };
    setMessages((prev) => [...prev, userMsg]);
    const newHist: ChatMessage[] = [...history, { role: 'user', content: text }];
    setHistory(newHist);
    setLoading(true);
    setMessages((prev) => [...prev, { role: 'bot', text: '💬 Đang trả lời...' }]);
    try {
      const reply = await sendChatMessage(newHist);
      setMessages((prev) => [...prev.slice(0, -1), { role: 'bot', text: reply }]);
      setHistory((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [...prev.slice(0, -1), { role: 'bot', text: 'Xin lỗi, có lỗi kết nối. Vui lòng gọi <strong>0931 722 777</strong>!' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button id="fab" onClick={handleOpen}>
        <Icon icon="lucide:bot" width={24} color="#fff" />
        <div className="fab-badge">AI</div>
      </button>

      {open && (
        <div id="chat-win" className="open">
          <div className="cw-head">
            <div className="cw-av">
              <Icon icon="lucide:bot" width={20} color="var(--gold)" />
            </div>
            <div>
              <div className="cw-name">Tư Vấn Khoá Học AI</div>
              <div className="cw-status">
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block' }} />
                Trực tuyến
              </div>
            </div>
            <div className="cw-x" onClick={() => setOpen(false)}>
              <Icon icon="lucide:x" width={13} color="var(--text-dim)" />
            </div>
          </div>

          <div className="cw-msgs" ref={msgsRef}>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`msg ${m.role}`}
                dangerouslySetInnerHTML={{ __html: m.text.replace(/\n/g, '<br>') }}
              />
            ))}
          </div>

          {showQuick && (
            <div className="cw-quick">
              {QUICK.map((q) => (
                <span key={q} className="cw-q" onClick={() => send(q)}>{q}</span>
              ))}
            </div>
          )}

          <div className="cw-inp-row">
            <textarea
              className="cw-inp"
              placeholder="Nhập câu hỏi..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); }
              }}
            />
            <button className="cw-send" onClick={() => send(input)}>
              <Icon icon="lucide:send" width={15} color="#fff" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
