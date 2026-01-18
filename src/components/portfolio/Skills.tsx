import React, { useEffect, useRef, useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, X } from 'lucide-react';

// Skill categories with proficiency levels
const skillCategories = [
  {
    name: 'Languages',
    skills: [
      { name: 'Java', level: 90 },
      { name: 'JavaScript', level: 80 },
      { name: 'HTML', level: 85 },
      { name: 'CSS', level: 80 },
    ],
  },
  {
    name: 'Frameworks',
    skills: [
      { name: 'Spring Boot', level: 85 },
      { name: 'ReactJS', level: 75 },
      { name: 'Spring', level: 80 },
    ],
  },
  {
    name: 'Databases & Tools',
    skills: [
      { name: 'MySQL', level: 85 },
      { name: 'Git', level: 80 },
      { name: 'Maven', level: 75 },
      { name: 'JUnit', level: 70 },
    ],
  },
];

const Skills: React.FC = () => {
  const { skills, isAdminMode, addSkill, removeSkill } = usePortfolio();
  const [isVisible, setIsVisible] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim()) {
      addSkill(newSkill.trim());
      setNewSkill('');
      setShowAddForm(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-20 relative"
      aria-labelledby="skills-heading"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">What I Know</p>
          <h2
            id="skills-heading"
            className="section-title"
          >
            Skills & Expertise
          </h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            A comprehensive overview of my technical skills and proficiency levels
          </p>
        </div>

        {/* Skill Categories with Progress Bars */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.name}
              className="glass-panel p-6 rounded-2xl animate-fade-up"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <h3 className="text-xl font-semibold text-primary mb-6">
                {category.name}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-foreground font-semibold">{skill.name}</span>
                      <span className="text-foreground/70 text-sm font-medium">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-primary rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${categoryIndex * 0.1 + skillIndex * 0.1}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* All Skills Tags */}
        <div className="glass-panel p-8 rounded-2xl animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-primary">All Technologies</h3>
            {isAdminMode && (
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" />
                Add Skill
              </button>
            )}
          </div>

          {/* Add Skill Form */}
          {showAddForm && isAdminMode && (
            <form onSubmit={handleAddSkill} className="mb-6 flex gap-3">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Enter skill name..."
                className="flex-1 px-4 py-2 rounded-lg bg-background border border-border focus:border-primary outline-none transition-colors"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-gradient-primary text-white font-medium hover:opacity-90 transition-opacity"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted/50 transition-colors"
              >
                Cancel
              </button>
            </form>
          )}

          {/* Skills Tags */}
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <div
                key={skill}
                className="group relative skill-tag animate-fade-up"
                style={{ animationDelay: `${0.4 + index * 0.03}s` }}
              >
                <span className="px-4 py-2 rounded-full glass-panel text-foreground font-semibold text-sm inline-flex items-center gap-2 group-hover:border-primary/50 transition-colors">
                  {skill}
                  {isAdminMode && (
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-1 p-0.5 rounded-full hover:bg-destructive/20 text-muted hover:text-destructive transition-colors"
                      aria-label={`Remove ${skill}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
