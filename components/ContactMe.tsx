"use client";
import React, { useState } from "react";
import { Send, Mail, MapPin, Check, Loader2 } from "lucide-react";
import { BsGithub, BsLinkedin, BsWhatsapp } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { scale } from "motion/react";

const socialTextVariants = {
  collapsed: { width: 0, opacity: 0, marginLeft: 0 },
  expanded: {
    width: "auto",
    opacity: 1,
    marginLeft: 12,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const SOCIAL_LINKS = [
  { icon: BsWhatsapp, href: "https://wa.me/+917999517181", title: "WhatsApp", color: "text-green-500" },
  { icon: BsLinkedin, href: "https://www.linkedin.com/in/mohnish-gorana-804374340/", title: "LinkedIn", color: "text-blue-600" },
  { icon: BsGithub, href: "https://github.com/mohnishgorana1", title: "GitHub", color: "text-zinc-900 dark:text-zinc-50" },
];

const ACCESS_KEY = String(process.env.NEXT_PUBLIC_WEB3FORM_PORTFOLIO_CONTACT_ME_ACCESS_KEY);

const ContactMe = ({ isHomePage }: { isHomePage: boolean }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9},
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeInOut",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSubmit = async (e: any) => {
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
    <section id="contact" className="py-20 px-1 sm:px-2 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        // viewport={{ once: true, amount: 0.2 }}
        className="relative mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 shadow-2xl transition-colors duration-500"
      >
        {/* --- Sharp Blue Corners --- */}
        <div className="absolute -top-[5px] -left-[5px] w-12 h-12 border-t-4 border-l-4 border-blue-600 dark:border-blue-500" />
        <div className="absolute -top-[5px] -right-[5px] w-12 h-12 border-t-4 border-r-4 border-blue-600 dark:border-blue-500" />
        <div className="absolute -bottom-[5px] -left-[5px] w-12 h-12 border-b-4 border-l-4 border-blue-600 dark:border-blue-500" />
        <div className="absolute -bottom-[5px] -right-[5px] w-12 h-12 border-b-4 border-r-4 border-blue-600 dark:border-blue-500" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Panel: Info */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase">
                Let&apos;s Build <span className="text-blue-600 italic">Something</span>
              </h2>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Ready to turn your vision into reality? Send me a message and let&apos;s start building!
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <ContactDetail icon={Mail} title="Email" content="mohnishgorana1@gmail.com" link="mailto:mohnishgorana1@gmail.com" />
              <ContactDetail icon={MapPin} title="Location" content="Neemuch, MP, India" />
            </motion.div>

            <motion.div variants={itemVariants} className="pt-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Socials</h3>
              <div className="flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    whileHover="expanded"
                    initial="collapsed"
                    className={`${social.color} flex items-center p-3 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full`}
                  >
                    <social.icon className="w-5 h-5" />
                    <motion.span variants={socialTextVariants} className="whitespace-nowrap font-bold text-sm">
                      {social.title}
                    </motion.span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Panel: Form */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:border-blue-500 outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:border-blue-500 outline-none transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <textarea
                placeholder="How can I help you?"
                rows={6}
                className="w-full p-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:border-blue-500 outline-none transition-all resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              />
              
              <button
                type="submit"
                disabled={loading || isSuccess}
                className={`w-full py-4 font-bold uppercase tracking-widest transition-all shadow-lg
                  ${isSuccess ? "bg-green-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}
                `}
              >
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div key="s" initial={{ opacity:0 }} animate={{ opacity:1 }} className="flex items-center justify-center gap-2">
                      <Check /> Message Sent
                    </motion.div>
                  ) : (
                    <motion.div key="i" initial={{ opacity:0 }} animate={{ opacity:1 }} className="flex items-center justify-center gap-2">
                      {loading ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Send Message</>}
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
              {status && <p className="text-red-500 text-sm font-bold">{status}</p>}
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const ContactDetail = ({ icon: Icon, title, content, link }: any) => (
  <div className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
    <div className="p-3 bg-blue-600/10 text-blue-600"><Icon size={20} /></div>
    <div>
      <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">{title}</p>
      {link ? <a href={link} className="font-bold text-zinc-900 dark:text-zinc-50 hover:text-blue-500 transition-colors">{content}</a> : <p className="font-bold text-zinc-900 dark:text-zinc-50">{content}</p>}
    </div>
  </div>
);

export default ContactMe;