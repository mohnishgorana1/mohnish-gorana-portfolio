import AboutSection from "@/components/AboutSection";
import BentoGridSection from "@/components/BentoGrid";
import ContactMe from "@/components/ContactMe";
import GithubActivitySection from "@/components/GithubActivitySection";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import WhatICanOffer from "@/components/WhatICanOffer";

export default function Home() {
  return (
    <main className="">
      <section className="">
        <HeroSection />
      </section>
      <section className="flex flex-col my-auto mx-auto h-auto border-b border-zinc-200 dark:border-zinc-800/50">
        <ProjectsSection isHome={true} />
      </section>
      <section id="github" className="py-8">
        <GithubActivitySection />
      </section>
      <section id="about" className="">
        <AboutSection />
      </section>
      <section id="contact" className="py-16">
        <ContactMe isHomePage={true}/>
      </section>
      <section id="stats" className="py-16">
        <BentoGridSection />
      </section>
      <section className="">
        <WhatICanOffer />
      </section>
    </main>
  );
}
