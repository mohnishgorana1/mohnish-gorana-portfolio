"use client";
import React, { useState } from "react";
import { Send, Mail, MapPin, Check, Loader2 } from "lucide-react";
import { BsGithub, BsLinkedin, BsWhatsapp } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

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

const ACCESS_KEY = String(process.env.NEXT_PUBLIC_WEB3FORM_PORTFOLIO_CONTACT_ME_ACCESS_KEY);

const ContactMe = ({ isHomePage }: { isHomePage: boolean }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 🌟 TUMHARA GLASS THEME
  const glassClasses = `
    backdrop-blur-xl border 
    bg-white/40 border-black/10 shadow-lg shadow-black/5
    dark:bg-black/40 dark:border-white/10 dark:shadow-none
  `;

  const inputClasses = `
    w-full p-4 rounded-2xl bg-secondary/50 border border-border/50 
    focus:border-foreground/50 focus:bg-background outline-none transition-all
    text-foreground placeholder:text-muted-foreground/60
  `;

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

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
        setTimeout(() => setIsSuccess(false), 5000); // Reset success state after 5s
      } else {
        setStatus("Submission failed. Please try again.");
      }
    } catch (error) {
      setStatus("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className={`w-full bg-background overflow-hidden ${isHomePage ? "py-12" : "pt-20 pb-12"}`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto px-4 relative z-10"
      >
        
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-secondary/80 dark:bg-secondary/20 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className={`relative py-6 px-4 sm:p-10 md:p-14 rounded-[2.5rem] ${glassClasses}`}>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* =========================================
                LEFT PANEL: Info & Socials
            ========================================= */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
              
              <div className="space-y-6">
                <motion.div variants={itemVariants}>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-border bg-secondary/50 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                    Get in touch
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                    Let's Build <br/>
                    <span className="text-muted-foreground font-serif italic font-light">Something.</span>
                  </h2>
                  <p className="mt-6 text-muted-foreground text-lg leading-relaxed font-medium">
                    Ready to turn your vision into reality? Send me a message and let's start building!
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-4 pt-4">
                  <ContactDetail icon={Mail} title="Email" content="mohnishgorana1@gmail.com" link="mailto:mohnishgorana1@gmail.com" />
                  <ContactDetail icon={MapPin} title="Location" content="Neemuch, MP, India" />
                </motion.div>
              </div>

              {/* Socials */}
              <motion.div variants={itemVariants} className="pt-8 border-t border-border/50">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Connect with me</h3>
                <div className="flex flex-wrap gap-3">
                  {SOCIAL_LINKS.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial="collapsed"
                      whileHover="expanded"
                      className={`group flex items-center p-3 rounded-full bg-secondary/50 border border-border/50 text-muted-foreground transition-all duration-300 ${social.color}`}
                    >
                      <social.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                      <motion.span variants={socialTextVariants} className="whitespace-nowrap font-semibold text-sm">
                        {social.title}
                      </motion.span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

            </div>

            {/* =========================================
                RIGHT PANEL: The Form
            ========================================= */}
            <motion.div variants={itemVariants} className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-6 bg-background/50 backdrop-blur-md sm:p-8 rounded-4xl sm:border border-border/50">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground ml-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className={inputClasses}
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground ml-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className={inputClasses}
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground ml-1">Message</label>
                  <textarea
                    placeholder="Tell me about your project..."
                    rows={5}
                    className={`${inputClasses} resize-none`}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading || isSuccess}
                  className={`w-full h-14 rounded-full font-medium text-base transition-all duration-300 shadow-md
                    ${isSuccess 
                      ? "bg-emerald-500 text-white border border-emerald-400" 
                      : "bg-foreground text-background hover:scale-[1.02] active:scale-95"}
                  `}
                >
                  <AnimatePresence mode="wait">
                    {isSuccess ? (
                      <motion.div key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex items-center justify-center gap-2 cursor-pointer">
                        <Check size={18} /> Message Sent Successfully
                      </motion.div>
                    ) : (
                      <motion.div key="default" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex items-center justify-center gap-2 cursor-pointer">
                        {loading ? <Loader2 className="animate-spin" size={18} /> : <><Send size={16} /> Send Message</>}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
                
                {/* Error State */}
                <AnimatePresence>
                  {status && !isSuccess && (
                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-red-500 text-sm font-semibold text-center mt-2">
                      {status}
                    </motion.p>
                  )}
                </AnimatePresence>

              </form>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};

// 🌟 Reusable Contact Detail Component
const ContactDetail = ({ icon: Icon, title, content, link }: any) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/30 border border-border/50 group hover:bg-secondary/50 transition-colors">
    <div className="p-3 rounded-xl bg-background border border-border/50 text-foreground shadow-sm group-hover:scale-105 transition-transform">
      <Icon size={18} />
    </div>
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{title}</p>
      {link ? (
        <a href={link} className="font-semibold text-sm text-foreground hover:text-muted-foreground transition-colors line-clamp-1">
          {content}
        </a>
      ) : (
        <p className="font-semibold text-sm text-foreground line-clamp-1">{content}</p>
      )}
    </div>
  </div>
);

export default ContactMe;