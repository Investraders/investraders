import React from 'react';
import LandingNavbar from '@/components/landing/LandingNavbar';
import HeroSection from '@/components/landing/HeroSection';
import InstitutionsSection from '@/components/landing/InstitutionsSection';
import SectorCardsSection from '@/components/landing/SectorCardsSection';
import IndividualsSection from '@/components/landing/IndividualsSection';
import MonetizeSection from '@/components/landing/MonetizeSection';
import MissionCTASection from '@/components/landing/MissionCTASection';

export default function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#030712' }}>
      <LandingNavbar />
      <HeroSection />
      <InstitutionsSection />
      <SectorCardsSection />
      <IndividualsSection />
      <MonetizeSection />
      <MissionCTASection />
    </div>
  );
}