import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  accent,
  body,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  body?: string;
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-text">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
        {title}{" "}
        <span className="font-serif font-normal italic text-primary-text">{accent}</span>
      </h2>
      {body && <p className="mt-4 text-muted-foreground">{body}</p>}
    </Reveal>
  );
}
