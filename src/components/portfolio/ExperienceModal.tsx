import React, { useState, useEffect } from 'react';
import { Experience } from '../../context/PortfolioContext';
import { X, Plus, Trash2 } from 'lucide-react';

interface ExperienceModalProps {
  experience: Experience | null;
  onSave: (experience: Omit<Experience, 'id'>) => void;
  onClose: () => void;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({ experience, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    period: '',
    description: [''],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (experience) {
      setFormData({
        role: experience.role,
        company: experience.company,
        period: experience.period,
        description: [...experience.description],
      });
    }
  }, [experience]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    if (!formData.period.trim()) {
      newErrors.period = 'Period is required';
    }
    if (formData.description.filter(d => d.trim()).length === 0) {
      newErrors.description = 'Add at least one responsibility';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        ...formData,
        description: formData.description.filter(d => d.trim()),
      });
    }
  };

  const handleDescriptionChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      description: prev.description.map((d, i) => i === index ? value : d),
    }));
  };

  const addDescription = () => {
    setFormData(prev => ({
      ...prev,
      description: [...prev.description, ''],
    }));
  };

  const removeDescription = (index: number) => {
    setFormData(prev => ({
      ...prev,
      description: prev.description.filter((_, i) => i !== index),
    }));
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
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel p-6 rounded-2xl animate-scale-in">
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
            {experience ? 'Edit Experience' : 'Add Experience'}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-primary mb-2">
              Job Title / Role *
            </label>
            <input
              type="text"
              id="role"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              className={`w-full px-4 py-3 rounded-xl bg-background border ${
                errors.role ? 'border-destructive' : 'border-border'
              } focus:border-primary outline-none transition-colors`}
              placeholder="e.g., Software Developer"
            />
            {errors.role && (
              <p className="text-destructive text-sm mt-1">{errors.role}</p>
            )}
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-primary mb-2">
              Company *
            </label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              className={`w-full px-4 py-3 rounded-xl bg-background border ${
                errors.company ? 'border-destructive' : 'border-border'
              } focus:border-primary outline-none transition-colors`}
              placeholder="e.g., Tech Corp Inc."
            />
            {errors.company && (
              <p className="text-destructive text-sm mt-1">{errors.company}</p>
            )}
          </div>

          {/* Period */}
          <div>
            <label htmlFor="period" className="block text-sm font-medium text-primary mb-2">
              Period *
            </label>
            <input
              type="text"
              id="period"
              value={formData.period}
              onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
              className={`w-full px-4 py-3 rounded-xl bg-background border ${
                errors.period ? 'border-destructive' : 'border-border'
              } focus:border-primary outline-none transition-colors`}
              placeholder="e.g., Jan 2023 - Present"
            />
            {errors.period && (
              <p className="text-destructive text-sm mt-1">{errors.period}</p>
            )}
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Responsibilities / Achievements *
            </label>
            <div className="space-y-3">
              {formData.description.map((desc, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={desc}
                    onChange={(e) => handleDescriptionChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg bg-background border border-border focus:border-primary outline-none transition-colors"
                    placeholder="Describe a responsibility or achievement..."
                  />
                  {formData.description.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDescription(index)}
                      className="p-2 rounded-lg hover:bg-destructive/10 text-secondary hover:text-destructive transition-colors"
                      aria-label="Remove responsibility"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addDescription}
              className="mt-3 flex items-center gap-2 text-primary text-sm font-medium hover:underline"
            >
              <Plus className="w-4 h-4" />
              Add Another
            </button>
            {errors.description && (
              <p className="text-destructive text-sm mt-1">{errors.description}</p>
            )}
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
              {experience ? 'Save Changes' : 'Add Experience'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceModal;
