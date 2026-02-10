"use client";
import CTASection from "@/components/common/CallToAction";
import DataCollectionPopup from "@/components/common/DataCollectionPopup";
import HeroSection from "@/components/home/Hero";

function App() {
  return (
    <>
      <main>
        <DataCollectionPopup />
        <HeroSection />
        <CTASection />
      </main>
    </>
  );
}

export default App;
