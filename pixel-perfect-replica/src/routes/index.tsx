import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BootSequence } from "@/components/BootSequence";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { StatusBar } from "@/components/StatusBar";
import { WingsGallery } from "@/components/WingsGallery";
import { PhoneMockup } from "@/components/PhoneMockup";
import { MethodologySection } from "@/components/MethodologySection";
import { EntryLog } from "@/components/EntryLog";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Infinite Archive — The Museum of Primal Knowledge" },
      { name: "description", content: "A permanent, browsable archive of the raw, unfiltered facts of human civilisation and the natural world. One hundred entries per wing. No skipping." },
      { property: "og:title", content: "The Infinite Archive" },
      { property: "og:description", content: "The Museum of Everything Primal. Browse the exhibit wings of @the_infinite_archives." },
    ],
  }),
  component: Index,
});

function Index() {
  const [booted, setBooted] = useState(true);
  const [showBoot, setShowBoot] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("archive-booted")) return;
    sessionStorage.setItem("archive-booted", "1");
    setBooted(false);
    setShowBoot(true);
  }, []);
  return (
    <>
      {showBoot && !booted && <BootSequence onDone={() => setBooted(true)} />}
      <CustomCursor />
      <ScrollProgress />
      <StatusBar />
      <main>
        <Hero />
        <WingsGallery />
        <PhoneMockup />
        <MethodologySection />
        <EntryLog />
        <Footer />
      </main>
    </>
  );
}
