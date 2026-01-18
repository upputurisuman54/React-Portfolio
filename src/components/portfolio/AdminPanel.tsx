import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  Settings, 
  User, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code,
  X,
  ChevronRight
} from 'lucide-react';
import ProfileUploader from './ProfileUploader';
import ResumeManager from './ResumeManager';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const adminSections = [
  { id: 'profile', label: 'Profile Photo', icon: User, description: 'Update your profile picture' },
  { id: 'resume', label: 'Resume', icon: FileText, description: 'Upload and manage your resume' },
  { id: 'projects', label: 'Projects', icon: Code, description: 'Add, edit, or remove projects' },
  { id: 'experience', label: 'Experience', icon: Briefcase, description: 'Manage work history' },
  { id: 'education', label: 'Education', icon: GraduationCap, description: 'Update education details' },
  { id: 'certifications', label: 'Certifications', icon: Award, description: 'Add certificates' },
];

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { profile, isAdminMode } = usePortfolio();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  if (!isAdminMode) return null;

  const handleSectionClick = (sectionId: string) => {
    if (sectionId === 'profile' || sectionId === 'resume') {
      setActiveModal(sectionId);
    } else {
      // Scroll to section and close panel
      const element = document.querySelector(`#${sectionId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    }
  };

  return (
    <>
      {/* Slide-over Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-96 z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 -left-full w-screen transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={onClose}
        />

        {/* Panel Content */}
        <div className="relative h-full glass-panel border-l border-border overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 z-10 glass-panel p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-primary">Admin Panel</h2>
                  <p className="text-sm text-muted">Manage your portfolio</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                aria-label="Close panel"
              >
                <X className="w-5 h-5 text-secondary" />
              </button>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden glass-panel">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/assets/profile-placeholder.jpg';
                  }}
                />
              </div>
              <div>
                <h3 className="font-semibold text-primary">{profile.name}</h3>
                <p className="text-sm text-secondary">{profile.title}</p>
              </div>
            </div>
          </div>

          {/* Admin Sections */}
          <div className="p-6 space-y-2">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">
              Manage Sections
            </p>
            
            {adminSections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-primary/5 transition-colors group text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-gradient-primary transition-colors">
                  <section.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-primary">{section.label}</p>
                  <p className="text-sm text-muted">{section.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted group-hover:text-primary transition-colors" />
              </button>
            ))}
          </div>

          {/* Tips */}
          <div className="p-6 border-t border-border">
            <div className="p-4 rounded-xl bg-primary/5">
              <h4 className="font-medium text-primary mb-2">Quick Tips</h4>
              <ul className="text-sm text-secondary space-y-2">
                <li>• Click on sections to scroll and edit inline</li>
                <li>• Changes are saved automatically to localStorage</li>
                <li>• Upload resume to auto-populate sections</li>
              </ul>
            </div>
          </div>

          {/* Security Notice */}
          <div className="p-6">
            <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
              <p className="text-sm text-secondary">
                <strong className="text-primary">Security Note:</strong> This admin panel uses
                client-side authentication for demo purposes. In production, implement proper
                server-side authentication with JWT tokens or session management.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'profile' && (
        <ProfileUploader onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'resume' && (
        <ResumeManager onClose={() => setActiveModal(null)} />
      )}
    </>
  );
};

export default AdminPanel;
