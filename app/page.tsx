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
      <section id="stats" className="">
        <BentoGridSection />
      </section>
      <section className="flex flex-col my-auto mx-auto h-auto ">
        <ProjectsSection isHome={true} />
      </section>
      <section id="github" className="">
        <GithubActivitySection />
      </section>
      <section id="about" className="">
        <AboutSection />
      </section>
      <section id="contact" className="">
        <ContactMe isHomePage={true} />
      </section>
      <section className="">
        <WhatICanOffer />
      </section>
    </main>
  );
}
