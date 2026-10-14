import { CloudBackground } from "@/components/site/cloud-background";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";

// Marketing-site chrome. The /admin area has its own layout and doesn't use this.
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <CloudBackground />
      <ScrollProgress />
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
