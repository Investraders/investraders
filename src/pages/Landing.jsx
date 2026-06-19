import React from 'react';
import LandingNavbar from '@/components/landing/LandingNavbar';
import HeroSection from '@/components/landing/HeroSection';
import InstitutionsSection from '@/components/landing/InstitutionsSection';
import SectorCardsSection from '@/components/landing/SectorCardsSection';
import CircleShowcaseSection from '@/components/landing/CircleShowcaseSection';
import IndividualsSection from '@/components/landing/IndividualsSection';
import MonetizeSection from '@/components/landing/MonetizeSection';
import MissionCTASection from '@/components/landing/MissionCTASection';

export default function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#030712' }}>
      <LandingNavbar />
      <HeroSection />
      <InstitutionsSection />
      <CircleShowcaseSection />
      <SectorCardsSection />
      <IndividualsSection />
      <MonetizeSection />
      <MissionCTASection />
    </div>
  );
}