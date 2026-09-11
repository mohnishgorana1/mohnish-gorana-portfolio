import GithubActivitySection from "@/components/GithubActivitySection";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto mt-4 md:mt-6 space-y-8 md:space-y-10">
      
      <section className="">
        <HeroSection />
      </section>

      <div className="w-full border border-border/60 dark:border-border/20"></div>

      <section id="projects" className="">
        <ProjectsSection isHome={true} />
      </section>

      <div className="w-full border border-border/60 dark:border-border/20"></div>

      <section id="github" className="">
        <GithubActivitySection />
      </section>


      {/* <section id="github" className="">
        <GithubActivitySection />
      </section>
      <section id="stats" className="">
        <BentoGridSection />
      </section>
     
      <section id="about" className="">
        <AboutSection />
      </section>
      <section id="contact" className="">
        <ContactMe isHomePage={true} />
      </section>
      <section className="">
        <WhatICanOffer />
      </section> */}
    </main>
  );
}
