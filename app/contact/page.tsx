"use client";
import ContactMe from "@/components/ContactMe";

function ContactUs() {
  return (
    <main className="pt-4 sm:pt-8 md:pt-12 w-full rounded-2xl transition-colors duration-300">
        <ContactMe isHomePage={false}/>
    </main>
  );
}

export default ContactUs;
