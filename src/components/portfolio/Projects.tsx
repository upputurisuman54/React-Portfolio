import React, { useState } from 'react';
import { usePortfolio, Project } from '../../context/PortfolioContext';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { Plus } from 'lucide-react';

const Projects: React.FC = () => {
  const { projects, isAdminMode, addProject, updateProject, deleteProject } = usePortfolio();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProject = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleSaveProject = (projectData: Omit<Project, 'id'>) => {
    if (editingProject) {
      updateProject(editingProject.id, projectData);
    } else {
      addProject(projectData);
    }
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

  return (
    <section
      id="projects"
      className="py-20 relative"
      aria-labelledby="projects-heading"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-radial from-accent/10 to-transparent rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-radial from-primary/10 to-transparent rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">My Work</p>
          <h2
            id="projects-heading"
            className="section-title"
          >
            Featured Projects
          </h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            A showcase of my recent work and personal projects
          </p>
          
          {/* Admin Add Button */}
          {isAdminMode && (
            <button
              onClick={handleAddProject}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary text-white font-medium hover:opacity-90 transition-opacity animate-fade-up"
            >
              <Plus className="w-5 h-5" />
              Add New Project
            </button>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onEdit={isAdminMode ? () => handleEditProject(project) : undefined}
              onDelete={isAdminMode ? () => handleDeleteProject(project.id) : undefined}
            />
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-foreground/70 text-lg font-medium">No projects yet.</p>
            {isAdminMode && (
              <button
                onClick={handleAddProject}
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary text-white font-medium hover:opacity-90 transition-opacity"
              >
                <Plus className="w-5 h-5" />
                Add Your First Project
              </button>
            )}
          </div>
        )}
      </div>

      {/* Project Modal */}
      {isModalOpen && (
        <ProjectModal
          project={editingProject}
          onSave={handleSaveProject}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProject(null);
          }}
        />
      )}
    </section>
  );
};

export default Projects;
