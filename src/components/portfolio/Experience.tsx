import React, { useState } from 'react';
import { usePortfolio, Experience as ExperienceType } from '../../context/PortfolioContext';
import { Briefcase, Plus, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import ExperienceModal from './ExperienceModal';

const Experience: React.FC = () => {
  const { experience, isAdminMode, addExperience, updateExperience, deleteExperience } = usePortfolio();
  const [expandedId, setExpandedId] = useState<string | null>(experience[0]?.id || null);
  const [editingExperience, setEditingExperience] = useState<ExperienceType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddExperience = () => {
    setEditingExperience(null);
    setIsModalOpen(true);
  };

  const handleEditExperience = (exp: ExperienceType) => {
    setEditingExperience(exp);
    setIsModalOpen(true);
  };

  const handleSaveExperience = (expData: Omit<ExperienceType, 'id'>) => {
    if (editingExperience) {
      updateExperience(editingExperience.id, expData);
    } else {
      addExperience(expData);
    }
    setIsModalOpen(false);
    setEditingExperience(null);
  };

  const handleDeleteExperience = (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      deleteExperience(id);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="experience"
      className="py-20 relative"
      aria-labelledby="experience-heading"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">Career Journey</p>
          <h2
            id="experience-heading"
            className="section-title"
          >
            Work Experience
          </h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            My professional journey and career milestones
          </p>
          
          {/* Admin Add Button */}
          {isAdminMode && (
            <button
              onClick={handleAddExperience}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary text-white font-medium hover:opacity-90 transition-opacity animate-fade-up"
            >
              <Plus className="w-5 h-5" />
              Add Experience
            </button>
          )}
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent transform md:-translate-x-1/2" />

            {/* Experience Items */}
            {experience.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 animate-fade-up ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Timeline Node */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-gradient-primary transform -translate-x-1/2 mt-6 z-10 ring-4 ring-background">
                  <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                </div>

                {/* Content Card */}
                <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="glass-panel p-6 rounded-2xl hover-lift group">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground">{exp.role}</h3>
                          <p className="text-foreground/80 font-semibold">{exp.company}</p>
                        </div>
                      </div>
                      
                      {/* Admin Actions */}
                      {isAdminMode && (
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEditExperience(exp)}
                            className="p-2 rounded-lg hover:bg-primary/10 text-foreground/70 hover:text-primary transition-colors"
                            aria-label="Edit experience"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteExperience(exp.id)}
                            className="p-2 rounded-lg hover:bg-destructive/10 text-foreground/70 hover:text-destructive transition-colors"
                            aria-label="Delete experience"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Period */}
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                      {exp.period}
                    </div>

                    {/* Description */}
                    <div className={`overflow-hidden transition-all duration-300 ${
                      expandedId === exp.id ? 'max-h-96' : 'max-h-0'
                    }`}>
                      <ul className="space-y-2 text-foreground/85 text-sm">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Expand Toggle */}
                    <button
                      onClick={() => toggleExpand(exp.id)}
                      className="mt-4 flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all"
                    >
                      {expandedId === exp.id ? (
                        <>
                          Show Less <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          Show More <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {experience.length === 0 && (
          <div className="text-center py-16">
            <p className="text-foreground/70 text-lg font-medium">No experience added yet.</p>
            {isAdminMode && (
              <button
                onClick={handleAddExperience}
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary text-white font-medium hover:opacity-90 transition-opacity"
              >
                <Plus className="w-5 h-5" />
                Add Your First Experience
              </button>
            )}
          </div>
        )}
      </div>

      {/* Experience Modal */}
      {isModalOpen && (
        <ExperienceModal
          experience={editingExperience}
          onSave={handleSaveExperience}
          onClose={() => {
            setIsModalOpen(false);
            setEditingExperience(null);
          }}
        />
      )}
    </section>
  );
};

export default Experience;
