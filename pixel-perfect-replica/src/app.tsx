import { Switch, Route } from "wouter";
import { useEffect, useState } from "react";
import { BootSequence } from "@/components/BootSequence";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { StatusBar } from "@/components/StatusBar";
import { WingsGallery } from "@/components/WingsGallery";
import { PhoneMockup } from "@/components/PhoneMockup";
import { EntryLog } from "@/components/EntryLog";
import { MerchTeaser } from "@/components/MerchTeaser";
import { Footer } from "@/components/Footer";
import { WingPage } from "@/pages/WingPage";

function HomePage() {
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
        <EntryLog />
        <MerchTeaser />
        <Footer />
      </main>
    </>
  );
}

function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--ink)", color: "var(--cream)" }}>
      <div style={{ textAlign: "center" }}>
        <div className="label-mono" style={{ color: "var(--danger)" }}>404 — NOT FOUND</div>
        <h1 className="font-display" style={{ fontSize: 48, margin: "16px 0", fontWeight: 300 }}>Page not found.</h1>
        <a href="/" className="label-mono" style={{ color: "var(--gold)" }}>← RETURN TO THE ARCHIVE</a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/wing/:id" component={WingPage} />
      <Route component={NotFound} />
    </Switch>
  );
}
