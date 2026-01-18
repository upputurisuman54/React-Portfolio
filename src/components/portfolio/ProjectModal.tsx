import React, { useState, useEffect } from 'react';
import { Project } from '../../context/PortfolioContext';
import { X, Plus, Trash2 } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onSave: (project: Omit<Project, 'id'>) => void;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: 'https://example.com/project',
    image: '/assets/project-placeholder.jpg',
    tech: [] as string[],
  });
  const [newTech, setNewTech] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        link: project.link,
        image: project.image,
        tech: [...project.tech],
      });
    }
  }, [project]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.link.trim()) {
      newErrors.link = 'Project link is required';
    } else if (!/^https?:\/\/.+/.test(formData.link)) {
      newErrors.link = 'Please enter a valid URL';
    }
    if (formData.tech.length === 0) {
      newErrors.tech = 'Add at least one technology';
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

  const handleAddTech = () => {
    if (newTech.trim() && !formData.tech.includes(newTech.trim())) {
      setFormData(prev => ({
        ...prev,
        tech: [...prev.tech, newTech.trim()],
      }));
      setNewTech('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      tech: prev.tech.filter(t => t !== tech),
    }));
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
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
          <h2 id="project-modal-title" className="text-2xl font-bold text-primary">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <p className="text-secondary mt-1">
            Fill in the project details below
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-primary mb-2">
              Project Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className={`w-full px-4 py-3 rounded-xl bg-background border ${
                errors.title ? 'border-destructive' : 'border-border'
              } focus:border-primary outline-none transition-colors`}
              placeholder="e.g., E-commerce Platform"
            />
            {errors.title && (
              <p className="text-destructive text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-primary mb-2">
              Description *
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className={`w-full px-4 py-3 rounded-xl bg-background border ${
                errors.description ? 'border-destructive' : 'border-border'
              } focus:border-primary outline-none transition-colors resize-none`}
              placeholder="Describe your project..."
            />
            {errors.description && (
              <p className="text-destructive text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Project Link */}
          <div>
            <label htmlFor="link" className="block text-sm font-medium text-primary mb-2">
              Project Link *
            </label>
            <input
              type="url"
              id="link"
              value={formData.link}
              onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
              className={`w-full px-4 py-3 rounded-xl bg-background border ${
                errors.link ? 'border-destructive' : 'border-border'
              } focus:border-primary outline-none transition-colors`}
              placeholder="https://github.com/username/project"
            />
            {errors.link && (
              <p className="text-destructive text-sm mt-1">{errors.link}</p>
            )}
            <p className="text-muted text-sm mt-1">
              Use a placeholder like https://example.com/project if you don't have a live link yet
            </p>
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-primary mb-2">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-colors"
              placeholder="/assets/project-image.jpg"
            />
            {/* 
             * TODO: Replace with file upload for production
             * 
             * <input type="file" accept="image/*" onChange={handleImageUpload} />
             * 
             * async function handleImageUpload(e) {
             *   const file = e.target.files[0];
             *   const formData = new FormData();
             *   formData.append('image', file);
             *   
             *   const response = await fetch('/api/upload/project-image', {
             *     method: 'POST',
             *     body: formData,
             *   });
             *   const { url } = await response.json();
             *   setFormData(prev => ({ ...prev, image: url }));
             * }
             */}
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Technologies Used *
            </label>
            
            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tech.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(tech)}
                    className="p-0.5 rounded-full hover:bg-primary/20 transition-colors"
                    aria-label={`Remove ${tech}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Add Tech Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTech();
                  }
                }}
                className="flex-1 px-4 py-2 rounded-lg bg-background border border-border focus:border-primary outline-none transition-colors"
                placeholder="Add technology..."
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            {errors.tech && (
              <p className="text-destructive text-sm mt-1">{errors.tech}</p>
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
              {project ? 'Save Changes' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
