"use client";
import ContactModal from "@/components/ContactModal";

export default function ContactUs() {
  return (
    <main className="pt-4 md:pt-16 w-full min-h-screen transition-colors duration-300">
        <ContactModal isContactPage={true}  />
    </main>
  );
}