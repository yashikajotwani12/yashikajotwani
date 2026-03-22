import Experience from "@/components/Experience";
import About from "@/components/About";
import PageWrapper from "@/components/PageWrapper";

export default function AboutPage() {
  return (
    <main className="pt-24">
      <PageWrapper>
        <Experience />
        <div className="max-w-4xl mx-auto px-6 sm:px-12 lg:px-24">
          <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />
        </div>
        <About />
      </PageWrapper>
    </main>
  );
}
