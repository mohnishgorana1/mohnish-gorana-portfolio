'use client'
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Send, X, Mail, MapPin, Phone } from "lucide-react"; // 🌟 Added Phone icon
import { BsGithub, BsLinkedin, BsWhatsapp } from "react-icons/bs";
import { cn } from "@/lib/utils";

const ACCESS_KEY = String(process.env.NEXT_PUBLIC_WEB3FORM_PORTFOLIO_CONTACT_ME_ACCESS_KEY);

// 🌟 Social Buttons Expanding Animation
const socialTextVariants = {
  collapsed: { width: 0, opacity: 0, marginLeft: 0 },
  expanded: {
    width: "auto",
    opacity: 1,
    marginLeft: 12,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const SOCIAL_LINKS = [
  { icon: BsWhatsapp, href: "https://wa.me/+917999517181", title: "WhatsApp", color: "hover:text-green-500 hover:border-green-500/50" },
  { icon: BsLinkedin, href: "https://www.linkedin.com/in/mohnish-gorana-804374340/", title: "LinkedIn", color: "hover:text-blue-500 hover:border-blue-500/50" },
  { icon: BsGithub, href: "https://github.com/mohnishgorana1", title: "GitHub", color: "hover:text-foreground hover:border-border" },
];

interface ContactModalProps {
  isContactPage?: boolean;
  onClose?: () => void;
}

export default function ContactModal({ isContactPage = false, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    const data = new FormData();
    data.append("access_key", ACCESS_KEY!);
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await response.json();
      if (json.success) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setIsSuccess(false);
          // Sirf tabhi close karein jab ye Modal ki tarah open ho
          if (!isContactPage && onClose) onClose();
        }, 3000);
      } else {
        setStatus("Submission failed. Please try again.");
      }
    } catch (error) {
      setStatus("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = `
    w-full rounded-2xl bg-background border border-border/60 
    focus:border-foreground/50 focus:ring-1 focus:ring-foreground/50 outline-none transition-all
    text-foreground placeholder:text-muted-foreground/60 text-[13px] md:text-sm
  `;

  const contactCard = (
    <motion.div
      style={{ borderRadius: 28 }}
      initial={!isContactPage ? { opacity: 0, scale: 0.95, y: 15 } : { opacity: 0, y: 20 }}
      animate={!isContactPage ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1, y: 0 }}
      exit={!isContactPage ? { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.15 } } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "w-full max-w-4xl bg-surface border border-border relative",
        isContactPage
          ? "mx-auto shadow-lg"
          : "max-h-[95vh] overflow-y-auto overflow-x-hidden shadow-2xl pointer-events-auto no-scrollbar"
      )}
    >
      <motion.div
        initial={isContactPage ? { opacity: 0, y: 20 } : { opacity: 0 }}
        animate={isContactPage ? { opacity: 1, y: 0 } : { opacity: 1, transition: { delay: 0.1, duration: 0.2 } }}
        exit={!isContactPage ? { opacity: 0, transition: { duration: 0.1 } } : undefined}
        className="p-6 sm:p-8 lg:p-12 w-full flex flex-col md:flex-row gap-8 md:gap-16 relative"
      >
        {/* 🌟 Close Button - Sirf Modal mode me dikhega */}
        {!isContactPage && onClose && (
          <button
            onClick={onClose}
            className="cursor-pointer absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-secondary/80 backdrop-blur-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors z-20"
          >
            <X size={18} />
          </button>
        )}

        {/* =========================================
            LEFT PANEL: Info & Socials
        ========================================= */}
        <div className="w-full md:w-5/12 flex flex-col justify-between space-y-6 mt-2 md:mt-0">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6 md:mb-3 pr-8">Let&apos;s connect</h2>
            <p className="hidden md:flex text-sm text-muted-foreground font-medium mb-6 leading-relaxed">
              Ready to turn your vision into reality? Send me a message and let&apos;s start building!
            </p>

            {/* 🌟 Added Phone Details and changed to flex-col for better stacking */}
            <div className="flex flex-col gap-3">
              <ContactDetail icon={Mail} title="Email" content="mohnishgorana1@gmail.com" link="mailto:mohnishgorana1@gmail.com" />
              <ContactDetail icon={Phone} title="Phone" content="+91 7999517181" link="tel:+917999517181" />
              <ContactDetail icon={MapPin} title="Location" content="Neemuch, MP, India" />
            </div>
          </div>

          {/* Socials Block */}
          <div className="pt-2 md:pt-4 md:border-t md:border-border/50">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3 md:mb-4">Connect with me</h3>
            <div className="flex flex-wrap gap-2.5">
              {SOCIAL_LINKS.map((social, index) => (
                <div key={index} className="">
                  <motion.a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial="collapsed"
                    whileHover="expanded"
                    className={`hidden md:flex group items-center p-3 rounded-full bg-background border border-border/60 text-muted-foreground shadow-sm transition-all duration-300 ${social.color}`}
                  >
                    <social.icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <motion.span variants={socialTextVariants} className="whitespace-nowrap font-semibold text-xs overflow-hidden">
                      {social.title}
                    </motion.span>
                  </motion.a>

                  {/* small screen only */}
                  <motion.a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex md:hidden items-center gap-2 p-3 rounded-full bg-background border border-border/60 text-muted-foreground shadow-sm transition-all duration-300 active:scale-95 active:bg-secondary/40 ${social.color}`}
                  >
                    <social.icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <motion.span variants={socialTextVariants} className="whitespace-nowrap font-semibold text-xs overflow-hidden">
                      {social.title}
                    </motion.span>
                  </motion.a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================
            RIGHT PANEL: The Form
        ========================================= */}
        <div className="mt-auto w-full md:w-7/12">
          <p className="md:hidden text-md text-foreground font-medium mb-8 leading-relaxed">
            Ready to turn your vision into reality? Send me a message and let&apos;s start building!
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-y-1">
                <label className="text-xs font-semibold text-foreground/70 ml-1 uppercase tracking-wider">Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className={`${inputClasses} p-3.5 md:p-4`}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label className="text-xs font-semibold text-foreground/70 ml-1 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className={`${inputClasses} p-3.5 md:p-4`}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-y-1">
              <label className="text-xs font-semibold text-foreground/70 ml-1 uppercase tracking-wider">Message</label>
              <textarea
                placeholder="Tell me about your project..."
                rows={4}
                className={`${inputClasses} resize-none px-3.5 py-3.5 md:px-4 md:py-5 `}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || isSuccess}
              className={`cursor-pointer w-full mt-2 md:mt-8 h-12 md:h-14 rounded-xl font-semibold text-sm transition-all duration-300 shadow-sm
                ${isSuccess
                  ? "bg-success text-success-foreground border border-success/50"
                  : "bg-foreground text-background hover:scale-[1.01] active:scale-[0.98]"
                }
              `}
            >
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <Check size={16} /> Message Sent Successfully!
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin" size={16} /> : <><Send size={14} /> Send Message</>}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <AnimatePresence>
              {status && !isSuccess && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-error text-xs font-semibold text-center mt-2"
                >
                  {status}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>

      </motion.div>
    </motion.div>
  );

  if (isContactPage) {
    return (
      <div className="w-full px-4 sm:px-6">
        {contactCard}
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[90] bg-background/80 backdrop-blur-sm"
      />
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        {contactCard}
      </div>
    </>
  );
}

// 🌟 Reusable Contact Detail Component
const ContactDetail = ({ icon: Icon, title, content, link }: any) => (
  <div className="w-full flex items-center gap-2 md:gap-4 p-3.5 rounded-2xl bg-background/50 border border-border/40 group hover:bg-secondary/40 transition-colors shadow-sm">
    <div className="p-2 md:p-2.5 rounded-xl bg-background border border-border/60 text-foreground shadow-sm group-hover:scale-105 transition-transform">
      <span className="md:hidden">
        <Icon size={12} />
      </span>
      <span className="hidden md:flex">
        <Icon size={16} />
      </span>
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">{title}</span>
      {link ? (
        <a href={link} className="font-semibold text-[11px] md:text-xs text-foreground hover:text-accent transition-colors line-clamp-1">
          {content}
        </a>
      ) : (
        <span className="font-semibold text-[11px] md:text-xs text-foreground line-clamp-1">{content}</span>
      )}
    </div>
  </div>
);