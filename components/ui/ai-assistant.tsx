"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLocale } from "@/components/providers/locale-provider";
import { type ChatMessage, type ActionLink, getLocalAiResponse } from "@/lib/ai-knowledge";

const EASE = [0.16, 1, 0.3, 1] as const;

export function AiAssistant() {
  const locale = useLocale();
  const isTr = locale === "tr";
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const initialWelcomeText = isTr
    ? "Merhaba! Ben Mert Ceren'in yapay zekâ asistanıyım. 🤖\n\nMert'in 5Genç takımıyla geliştirdiği TEKNOFEST 2026 Akıllı Yol Güvenliği projesi, yetenekleri, 22 onaylı sertifikası veya üniversite eğitimi hakkında merak ettiğiniz her şeyi sorabilirsiniz."
    : "Hello! I am Mert Ceren's AI Assistant. 🤖\n\nAsk me anything about Mert's TEKNOFEST 2026 project with Team 5Genç, his skills, 22 certificates, or education!";

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "assistant",
      text: initialWelcomeText,
      actionLinks: [
        { label: isTr ? "Seçilmiş Projeler 🚀" : "Featured Projects 🚀", href: "#work", isAnchor: true },
        { label: isTr ? "Sertifikaları Gör 📜" : "View Certificates 📜", href: "#certificates", isAnchor: true },
        { label: isTr ? "İletişime Geç ✉️" : "Contact Mert ✉️", href: "#contact", isAnchor: true },
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history from sessionStorage on mount (keep drawer closed by default)
  useEffect(() => {
    try {
      const savedMessages = sessionStorage.getItem("mert_ai_chat_history");
      if (savedMessages) {
        const parsed = JSON.parse(savedMessages);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Save chat history to sessionStorage on update
  useEffect(() => {
    try {
      if (messages.length > 0) {
        sessionStorage.setItem("mert_ai_chat_history", JSON.stringify(messages));
      }
    } catch {
      // ignore
    }
  }, [messages]);

  const updateIsOpen = (val: boolean) => {
    setIsOpen(val);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Handle ESC key close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        updateIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query || loading) return;

    setInput("");
    setHasUnread(false);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query, locale }),
      });

      if (res.ok) {
        const data = await res.json();
        const botMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          sender: "assistant",
          text: data.text || "Yanıt oluşturulamadı.",
          actionLinks: data.actionLinks,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error("API error");
      }
    } catch {
      // Local Fallback if API fails
      const fallback = getLocalAiResponse(query, isTr ? "tr" : "en");
      const botMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: "assistant",
        text: fallback.text,
        actionLinks: fallback.actionLinks,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (link: ActionLink) => {
    // 1. Immediately close the chatbot drawer
    setIsOpen(false);

    // 2. Handle scroll or navigation
    if (link.isAnchor || link.href.startsWith("#")) {
      const targetId = link.href.startsWith("#") ? link.href : `#${link.href}`;
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = `/${locale}${targetId}`;
      }
    } else if (link.href.startsWith("http")) {
      window.open(link.href, "_blank", "noopener,noreferrer");
    } else {
      const targetId = "#work";
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = `/${locale}${targetId}`;
      }
    }
  };

  const quickPrompts = isTr
    ? [
        { emoji: "🚀", text: "TEKNOFEST Projesi" },
        { emoji: "💻", text: "Teknolojiler & Stack" },
        { emoji: "📜", text: "22 Sertifikası" },
        { emoji: "✉️", text: "Staj / İletişim" },
      ]
    : [
        { emoji: "🚀", text: "TEKNOFEST Project" },
        { emoji: "💻", text: "Tech Stack & Skills" },
        { emoji: "📜", text: "Certifications" },
        { emoji: "✉️", text: "Contact Details" },
      ];

  return (
    <>
      {/* FLOATING CHATBOT BUTTON */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          type="button"
          onClick={() => {
            updateIsOpen(!isOpen);
            setHasUnread(false);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full border border-accent/60 bg-surface/90 text-accent shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-ink cursor-pointer"
          aria-label="AI Asistan ile Konuş"
        >
          {/* Glowing Aura Effect */}
          <span className="absolute -inset-1 rounded-full bg-accent/20 blur-md transition-opacity duration-300 group-hover:opacity-100" />
          
          {isOpen ? (
            <svg className="h-6 w-6 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <div className="relative z-10 flex items-center justify-center">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              {hasUnread && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-accent"></span>
                </span>
              )}
            </div>
          )}
        </motion.button>
      </div>

      {/* CHAT DRAWER PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: EASE }}
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="fixed bottom-24 right-4 sm:right-6 z-40 flex h-[540px] max-h-[80vh] w-[calc(100vw-2rem)] sm:w-[420px] flex-col overflow-hidden rounded-3xl border hairline bg-surface/95 shadow-2xl backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b hairline px-5 py-4 bg-surface/90">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent font-bold font-mono text-sm border border-accent/40">
                  MC
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-surface" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-foreground leading-snug">
                    Mert Ceren AI Asistan
                  </h4>
                  <p className="text-[0.6875rem] font-mono text-muted flex items-center gap-1.5">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {isTr ? "Sorularınız için hazır" : "Ready to answer"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    try {
                      sessionStorage.removeItem("mert_ai_chat_history");
                    } catch {
                      // ignore
                    }
                    setMessages([
                      {
                        id: "welcome-1",
                        sender: "assistant",
                        text: initialWelcomeText,
                        actionLinks: [
                          { label: isTr ? "TEKNOFEST Projesi 🚀" : "TEKNOFEST Project 🚀", href: "/work/smart-road-safety" },
                          { label: isTr ? "Sertifikaları Gör 📜" : "View Certificates 📜", href: "#certificates", isAnchor: true },
                          { label: isTr ? "İletişime Geç ✉️" : "Contact Mert ✉️", href: "#contact", isAnchor: true },
                        ],
                        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                      },
                    ]);
                  }}
                  className="rounded-full p-1.5 text-muted hover:text-foreground transition-colors"
                  title={isTr ? "Sohbeti Temizle" : "Clear Chat"}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => updateIsOpen(false)}
                  className="rounded-full p-1.5 text-muted hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4 font-sans text-sm"
            >
              {messages.map((msg) => {
                const isUser = msg.sender === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        isUser
                          ? "bg-accent text-accent-ink font-medium rounded-br-none"
                          : "bg-surface-elevated/80 border hairline text-foreground rounded-bl-none shadow-sm"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>

                      {/* Action Links */}
                      {msg.actionLinks && msg.actionLinks.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2 pt-2 border-t border-foreground/10">
                          {msg.actionLinks.map((link, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleActionClick(link);
                              }}
                              className="rounded-full bg-accent/15 px-3 py-1.5 font-mono text-[0.6875rem] font-semibold text-accent border border-accent/30 transition-all hover:bg-accent hover:text-accent-ink hover:border-accent cursor-pointer"
                            >
                              {link.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="mt-1 px-1 text-[0.625rem] font-mono text-muted">
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}

              {/* Loading Dots Indicator */}
              {loading && (
                <div className="flex items-center gap-1.5 text-muted bg-surface-elevated/60 border hairline rounded-2xl px-4 py-3 w-max rounded-bl-none">
                  <span className="h-2 w-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Bar */}
            <div className="border-t hairline p-3 bg-surface/50 flex flex-wrap gap-2">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(prompt.text)}
                  className="rounded-full border hairline bg-surface/90 px-3 py-1.5 font-mono text-[0.6875rem] text-muted hover:border-accent/60 hover:text-foreground transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>{prompt.emoji}</span>
                  <span>{prompt.text}</span>
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="border-t hairline p-3 bg-surface/90 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isTr ? "Bir şey sorun..." : "Ask a question..."}
                className="flex-1 rounded-full border hairline bg-surface-elevated px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink disabled:opacity-40 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Gönder"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
