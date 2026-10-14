import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { Services } from "@/components/site/services";
import { Catalog } from "@/components/site/catalog";
import { Process } from "@/components/site/process";
import { India } from "@/components/site/india";
import { Work } from "@/components/site/work";
import { Faq } from "@/components/site/faq";
import { Cta } from "@/components/site/cta";

export default function Home() {
  return (
    <>
        <Hero />
        <Marquee />
        <Services />
        <Catalog />
        <Process />
        <India />
        <Work />
        <Faq />
        <Cta />
    </>
  );
}
