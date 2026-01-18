import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Download, Mail, ExternalLink, MapPin, Phone, Linkedin, Edit, Github } from 'lucide-react';
import profileImage from '@/assets/profile.jpeg';
import ProfileUploader from './ProfileUploader';

const typedTexts = [
  'Java Developer',
];

const Hero: React.FC = () => {
  const { profile, resume, isAdminMode } = usePortfolio();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showProfileUploader, setShowProfileUploader] = useState(false);

  // Typing animation effect
  useEffect(() => {
    const currentFullText = typedTexts[currentTextIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % typedTexts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex]);

  const handleDownloadResume = () => {
    // Create a link to download the resume
    const link = document.createElement('a');
    link.href = resume.url;
    link.download = 'UPPUTURI_Suman_Resume.pdf';
    link.click();
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
      aria-label="Hero section"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shape w-64 h-64 -top-20 -left-20 opacity-30" style={{ animationDelay: '0s' }} />
        <div className="floating-shape w-96 h-96 -bottom-40 -right-40 opacity-20" style={{ animationDelay: '2s' }} />
        <div className="floating-shape w-48 h-48 top-1/4 right-1/4 opacity-25" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-up">
            {/* Greeting Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-foreground font-semibold text-sm">Available for opportunities</span>
            </div>

            {/* Greeting */}
            <p className="text-xl text-foreground/90 font-medium mb-2 animate-fade-up" style={{ animationDelay: '0.15s' }}>
              Hello, I'm
            </p>

            {/* Name with Neon Effect */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 animate-fade-up neon-text" style={{ animationDelay: '0.2s' }}>
              <span className="gradient-text">{profile.name}</span>
            </h1>

            {/* Typed Title with Enhanced Visibility */}
            <div className="h-14 mb-8 animate-fade-up flex items-center justify-center lg:justify-start" style={{ animationDelay: '0.3s' }}>
              <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                {displayText}
                <span className="text-primary animate-pulse ml-1">|</span>
              </span>
            </div>

            {/* Summary with Better Contrast */}
            <p className="text-lg md:text-xl text-foreground/85 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed font-medium animate-fade-up" style={{ animationDelay: '0.4s' }}>
              {profile.summary}
            </p>

            {/* Contact Info with Glass Cards */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8 animate-fade-up" style={{ animationDelay: '0.5s' }}>
              <a href={`tel:${profile.phone}`} className="flex items-center gap-2 px-4 py-2 glass-card rounded-full hover:scale-105 transition-all text-foreground font-medium">
                <Phone className="w-4 h-4 text-primary" />
                <span>{profile.phone}</span>
              </a>
              <a href={`mailto:${profile.email}`} className="flex items-center gap-2 px-4 py-2 glass-card rounded-full hover:scale-105 transition-all text-foreground font-medium">
                <Mail className="w-4 h-4 text-primary" />
                <span>{profile.email}</span>
              </a>
              <span className="flex items-center gap-2 px-4 py-2 glass-card rounded-full text-foreground font-medium">
                <MapPin className="w-4 h-4 text-accent" />
                <span>{profile.location}</span>
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 animate-fade-up" style={{ animationDelay: '0.6s' }}>
              <button
                onClick={handleDownloadResume}
                className="btn-primary flex items-center gap-2"
                aria-label="Download resume"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </button>
              <button
                onClick={scrollToContact}
                className="btn-secondary flex items-center gap-2"
                aria-label="Contact me"
              >
                <Mail className="w-5 h-5" />
                Contact Me
              </button>
              <button
                onClick={scrollToProjects}
                className="btn-ghost flex items-center gap-2"
                aria-label="View projects"
              >
                <ExternalLink className="w-5 h-5" />
                View Projects
              </button>
            </div>

            {/* Social Links with Enhanced Icons */}
            <div className="flex justify-center lg:justify-start gap-4 mt-8 animate-fade-up" style={{ animationDelay: '0.7s' }}>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 glass-card rounded-2xl hover:scale-110 transition-all duration-300 card-glow"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 glass-card rounded-2xl hover:scale-110 transition-all duration-300 card-glow"
                aria-label="GitHub profile"
              >
                <Github className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="relative group">
              {/* Animated Ring */}
              <div className="absolute inset-[-8px] rounded-full animate-spin-slow opacity-70">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-primary via-accent to-primary" style={{ padding: '3px' }}>
                  <div className="w-full h-full rounded-full bg-background" />
                </div>
              </div>
              
              {/* Glow Effect */}
              <div className="absolute inset-[-20px] bg-gradient-to-r from-primary to-accent rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse-slow" />
              
              {/* Image Container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                {/* Glass Frame */}
                <div className="absolute inset-0 glass-panel rounded-full p-2 group-hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                    <img
                      src={profileImage}
                      alt={`${profile.name} - ${profile.title}`}
                      className="w-full h-full object-cover animate-profile-reveal"
                    />
                  </div>
                </div>

                {/* Admin Edit Button */}
                {isAdminMode && (
                  <button
                    onClick={() => setShowProfileUploader(true)}
                    className="absolute bottom-4 right-4 p-3 bg-gradient-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform z-10"
                    aria-label="Edit profile photo"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-accent rounded-full animate-float shadow-lg shadow-accent/30" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-primary rounded-full animate-float shadow-lg shadow-primary/30" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/4 -left-6 w-4 h-4 bg-primary/60 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
              <div className="absolute bottom-1/4 -right-4 w-5 h-5 bg-accent/60 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-foreground/50 flex justify-center pt-2">
          <div className="w-1 h-2 bg-foreground/50 rounded-full animate-scroll-indicator" />
        </div>
      </div>

      {/* Profile Uploader Modal */}
      {showProfileUploader && (
        <ProfileUploader onClose={() => setShowProfileUploader(false)} />
      )}
    </section>
  );
};

export default Hero;
