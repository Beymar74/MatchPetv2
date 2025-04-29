// src/app/page.tsx
"use client"; // Make this a Client Component

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// Import all your section components
import HeroSection from './PaginaPrincipal/HeroSection';
import AboutUs from './PaginaPrincipal/AboutUs';
import AdoptionProcess from './PaginaPrincipal/AdoptionProcess';
import PetsSection from './PaginaPrincipal/PetsSection';
import Community from './PaginaPrincipal/Community';
import StatsSection from './PaginaPrincipal/StatsSection';
import ExploreSection from './PaginaPrincipal/ExploreSection';

// Define the section IDs in order
const sectionIds = [
  'hero',
  'about',
  'process',
  'pets',
  'community',
  'stats',
  'explore',
];

export default function HomePage() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  // Use a ref to prevent stale state in the event listener
  const sectionIndexRef = useRef(currentSectionIndex);

  // Keep the ref updated
  useEffect(() => {
    sectionIndexRef.current = currentSectionIndex;
  }, [currentSectionIndex]);

  const scrollToSection = (index: number) => {
    const targetIndex = Math.max(0, Math.min(index, sectionIds.length - 1));
    const targetId = sectionIds[targetIndex];
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setCurrentSectionIndex(targetIndex);
      // Optional: Add/Remove current-section class (though snap might handle visual focus)
      document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('current-section'));
      element.classList.add('current-section');
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'PageDown') {
        event.preventDefault(); // Prevent default browser scroll
        scrollToSection(sectionIndexRef.current + 1);
      }
      if (event.key === 'PageUp') {
        event.preventDefault(); // Prevent default browser scroll
        scrollToSection(sectionIndexRef.current - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Set initial current section class
    const initialElement = document.getElementById(sectionIds[0]);
    if(initialElement) initialElement.classList.add('current-section');

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    // The direct parent of the snapping sections will be the snap container
    // We apply snap properties via global CSS to html/body instead
    <div>
      {/* Wrap each section with a div having the ID and necessary classes */}
      <div id="hero" className="page-section">
        <HeroSection />
      </div>
      <div id="about" className="page-section">
        <AboutUs />
      </div>
      <div id="process" className="page-section">
        <AdoptionProcess />
      </div>
      <div id="pets" className="page-section">
        <PetsSection />
      </div>
      <div id="community" className="page-section">
        <Community />
      </div>
      <div id="stats" className="page-section">
        <StatsSection />
      </div>
      <div id="explore" className="page-section">
        <ExploreSection />
      </div>
        
    </div>
  );
}
