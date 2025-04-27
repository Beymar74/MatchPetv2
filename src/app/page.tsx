import HeroSection from './PaginaPrincipal/HeroSection';
import AboutUs from './PaginaPrincipal/AboutUs';
import AdoptionProcess from './PaginaPrincipal/AdoptionProcess';
import PetsSection from './PaginaPrincipal/PetsSection';
import Community from './PaginaPrincipal/Community';
import StatsSection from './PaginaPrincipal/StatsSection';
import ExploreSection from './PaginaPrincipal/ExploreSection';

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <AboutUs />
      <AdoptionProcess />
      <PetsSection />
      <Community />
      <StatsSection />
      <ExploreSection />
    </main>
  );
}
