import BlogsSection from "@/components/BlogsSection";
import FinalCTA from "@/components/FinalCTA";
import GithubActivitySection from "@/components/GithubActivitySection";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import { fetchGithubActivityData } from "@/lib/github";

export default async function Home() {
  const githubData = await fetchGithubActivityData();

  return (
    <main className="max-w-4xl mx-auto mt-4 md:mt-6 space-y-8 md:space-y-10">

      <section className="">
        <HeroSection />
      </section>

      <Divider />

      <section id="projects" className="">
        <ProjectsSection isHome={true} />
      </section>

      <Divider />


      <section id="github" className="">
        <GithubActivitySection data={githubData} />
      </section>

      <Divider />


      <section id="blogs" className="">
        <BlogsSection />
      </section>


      <section id="contact" className="mt-4 md:mt-8">
        <FinalCTA />
      </section>

      <Divider />

    </main>
  );


}


const Divider = () => {
  return (
    <div className="w-full border border-border/60 dark:border-border/50"></div>
  )
}


{/* <section id="github" className="">
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
      </section> */}