import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Trash2 } from "lucide-react";

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

  // Scroll to bottom when open/new messages
  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [open, messages, loading]);

  // Focus input when opening
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [open]);

  // ESC to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Click outside to close
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
      // ✅ Use proxy path (set in vite.config.ts)
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });

      const data: ChatApiResponse = await res.json();

      if (!res.ok) throw new Error(data.error ?? "Chat request failed.");

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply ?? "…" },
      ]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error occurred";
      console.error(msg);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry — I couldn’t reply right now. Please try again, or use the Contact page.",
        },
      ]);
    } finally {
      setLoading(false);
      // keep focus ready for the next message
      inputRef.current?.focus();
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
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
                  <Bot size={16} className="text-accent" />
                </span>

                <div className="leading-tight">
                  <p className="text-sm font-semibold text-head">
                    Portfolio Assistant
                  </p>
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
              {/* Background texture (design only) */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute inset-0
                  opacity-100
                  [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]
                "
              >
                {/* soft gradient wash */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/[0.03] via-transparent to-black/[0.04] dark:from-white/[0.05] dark:to-white/[0.02]" />
                {/* subtle grid texture */}
                <div
                  className="
                    absolute inset-0 opacity-[0.10] dark:opacity-[0.12]
                    [background-image:linear-gradient(to_right,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.08)_1px,transparent_1px)]
                    dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)]
                    [background-size:22px_22px]
                  "
                />
              </div>

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
                      {m.text}
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

              <p className="mt-2 text-[11px] text-muted">
                Tip: ask “What tech stack do you use?” or “How can I contact
                you?”
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
