"use client";
import CTASection from "@/components/common/CallToAction";
import { Stack, Box, Typography, Button, Container } from "@mui/material";
import HeroSection from "@/components/home/Hero";

function App() {
  return (
    <>
      <main>
        <HeroSection />
        <CTASection />
      </main>
    </>
  );
}

export default App;
