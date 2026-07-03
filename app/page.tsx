import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Works } from "@/components/sections/works";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Journal } from "@/components/sections/journal";
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
        {/* Testimonials and Awards stay unmounted until real entries
            exist in lib/data.ts — re-add them here and renumber. */}
        <Journal />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
