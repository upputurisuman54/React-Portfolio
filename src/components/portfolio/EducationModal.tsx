import React, { useState, useEffect } from 'react';
import { Education } from '../../context/PortfolioContext';
import { X } from 'lucide-react';

interface EducationModalProps {
  education: Education | null;
  onSave: (education: Omit<Education, 'id'>) => void;
  onClose: () => void;
}

const EducationModal: React.FC<EducationModalProps> = ({ education, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    grade: '',
    year: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (education) {
      setFormData({
        degree: education.degree,
        institution: education.institution,
        grade: education.grade,
        year: education.year,
      });
    }
  }, [education]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.degree.trim()) {
      newErrors.degree = 'Degree is required';
    }
    if (!formData.institution.trim()) {
      newErrors.institution = 'Institution is required';
    }
    if (!formData.year.trim()) {
      newErrors.year = 'Year is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg glass-panel p-6 rounded-2xl animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-primary/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-secondary" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary">
            {education ? 'Edit Education' : 'Add Education'}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Degree */}
          <div>
            <label htmlFor="degree" className="block text-sm font-medium text-primary mb-2">
              Degree / Certificate *
            </label>
            <input
              type="text"
              id="degree"
              value={formData.degree}
              onChange={(e) => setFormData(prev => ({ ...prev, degree: e.target.value }))}
              className={`w-full px-4 py-3 rounded-xl bg-background border ${
                errors.degree ? 'border-destructive' : 'border-border'
              } focus:border-primary outline-none transition-colors`}
              placeholder="e.g., Bachelor of Computer Science"
            />
            {errors.degree && (
              <p className="text-destructive text-sm mt-1">{errors.degree}</p>
            )}
          </div>

          {/* Institution */}
          <div>
            <label htmlFor="institution" className="block text-sm font-medium text-primary mb-2">
              Institution *
            </label>
            <input
              type="text"
              id="institution"
              value={formData.institution}
              onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
              className={`w-full px-4 py-3 rounded-xl bg-background border ${
                errors.institution ? 'border-destructive' : 'border-border'
              } focus:border-primary outline-none transition-colors`}
              placeholder="e.g., University of Technology"
            />
            {errors.institution && (
              <p className="text-destructive text-sm mt-1">{errors.institution}</p>
            )}
          </div>

          {/* Year */}
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-primary mb-2">
              Year / Period *
            </label>
            <input
              type="text"
              id="year"
              value={formData.year}
              onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
              className={`w-full px-4 py-3 rounded-xl bg-background border ${
                errors.year ? 'border-destructive' : 'border-border'
              } focus:border-primary outline-none transition-colors`}
              placeholder="e.g., 2020 - 2024"
            />
            {errors.year && (
              <p className="text-destructive text-sm mt-1">{errors.year}</p>
            )}
          </div>

          {/* Grade */}
          <div>
            <label htmlFor="grade" className="block text-sm font-medium text-primary mb-2">
              Grade / CGPA (Optional)
            </label>
            <input
              type="text"
              id="grade"
              value={formData.grade}
              onChange={(e) => setFormData(prev => ({ ...prev, grade: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-colors"
              placeholder="e.g., CGPA: 8.5 / 10"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border border-border text-secondary hover:bg-muted/50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-xl bg-gradient-primary text-white font-medium hover:opacity-90 transition-opacity"
            >
              {education ? 'Save Changes' : 'Add Education'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationModal;
