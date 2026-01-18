import React, { useState } from 'react';
import { usePortfolio, Education as EducationType } from '../../context/PortfolioContext';
import { GraduationCap, Plus, Edit, Trash2 } from 'lucide-react';
import EducationModal from './EducationModal';

const Education: React.FC = () => {
  const { education, isAdminMode, addEducation, updateEducation, deleteEducation } = usePortfolio();
  const [editingEducation, setEditingEducation] = useState<EducationType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddEducation = () => {
    setEditingEducation(null);
    setIsModalOpen(true);
  };

  const handleEditEducation = (edu: EducationType) => {
    setEditingEducation(edu);
    setIsModalOpen(true);
  };

  const handleSaveEducation = (eduData: Omit<EducationType, 'id'>) => {
    if (editingEducation) {
      updateEducation(editingEducation.id, eduData);
    } else {
      addEducation(eduData);
    }
    setIsModalOpen(false);
    setEditingEducation(null);
  };

  const handleDeleteEducation = (id: string) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      deleteEducation(id);
    }
  };

  return (
    <section
      id="education"
      className="py-20 relative"
      aria-labelledby="education-heading"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-secondary/10 to-transparent rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">Academic Background</p>
          <h2
            id="education-heading"
            className="section-title"
          >
            Education
          </h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            My academic background and qualifications
          </p>
          
          {/* Admin Add Button */}
          {isAdminMode && (
            <button
              onClick={handleAddEducation}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary text-white font-medium hover:opacity-90 transition-opacity animate-fade-up"
            >
              <Plus className="w-5 h-5" />
              Add Education
            </button>
          )}
        </div>

        {/* Education Cards */}
        <div className="max-w-4xl mx-auto grid gap-6">
          {education.map((edu, index) => (
            <div
              key={edu.id}
              className="glass-panel p-6 rounded-2xl hover-lift group animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-foreground/80 font-semibold mb-2">
                        {edu.institution}
                      </p>
                    </div>
                    
                    {/* Admin Actions */}
                    {isAdminMode && (
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEditEducation(edu)}
                          className="p-2 rounded-lg hover:bg-primary/10 text-foreground/70 hover:text-primary transition-colors"
                          aria-label="Edit education"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEducation(edu.id)}
                          className="p-2 rounded-lg hover:bg-destructive/10 text-foreground/70 hover:text-destructive transition-colors"
                          aria-label="Delete education"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 mt-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {edu.year}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                      {edu.grade}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {education.length === 0 && (
          <div className="text-center py-16">
            <p className="text-foreground/70 text-lg font-medium">No education entries added yet.</p>
            {isAdminMode && (
              <button
                onClick={handleAddEducation}
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary text-white font-medium hover:opacity-90 transition-opacity"
              >
                <Plus className="w-5 h-5" />
                Add Your First Education
              </button>
            )}
          </div>
        )}
      </div>

      {/* Education Modal */}
      {isModalOpen && (
        <EducationModal
          education={editingEducation}
          onSave={handleSaveEducation}
          onClose={() => {
            setIsModalOpen(false);
            setEditingEducation(null);
          }}
        />
      )}
    </section>
  );
};

export default Education;
