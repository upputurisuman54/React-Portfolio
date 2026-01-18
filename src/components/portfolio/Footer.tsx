import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Heart, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const { profile } = usePortfolio();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="py-12 border-t border-border relative">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-primary text-white shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">
              {profile.name.split(' ')[0]}
            </h3>
            <p className="text-foreground font-medium mb-4">
              {profile.title}
            </p>
            <p className="text-foreground/80 text-sm font-medium">
              Building scalable applications with modern technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-primary mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-foreground font-medium hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-primary mb-4">
              Get in Touch
            </h4>
            <div className="space-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                {profile.email}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-foreground/80 text-sm font-medium text-center sm:text-left">
              © {currentYear} {profile.name}. All rights reserved.
            </p>

            {/* Made with love */}
            <p className="flex items-center gap-1 text-foreground/80 text-sm font-medium">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using React
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
