import Link from "next/link";

// Placeholder wordmark until the official Ethixweb logo asset is added.
export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span aria-hidden className="grid size-8 place-items-center rounded-lg bg-primary font-mono text-sm font-bold text-primary-foreground">
        E
      </span>
      <span className="text-[15px] font-semibold tracking-[0.18em]">
        ETHIX<span className="text-primary-text">WEB</span>
      </span>
    </Link>
  );
}
