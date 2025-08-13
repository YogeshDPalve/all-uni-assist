"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import axios from "axios";
import Markdown from "react-markdown";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import {
  Image,
  School,
  Bookmark,
  DollarSign,
  Paperclip,
  Send,
  Loader2,
  Command,
  Copy,
  Bot,
  BotIcon,
  ThumbsUp,
  ThumbsDown,
  Volume2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";

/* ------------------------------
      Auto-resizing textarea hook
      ------------------------------ */
function useAutoResizeTextarea({
  minHeight = 60,
  maxHeight = 200,
}: {
  minHeight?: number;
  maxHeight?: number;
}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      textarea.style.height = `${minHeight}px`;
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY)
      );

      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) textarea.style.height = `${minHeight}px`;
  }, [minHeight]);

  useEffect(() => {
    const handler = () => adjustHeight();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [adjustHeight]);

  return { textareaRef, adjustHeight };
}

/* ------------------------------
      Simple Textarea component (forwardRef)
      ------------------------------ */
const Textarea = React.forwardRef<HTMLTextAreaElement, any>(
  ({ className, containerClassName, showRing = true, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
      <div className={cn("relative", containerClassName)}>
        <textarea
          className={cn(
            "border-input bg-background flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm",
            "transition-all duration-200 ease-in-out",
            "placeholder:text-muted-foreground",
            "disabled:cursor-not-allowed disabled:opacity-50",
            showRing
              ? "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
              : "",
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {showRing && isFocused && (
          <motion.span
            className="ring-primary/30 pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {props.onChange && (
          <div
            className="bg-primary absolute right-2 bottom-2 h-2 w-2 rounded-full opacity-0"
            style={{
              animation: "none",
            }}
            id="textarea-ripple"
          />
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

/* ------------------------------
      Component: ChatbotUi
      ------------------------------ */
type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function ChatbotUi() {
  // messages and UI state
  const [messages, setMessages] = useState<Message[]>([]);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseTimes, setResponseTimes] = useState<Record<string, number>>(
    {}
  );
  const startTimeRef = useRef<number>(0);
  const {
    name,
    college,
    degree,
    branch,
    passoutYear,
    currentYear,
    cgpa,
    ielts,
    employed,
  } = useSelector((store: any) => store.auth.user);

  // typing / transition
  const [isTyping, setIsTyping] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [streamingMessage, setStreamingMessage] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<
    Record<string, { like: boolean; dislike: boolean; speaking: boolean }>
  >({});

  // command palette state
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [recentCommand, setRecentCommand] = useState<string | null>(null);
  const commandPaletteRef = useRef<HTMLDivElement | null>(null);

  // textarea resize
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
    maxHeight: 200,
  });

  // command suggestions
  const commandSuggestions = [
    {
      icon: <Image className="h-4 w-4" />,
      label: "Study Abroad",
      prefix: "/study-abroad",
    },
    {
      icon: <School className="h-4 w-4" />,
      label: "Top Universities",
      prefix: "/top-universities",
    },
    {
      icon: <Bookmark className="h-4 w-4" />,
      label: "Master's Degree",
      prefix: "/masters",
    },
    {
      icon: <DollarSign className="h-4 w-4" />,
      label: "Scholarships",
      prefix: "/scholarships",
    },
  ];

  // ripple keyframes injection (only once)
  useEffect(() => {
    if (
      typeof document !== "undefined" &&
      !document.getElementById("ripple-style")
    ) {
      const rippleKeyframes = `
    @keyframes ripple {
      0% { transform: scale(0.5); opacity: 0.6; }
      100% { transform: scale(2); opacity: 0; }
    }
    `;
      const style = document.createElement("style");
      style.id = "ripple-style";
      style.innerHTML = rippleKeyframes;
      document.head.appendChild(style);
    }
  }, []);

  /* ------------------------------
        Fetch AI / backend response
        ------------------------------ */
  const fetchAIResponse = useCallback(async (userInput: string) => {
    try {
      setIsLoading(true);
      setError(null);
      startTimeRef.current = Date.now();

      const userMessage: Message = {
        id: `${Date.now()}-user`,
        role: "user",
        content: userInput,
      };
      setMessages((prev) => [...prev, userMessage]);

      const res = await axios.post("/api/ask", {
        question: `my name :${name},
              my college :${college},
              my degree: ${degree},
              my branch: ${branch},
              my passoutYear :${passoutYear},
              my currentYear :${currentYear},
              my cgpa :${cgpa},
              my ielts score:${ielts},
              im i employed :${employed},
              and my question is : ${userInput}`,
      });
      const data = res?.data?.result ?? res?.data ?? "No response";
      const fullText = typeof data === "string" ? data : JSON.stringify(data);

      const aiMessageId = `${Date.now()}-ai`;

      // Add placeholder for AI response
      setMessages((prev) => [
        ...prev,
        { id: aiMessageId, role: "assistant", content: "" },
      ]);
      setStreamingMessage(""); // start typing

      let index = 0;
      const typingInterval = setInterval(() => {
        index++;
        setStreamingMessage(fullText.slice(0, index));
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId
              ? { ...msg, content: fullText.slice(0, index) }
              : msg
          )
        );

        if (index >= fullText.length) {
          clearInterval(typingInterval);

          const endTime = Date.now();
          const duration = (endTime - startTimeRef.current) / 1000;
          setResponseTimes((prev) => ({ ...prev, [aiMessageId]: duration }));

          setStreamingMessage(null); // done typing
        }
      }, 0.5); // speed in ms per character
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Something went wrong");
      toast.error(err?.message ?? "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, []);

  /* ------------------------------
        Send handler (button / Enter)
        ------------------------------ */
  const handleSend = useCallback(() => {
    const text = value.trim();
    if (!text) return;

    // set UI states
    startTransition(() => {
      setIsTyping(true);
    });

    // call backend
    fetchAIResponse(text);

    // clear input & reset height
    setValue("");
    adjustHeight(true);

    // finish typing animation after short delay
    setTimeout(() => {
      setIsTyping(false);
    }, 600);
  }, [value, adjustHeight, fetchAIResponse]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Enter => send (unless shift+enter)
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }

      // navigation in suggestions when command palette open
      if (showCommandPalette) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setActiveSuggestion((s) =>
            Math.min(s + 1, commandSuggestions.length - 1)
          );
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setActiveSuggestion((s) => Math.max(s - 1, 0));
        } else if (e.key === "Enter") {
          if (activeSuggestion >= 0) {
            e.preventDefault();
            selectCommandSuggestion(activeSuggestion);
          }
        } else if (e.key === "Escape") {
          setShowCommandPalette(false);
        }
      }
    },
    [handleSend, showCommandPalette, activeSuggestion]
  );

  /* ------------------------------
        Command palette & suggestions
        ------------------------------ */
  useEffect(() => {
    if (value.startsWith("/")) {
      setShowCommandPalette(true);
      const matchIndex = commandSuggestions.findIndex((cmd) =>
        cmd.prefix.startsWith(value)
      );
      setActiveSuggestion(matchIndex >= 0 ? matchIndex : -1);
    } else {
      setShowCommandPalette(false);
      setActiveSuggestion(-1);
    }
  }, [value]);

  const selectCommandSuggestion = (index: number) => {
    const s = commandSuggestions[index];
    if (!s) return;
    setValue(s.prefix + " ");
    setShowCommandPalette(false);
    setRecentCommand(s.label);
    setTimeout(() => setRecentCommand(null), 2000);
    adjustHeight(true);
  };

  /* click outside to close palette */
  useEffect(() => {
    function handleClickOutside(ev: MouseEvent) {
      const target = ev.target as Node | null;
      if (
        commandPaletteRef.current &&
        !commandPaletteRef.current.contains(target) &&
        !(ev.target as HTMLElement)?.closest("[data-command-button]")
      ) {
        setShowCommandPalette(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ------------------------------
        UI Render
        ------------------------------ */
  return (
    <div className="flex w-full overflow-x-hidden">
      <div className="text-foreground relative flex w-full flex-col items-center justify-center overflow-hidden bg-transparent">
        {/* Background glows */}
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <div className="bg-indigo-400/20 absolute top-0 left-1/4 h-96 w-96 animate-pulse rounded-full mix-blend-normal blur-[128px]" />
          <div className="bg-amber-500/20 absolute right-1/4 bottom-0 h-96 w-96 animate-pulse rounded-full mix-blend-normal blur-[128px]" />
        </div>

        <div className="relative mx-auto h-[90vh] w-full max-w-2xl p-4">
          <motion.div
            className="relative z-10 flex h-full flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Messages area (fixed height, scrollable) */}
            <div
              className="flex-1 scrollbar-hide overflow-y-auto rounded-xl p-4 text-sm leading-6 sm:text-base sm:leading-7 bg-transparent"
              style={{ maxHeight: "70vh" }}
            >
              {messages.length ? (
                messages.map((m) => (
                  <div key={m.id} className="mb-4 whitespace-pre-wrap">
                    {m.role === "user" ? (
                      <div className="flex flex-row px-2 py-4 sm:px-4">
                        <img
                          alt="user"
                          className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
                          src="/logo.webp"
                          width={32}
                          height={32}
                        />
                        <div className="flex max-w-3xl items-center">
                          <p>{m.content}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="relative mb-4 flex rounded-xl bg-transparent px-2 py-6 sm:px-4 ">
                        <Bot className="bg-secondary text-primary mr-2 flex h-8 w-8 rounded-full p-1 sm:mr-4" />
                        <div className="markdown-body w-full max-w-3xl overflow-x-auto rounded-xl">
                          <Markdown>{m.content}</Markdown>

                          {/* Footer Row: Response time + Actions */}
                          <div className="mt-2 flex items-center gap-3 text-xs text-neutral-500">
                            {responseTimes[m.id] && (
                              <span>
                                Response time: {responseTimes[m.id].toFixed(3)}s
                              </span>
                            )}

                            {/* Action Icons */}
                            <div className="flex items-center gap-2 ml-auto">
                              {/* Like */}
                              <button
                                className={`p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 ${
                                  feedback[m.id]?.like
                                    ? "bg-green-800 text-primary"
                                    : ""
                                }`}
                                title="Like"
                                onClick={() => {
                                  setFeedback((prev) => ({
                                    ...prev,
                                    [m.id]: {
                                      like: !prev[m.id]?.like,
                                      dislike: false,
                                      speaking: prev[m.id]?.speaking || false,
                                    },
                                  }));
                                  toast.success("You liked this response");
                                }}
                              >
                                <ThumbsUp
                                  size={18}
                                  fill={feedback[m.id]?.like ? "white" : "none"}
                                />
                              </button>

                              {/* Dislike */}
                              <button
                                className={`p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 ${
                                  feedback[m.id]?.dislike
                                    ? "bg-red-800 text-white"
                                    : ""
                                }`}
                                title="Dislike"
                                onClick={() => {
                                  setFeedback((prev) => ({
                                    ...prev,
                                    [m.id]: {
                                      dislike: !prev[m.id]?.dislike,
                                      like: false,
                                      speaking: prev[m.id]?.speaking || false,
                                    },
                                  }));
                                  toast.error("You disliked this response");
                                }}
                              >
                                <ThumbsDown
                                  size={18}
                                  fill={
                                    feedback[m.id]?.dislike ? "white" : "none"
                                  }
                                />
                              </button>

                              {/* Speaker */}
                              <button
                                className={`p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 ${
                                  feedback[m.id]?.speaking
                                    ? "bg-blue-700 text-white"
                                    : ""
                                }`}
                                title="Read aloud"
                                onClick={() => {
                                  const utterance =
                                    new SpeechSynthesisUtterance(m.content);
                                  utterance.lang = "en-US";
                                  speechSynthesis.cancel(); // stop any ongoing speech
                                  if (feedback[m.id]?.speaking) {
                                    // Stop speaking
                                    setFeedback((prev) => ({
                                      ...prev,
                                      [m.id]: {
                                        ...prev[m.id],
                                        speaking: false,
                                      },
                                    }));
                                  } else {
                                    // Start speaking
                                    speechSynthesis.speak(utterance);
                                    setFeedback((prev) => ({
                                      ...prev,
                                      [m.id]: { ...prev[m.id], speaking: true },
                                    }));
                                    utterance.onend = () => {
                                      setFeedback((prev) => ({
                                        ...prev,
                                        [m.id]: {
                                          ...prev[m.id],
                                          speaking: false,
                                        },
                                      }));
                                    };
                                  }
                                }}
                              >
                                <Volume2
                                  size={18}
                                  fill={
                                    feedback[m.id]?.speaking ? "white" : "none"
                                  }
                                />
                              </button>

                              {/* Copy */}
                              <button
                                className="p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700"
                                title="Copy"
                                onClick={() => {
                                  navigator.clipboard.writeText(m.content);
                                  toast.success("Copied to clipboard");
                                }}
                              >
                                <Copy size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="space-y-3 flex h-full items-center justify-center ">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="inline-block"
                  >
                    <h1 className="pb-1 text-3xl font-medium tracking-tight">
                      How can I help today?
                    </h1>
                    <motion.div
                      className="via-primary/50 h-px bg-gradient-to-r from-transparent to-transparent"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "100%", opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                  </motion.div>
                </div>
              )}

              {isLoading && (
                <div className="bg-primary/5 mx-auto flex w-fit items-center gap-2 rounded-full px-4 py-2">
                  <Loader2 className="text-primary h-4 w-4 animate-spin" />
                  <span className="animate-pulse bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-sm font-medium text-transparent">
                    Generating response...
                  </span>
                </div>
              )}

              {error && (
                <div className="border-destructive/20 bg-destructive/10 text-destructive mx-auto w-fit rounded-lg border p-3">
                  {error}
                </div>
              )}
            </div>

            {/* Input area (fixed height, textarea scrollable) */}
            <motion.div
              className="border-border bg-transparent backdrop:blur-sm mt-4 w-full rounded-2xl border scrollbar-hide shadow-2xl backdrop-blur-2xl p-3"
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              style={{ flexShrink: 0 }}
            >
              <div className="flex items-center gap-3">
                <Textarea
                  ref={textareaRef}
                  value={value}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setValue(e.target.value);
                    adjustHeight();
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me a question..."
                  containerClassName="w-full"
                  className=" scrollbar-hide w-full px-4 py-3 resize-none bg-transparent border-none text-foreground text-sm focus:outline-none placeholder:text-muted-foreground min-h-[60px] max-h-[120px] overflow-y-auto"
                  showRing={false}
                />

                <motion.button
                  type="button"
                  onClick={handleSend}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isTyping || !value.trim()}
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm font-medium transition-all flex items-center gap-2 h-10",
                    value.trim()
                      ? "bg-primary text-primary-foreground shadow-primary/10 shadow-lg"
                      : "bg-muted/50 text-muted-foreground"
                  )}
                >
                  {isTyping ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  <span>Send</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
