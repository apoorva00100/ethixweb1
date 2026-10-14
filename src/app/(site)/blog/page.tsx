import type { Metadata } from "next";
import { posts, postTicker } from "@/lib/posts";
import { Reveal } from "@/components/site/reveal";
import { Marquee } from "@/components/site/marquee";
import { PostGrid } from "@/components/site/post-grid";
import { Cta } from "@/components/site/cta";

export const metadata: Metadata = {
  title: "Blog | Ethixweb India",
  description: "Field notes on growth: tactics, essays and case studies from the team doing the work.",
};

export default function BlogPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-16 sm:pt-24 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-text">
            Journal · {posts.length} essays in the queue
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.4rem,5.6vw,5rem)] font-extrabold leading-[0.98] tracking-tight">
            Field notes on{" "}
            <span className="font-serif font-normal italic text-primary-text">growth.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/75">
            Tactics, essays and case studies on delivering digital work for Indian businesses, written by the people doing the work, not a content team.
          </p>
        </Reveal>
      </section>

      <Marquee items={postTicker} />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <PostGrid />
      </section>

      <Cta
        title="Don't wait for the"
        accent="essay."
        body="We already apply these ideas for clients every week. Let's apply them to your business."
        primary="Talk to the team"
        secondary={{ label: "See the case studies", href: "/our-work" }}
      />
    </>
  );
}
