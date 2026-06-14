import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Code, Database, Globe, Sparkles } from 'lucide-react';

const highlights = [
  {
    icon: Code,
    title: 'Backend Development',
    description: 'Spring Boot, Hibernate, JPA, and RESTful API design',
  },
  {
    icon: Globe,
    title: 'Frontend Development',
    description: 'Proficient in React.js, HTML5, CSS3, and JavaScript',
  },
  {
    icon: Database,
    title: 'Database Management',
    description: 'Experienced with MySQL, JDBC, and data modeling',
  },
  {
    icon: Sparkles,
    title: 'Best Practices',
    description: 'Following SOLID principles and clean, testable code',
  },
];

const About: React.FC = () => {
  const { profile } = usePortfolio();

  return (
    <section
      id="about"
      className="py-20 relative"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            id="about-heading"
            className="text-3xl md:text-4xl font-bold text-primary mb-4 animate-fade-up"
          >
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <div className="space-y-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <p className="text-lg text-foreground leading-relaxed font-medium">
              I'm <span className="font-bold text-primary">{profile.name}</span>, a Java Full Stack
              Developer fresher with hands-on experience in Spring Boot, Hibernate, JPA, and
              RESTful API design, backed by a strong foundation in React and MySQL.
            </p>
            <p className="text-lg text-foreground leading-relaxed font-medium">
              I've delivered 2+ end-to-end web applications featuring JWT authentication,
              role-based access control, and AI-powered features. I'm skilled in MVC architecture,
              Agile/Scrum delivery, and Git-based version control with a consistent focus on
              writing clean, scalable, and testable code.
            </p>
            <p className="text-lg text-foreground leading-relaxed font-medium">
              Currently based in {profile.location}, I'm always eager to take on new challenges
              and collaborate on innovative projects that make a difference.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="glass-panel p-4 rounded-xl text-center">
                <div className="text-3xl font-bold gradient-text">2+</div>
                <div className="text-sm text-foreground font-semibold">Years Learning</div>
              </div>
              <div className="glass-panel p-4 rounded-xl text-center">
                <div className="text-3xl font-bold gradient-text">2+</div>
                <div className="text-sm text-foreground font-semibold">Projects</div>
              </div>
              <div className="glass-panel p-4 rounded-xl text-center">
                <div className="text-3xl font-bold gradient-text">4+</div>
                <div className="text-sm text-foreground font-semibold">Certifications</div>
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="glass-panel p-6 rounded-xl hover-lift group animate-fade-up"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-foreground text-sm font-medium">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;