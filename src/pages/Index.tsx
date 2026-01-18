import { useState } from 'react';
import { PortfolioProvider, usePortfolio } from '@/context/PortfolioContext';
import Nav from '@/components/portfolio/Nav';
import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import Skills from '@/components/portfolio/Skills';
import Projects from '@/components/portfolio/Projects';
import Experience from '@/components/portfolio/Experience';
import Education from '@/components/portfolio/Education';
import Certifications from '@/components/portfolio/Certifications';
import Contact from '@/components/portfolio/Contact';
import Footer from '@/components/portfolio/Footer';
import AdminPanel from '@/components/portfolio/AdminPanel';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PortfolioContent = () => {
  const { isAdminMode } = usePortfolio();
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Parallax Background */}
      <div className="parallax-bg" aria-hidden="true" />

      {/* Navigation */}
      <Nav />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Admin FAB */}
      {isAdminMode && (
        <Button
          onClick={() => setShowAdminPanel(true)}
          className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-lg animate-pulse-glow"
          size="icon"
          aria-label="Open Admin Panel"
        >
          <Settings className="h-6 w-6" />
        </Button>
      )}

      {/* Admin Panel */}
      <AdminPanel
        isOpen={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
      />
    </div>
  );
};

const Index = () => {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
};

export default Index;
