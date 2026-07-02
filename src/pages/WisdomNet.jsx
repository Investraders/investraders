import React from 'react';
import WisdomNavbar from '@/components/wisdomnet/WisdomNavbar';
import WisdomHero from '@/components/wisdomnet/WisdomHero';
import WisdomEconomy from '@/components/wisdomnet/WisdomEconomy';
import VisionMission from '@/components/wisdomnet/VisionMission';
import AreasOfExcellence from '@/components/wisdomnet/AreasOfExcellence';
import InvestradersFlagship from '@/components/wisdomnet/InvestradersFlagship';
import PowerOfCircles from '@/components/wisdomnet/PowerOfCircles';
import WisdomEcosystems from '@/components/wisdomnet/WisdomEcosystems';
import ArtificialWisdom from '@/components/wisdomnet/ArtificialWisdom';
import InternationalRecognition from '@/components/wisdomnet/InternationalRecognition';
import JoinWisdom from '@/components/wisdomnet/JoinWisdom';
import WisdomFooter from '@/components/wisdomnet/WisdomFooter';

export default function WisdomNet() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#060a18' }}>
      <WisdomNavbar />
      <WisdomHero />
      <WisdomEconomy />
      <VisionMission />
      <AreasOfExcellence />
      <InvestradersFlagship />
      <PowerOfCircles />
      <WisdomEcosystems />
      <ArtificialWisdom />
      <InternationalRecognition />
      <JoinWisdom />
      <WisdomFooter />
    </div>
  );
}