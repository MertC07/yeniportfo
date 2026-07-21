import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Works } from "@/components/sections/works";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Awards } from "@/components/sections/awards";
import { GithubStats } from "@/components/sections/github";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Works />
        <About />
        <Skills />
        <Awards />
        <GithubStats />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
