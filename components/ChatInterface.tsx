'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Message = {
    id: string;
    role: 'ai' | 'user';
    text: string;
};

const INITIAL_MESSAGES: Message[] = [
    {
        id: '1',
        role: 'ai',
        text: "Hi there! 👋 I'm Mohnish's AI assistant. You can ask me about his tech stack, projects, or experience. How can I help you today?",
    }
];

// 🌟 Explicitly typed component overrides — fixes "Type 'Element' has no call signatures"
const markdownComponents: Components = {
    p: ({ children }) => (
        <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
    ),
    strong: ({ children }) => (
        <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    ul: ({ children }) => (
        <ul className="mb-2 last:mb-0 pl-4 space-y-1 list-disc marker:text-muted-foreground">
            {children}
        </ul>
    ),
    ol: ({ children }) => (
        <ol className="mb-2 last:mb-0 pl-4 space-y-1 list-decimal marker:text-muted-foreground">
            {children}
        </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    a: ({ href, children }) => (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 font-medium hover:opacity-80 transition-opacity"
        >
            {children}
        </a>
    ),
    code: ({ children }) => (
        <code className="px-1 py-0.5 rounded bg-secondary/60 text-[12.5px] font-mono">
            {children}
        </code>
    ),
    h1: ({ children }) => <p className="font-semibold mb-1">{children}</p>,
    h2: ({ children }) => <p className="font-semibold mb-1">{children}</p>,
    h3: ({ children }) => <p className="font-semibold mb-1">{children}</p>,
};

function MarkdownContent({ text }: { text: string }) {
    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {text}
        </ReactMarkdown>
    );
}

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = inputValue.trim();
        if (!trimmed || isTyping) return;

        setError(null);

        const newUserMsg: Message = { id: Date.now().toString(), role: 'user', text: trimmed };
        const updatedMessages = [...messages, newUserMsg];

        setMessages(updatedMessages);
        setInputValue('');
        setIsTyping(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: updatedMessages }),
            });

            if (!res.ok) {
                throw new Error('Failed to fetch response');
            }

            const data = await res.json();

            const newAiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                text: data.reply ?? "Sorry, I couldn't process that. Please try again.",
            };

            setMessages(prev => [...prev, newAiMsg]);
        } catch (err) {
            console.error(err);
            setError("Couldn't reach the AI right now. Please try again in a moment.");
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 minimal-scrollbar">
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                                "flex gap-3 w-full",
                                msg.role === 'user' ? "justify-end" : "justify-start"
                            )}
                        >
                            {msg.role === 'ai' && (
                                <div className="shrink-0 size-8 mt-1 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground">
                                    <Bot size={14} />
                                </div>
                            )}

                            <div className={cn(
                                "max-w-[80%] sm:max-w-[75%] px-4 py-3 text-[14px] leading-relaxed shadow-sm",
                                msg.role === 'user'
                                    ? "bg-foreground text-background rounded-2xl rounded-tr-sm whitespace-pre-wrap"
                                    : "bg-background border border-border/60 text-foreground rounded-2xl rounded-tl-sm"
                            )}>
                                {msg.role === 'ai' ? (
                                    <MarkdownContent text={msg.text} />
                                ) : (
                                    msg.text
                                )}
                            </div>

                            {msg.role === 'user' && (
                                <div className="shrink-0 size-8 mt-1 rounded-full bg-secondary/50 border border-border/50 flex items-center justify-center text-muted-foreground">
                                    <User size={14} />
                                </div>
                            )}
                        </motion.div>
                    ))}

                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex gap-3 w-full justify-start"
                        >
                            <div className="shrink-0 size-8 mt-1 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground">
                                <Bot size={14} />
                            </div>
                            <div className="bg-background border border-border/60 text-muted-foreground rounded-2xl rounded-tl-sm px-4 py-3.5 shadow-sm flex items-center gap-1.5">
                                <motion.div
                                    animate={{ y: [0, -3, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                                    className="size-1.5 rounded-full bg-muted-foreground"
                                />
                                <motion.div
                                    animate={{ y: [0, -3, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                                    className="size-1.5 rounded-full bg-muted-foreground"
                                />
                                <motion.div
                                    animate={{ y: [0, -3, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                                    className="size-1.5 rounded-full bg-muted-foreground"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-[12px] text-red-500 justify-center"
                    >
                        <AlertCircle size={14} />
                        {error}
                    </motion.div>
                )}

                <div ref={messagesEndRef} className="h-1" />
            </div>

            <div className="p-4 border-t border-border/50 shrink-0">
                <form onSubmit={handleSendMessage} className="relative flex items-center">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your message..."
                        disabled={isTyping}
                        className={cn(
                            "w-full h-12 pl-4 pr-12 rounded-xl bg-background border border-border/60",
                            "focus:border-foreground/50 focus:ring-1 focus:ring-foreground/50 outline-none transition-all",
                            "text-foreground placeholder:text-muted-foreground/60 text-[13px] sm:text-sm shadow-sm disabled:opacity-50"
                        )}
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim() || isTyping}
                        className="cursor-pointer absolute right-2 p-2 rounded-lg bg-foreground text-background disabled:opacity-50 disabled:bg-secondary disabled:text-muted-foreground transition-all"
                    >
                        {isTyping ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    </button>
                </form>
            </div>
        </div>
    );
}