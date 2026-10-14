import Link from "next/link";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:justify-between">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground">
            Websites, AI and growth systems for Indian businesses.
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-x-16 gap-y-2 text-sm text-muted-foreground" aria-label="Footer">
          <Link href="/about" className="hover:text-foreground">About</Link>
          <Link href="/services" className="hover:text-foreground">Services</Link>
          <Link href="/industries" className="hover:text-foreground">Industries</Link>
          <Link href="/our-work" className="hover:text-foreground">Our Work</Link>
          <Link href="/blog" className="hover:text-foreground">Blog</Link>
          <Link href="/contact" className="hover:text-foreground">Contact</Link>
        </nav>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © 2026 Ethixweb India. All rights reserved.
      </div>
    </footer>
  );
}
