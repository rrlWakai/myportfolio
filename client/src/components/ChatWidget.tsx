import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { API_BASE } from "../config";

type Role = "user" | "assistant";

type ChatMsg = {
  role: Role;
  text: string;
};

type ChatHistoryItem = {
  role: Role;
  text: string;
};

type ChatApiResponse = {
  reply?: string;
  error?: string;
};

const STARTER: ChatMsg = {
  role: "assistant",
  text: "Hi! I’m Rhen-Rhen’s portfolio assistant. Ask me about skills, services, or projects.",
};

function linkify(text: string) {
  const parts: React.ReactNode[] = [];
  const urlRegex = /(https?:\/\/[^\s]+)|(\bContact page\b)/gi;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = urlRegex.exec(text)) !== null) {
    const start = match.index;
    const end = start + match[0].length;

    if (start > lastIndex) parts.push(text.slice(lastIndex, start));

    const token = match[0];

    if (/^contact page$/i.test(token)) {
      parts.push(
        <Link
          key={`${start}-${end}`}
          to="/contact"
          className="underline underline-offset-2 font-medium"
        >
          Contact page
        </Link>
      );
    } else {
      const clean = token.replace(/[),.!?]+$/g, "");
      parts.push(
        <a
          key={`${start}-${end}`}
          href={clean}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2"
        >
          {clean}
        </a>
      );
    }

    lastIndex = end;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>(() => [STARTER]);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const history = useMemo<ChatHistoryItem[]>(
    () => messages.slice(-10).map((m) => ({ role: m.role, text: m.text })),
    [messages]
  );

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [open, messages, loading]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (!open) return;
      const panel = panelRef.current;
      if (panel && !panel.contains(e.target as Node)) setOpen(false);
    }
    if (open) window.addEventListener("mousedown", onMouseDown);
    return () => window.removeEventListener("mousedown", onMouseDown);
  }, [open]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", text }]);

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });

      const raw = await res.text();
      let data: ChatApiResponse;

      try {
        data = JSON.parse(raw) as ChatApiResponse;
      } catch {
        throw new Error(raw.slice(0, 140)); // shows HTML error safely
      }

      if (!res.ok) throw new Error(data.error ?? "Chat request failed.");

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply ?? "…" },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry — I couldn’t reply right now. Please try again, or use the Contact page.",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function onKeyDown(e: ReactKeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") sendMessage();
  }

  function clearChat() {
    setMessages([STARTER]);
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="
          fixed bottom-5 right-5 z-50
          btn rounded-full w-12 h-12
          inline-flex items-center justify-center
          shadow-lg shadow-black/10
          ring-1 ring-black/10 dark:ring-white/10
          hover:shadow-xl hover:shadow-black/10
          active:scale-[0.98]
          transition
          focus:outline-none focus:ring-4 focus:ring-[rgb(var(--accent-ring))]
        "
        aria-label="Open chat"
      >
        <Bot size={18} />
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="
              fixed bottom-20 right-5 z-50
              w-[360px] max-w-[92vw]
              overflow-hidden rounded-2xl
              glass shadow-2xl shadow-black/10
              border border-black/10 dark:border-white/10
              ring-1 ring-black/5 dark:ring-white/5
              backdrop-blur-xl
            "
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio assistant chat"
          >
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-black/10 dark:border-white/10">
              <div className="flex items-center gap-3">
                <span className="inline-flex w-9 h-9 items-center justify-center rounded-xl bg-black/5 dark:bg-white/10 ring-1 ring-black/10 dark:ring-white/10">
                  <img src="./avatar.png" alt="Rhen" />
                </span>

                <div className="leading-tight">
                  <p className="text-sm font-semibold text-head">Rhen-Rhen</p>
                  <p className="text-xs text-muted">
                    Skills • Services • Projects
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={clearChat}
                  className="
                    inline-flex items-center justify-center
                    w-9 h-9 rounded-xl
                    hover:bg-black/5 dark:hover:bg-white/10
                    active:scale-[0.98]
                    transition
                    ring-1 ring-transparent hover:ring-black/10 dark:hover:ring-white/10
                  "
                  aria-label="Clear chat"
                  title="Clear chat"
                >
                  <Trash2 size={16} />
                </button>

                <button
                  onClick={() => setOpen(false)}
                  className="
                    inline-flex items-center justify-center
                    w-9 h-9 rounded-xl
                    hover:bg-black/5 dark:hover:bg-white/10
                    active:scale-[0.98]
                    transition
                    ring-1 ring-transparent hover:ring-black/10 dark:hover:ring-white/10
                  "
                  aria-label="Close chat"
                  title="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={listRef}
              className="
                relative
                max-h-[380px] overflow-y-auto
                px-3.5 py-3.5 space-y-2.5
                [scrollbar-width:thin]
                [scrollbar-color:rgba(0,0,0,.18)_transparent]
                dark:[scrollbar-color:rgba(255,255,255,.18)_transparent]
              "
            >
              {messages.map((m, idx) => {
                const isUser = m.role === "user";
                return (
                  <div
                    key={idx}
                    className={`flex ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`
                        relative
                        max-w-[88%]
                        rounded-2xl px-3.5 py-2.5
                        text-[13px] leading-relaxed
                        shadow-sm
                        ${
                          isUser
                            ? "bg-[rgb(var(--accent)/.16)] text-head border border-[rgb(var(--accent)/.28)]"
                            : "bg-white/70 dark:bg-white/10 text-head border border-black/10 dark:border-white/10 backdrop-blur-md"
                        }
                      `}
                    >
                      {linkify(m.text)}
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex justify-start">
                  <div className="max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed bg-white/70 dark:bg-white/10 border border-black/10 dark:border-white/10 shadow-sm backdrop-blur-md">
                    <span className="inline-flex items-center gap-2">
                      <span className="text-muted">Typing</span>
                      <span className="inline-flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-black/30 dark:bg-white/30 animate-bounce [animation-delay:-0.2s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-black/30 dark:bg-white/30 animate-bounce [animation-delay:-0.1s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-black/30 dark:bg-white/30 animate-bounce" />
                      </span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-black/10 dark:border-white/10">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Type a message…"
                  className="
                    w-full bg-white/60 dark:bg-white/10
                    border border-black/10 dark:border-white/15
                    rounded-xl px-3 py-2.5 text-sm
                    placeholder:text-black/40 dark:placeholder:text-white/35
                    focus:outline-none
                    focus:ring-4 focus:ring-[rgb(var(--accent-ring))]
                    shadow-sm
                  "
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className={`
                    inline-flex items-center justify-center
                    w-10 h-10 rounded-xl
                    shadow-sm
                    active:scale-[0.98]
                    transition
                    ${
                      !input.trim() || loading
                        ? "opacity-50 cursor-not-allowed bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10"
                        : "btn ring-1 ring-black/10 dark:ring-white/10"
                    }
                  `}
                  aria-label="Send"
                  title="Send"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
