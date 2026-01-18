import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import initialData from '../data/initialData.json';

// Types
export interface Profile {
  name: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  linkedin: string;
  photo: string;
  summary: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
  tech: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  grade: string;
  year: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  file: string;
}

export interface Resume {
  url: string;
  parsed: boolean;
}

interface PortfolioState {
  profile: Profile;
  resume: Resume;
  skills: string[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  isAdminMode: boolean;
  theme: 'light' | 'dark';
}

interface PortfolioContextType extends PortfolioState {
  // Profile actions
  updateProfile: (profile: Partial<Profile>) => void;
  updateProfilePhoto: (photoUrl: string) => void;
  
  // Resume actions
  updateResume: (resumeUrl: string) => void;
  
  // Skills actions
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  
  // Project actions
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (projects: Project[]) => void;
  
  // Experience actions
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  
  // Education actions
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  
  // Certification actions
  addCertification: (certification: Omit<Certification, 'id'>) => void;
  updateCertification: (id: string, certification: Partial<Certification>) => void;
  deleteCertification: (id: string) => void;
  
  // Admin actions
  toggleAdminMode: (password?: string) => boolean;
  logout: () => void;
  
  // Theme actions
  toggleTheme: () => void;
}

const STORAGE_KEY = 'portfolio_data';
const ADMIN_PASSWORD = 'admin123'; // TODO: Replace with secure authentication in production

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const loadFromStorage = (): Partial<PortfolioState> | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const saveToStorage = (state: Partial<PortfolioState>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PortfolioState>(() => {
    const stored = loadFromStorage();
    const theme = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    
    return {
      profile: stored?.profile || initialData.profile,
      resume: stored?.resume || initialData.resume,
      skills: stored?.skills || initialData.skills,
      projects: stored?.projects || initialData.projects,
      experience: stored?.experience || initialData.experience,
      education: stored?.education || initialData.education,
      certifications: stored?.certifications || initialData.certifications,
      isAdminMode: false,
      theme,
    };
  });

  // Persist state changes to localStorage
  useEffect(() => {
    const { isAdminMode, theme, ...dataToSave } = state;
    saveToStorage(dataToSave);
  }, [state]);

  // Apply theme to document
  useEffect(() => {
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', state.theme);
  }, [state.theme]);

  // Profile actions
  const updateProfile = (profile: Partial<Profile>) => {
    setState(prev => ({ ...prev, profile: { ...prev.profile, ...profile } }));
    // TODO: Replace with API call - POST /api/profile
  };

  const updateProfilePhoto = (photoUrl: string) => {
    setState(prev => ({ ...prev, profile: { ...prev.profile, photo: photoUrl } }));
    // TODO: Replace with API call - POST /api/profile/photo (multipart/form-data)
  };

  // Resume actions
  const updateResume = (resumeUrl: string) => {
    setState(prev => ({ ...prev, resume: { url: resumeUrl, parsed: true } }));
    // TODO: Replace with API call - POST /api/resume (multipart/form-data)
  };

  // Skills actions
  const addSkill = (skill: string) => {
    if (!state.skills.includes(skill)) {
      setState(prev => ({ ...prev, skills: [...prev.skills, skill] }));
      // TODO: Replace with API call - POST /api/skills
    }
  };

  const removeSkill = (skill: string) => {
    setState(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
    // TODO: Replace with API call - DELETE /api/skills/:skill
  };

  // Project actions
  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: generateId() };
    setState(prev => ({ ...prev, projects: [...prev.projects, newProject] }));
    // TODO: Replace with API call - POST /api/projects
  };

  const updateProject = (id: string, project: Partial<Project>) => {
    setState(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...project } : p),
    }));
    // TODO: Replace with API call - PUT /api/projects/:id
  };

  const deleteProject = (id: string) => {
    setState(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
    // TODO: Replace with API call - DELETE /api/projects/:id
  };

  const reorderProjects = (projects: Project[]) => {
    setState(prev => ({ ...prev, projects }));
    // TODO: Replace with API call - PUT /api/projects/reorder
  };

  // Experience actions
  const addExperience = (experience: Omit<Experience, 'id'>) => {
    const newExperience = { ...experience, id: generateId() };
    setState(prev => ({ ...prev, experience: [...prev.experience, newExperience] }));
    // TODO: Replace with API call - POST /api/experience
  };

  const updateExperience = (id: string, experience: Partial<Experience>) => {
    setState(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === id ? { ...e, ...experience } : e),
    }));
    // TODO: Replace with API call - PUT /api/experience/:id
  };

  const deleteExperience = (id: string) => {
    setState(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
    // TODO: Replace with API call - DELETE /api/experience/:id
  };

  // Education actions
  const addEducation = (education: Omit<Education, 'id'>) => {
    const newEducation = { ...education, id: generateId() };
    setState(prev => ({ ...prev, education: [...prev.education, newEducation] }));
    // TODO: Replace with API call - POST /api/education
  };

  const updateEducation = (id: string, education: Partial<Education>) => {
    setState(prev => ({
      ...prev,
      education: prev.education.map(e => e.id === id ? { ...e, ...education } : e),
    }));
    // TODO: Replace with API call - PUT /api/education/:id
  };

  const deleteEducation = (id: string) => {
    setState(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));
    // TODO: Replace with API call - DELETE /api/education/:id
  };

  // Certification actions
  const addCertification = (certification: Omit<Certification, 'id'>) => {
    const newCertification = { ...certification, id: generateId() };
    setState(prev => ({ ...prev, certifications: [...prev.certifications, newCertification] }));
    // TODO: Replace with API call - POST /api/certifications
  };

  const updateCertification = (id: string, certification: Partial<Certification>) => {
    setState(prev => ({
      ...prev,
      certifications: prev.certifications.map(c => c.id === id ? { ...c, ...certification } : c),
    }));
    // TODO: Replace with API call - PUT /api/certifications/:id
  };

  const deleteCertification = (id: string) => {
    setState(prev => ({ ...prev, certifications: prev.certifications.filter(c => c.id !== id) }));
    // TODO: Replace with API call - DELETE /api/certifications/:id
  };

  // Admin actions
  const toggleAdminMode = (password?: string): boolean => {
    if (state.isAdminMode) {
      setState(prev => ({ ...prev, isAdminMode: false }));
      return true;
    }
    
    // TODO: Replace with secure API authentication
    // Example: POST /api/auth/login with credentials
    if (password === ADMIN_PASSWORD) {
      setState(prev => ({ ...prev, isAdminMode: true }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setState(prev => ({ ...prev, isAdminMode: false }));
    // TODO: Replace with API call - POST /api/auth/logout
  };

  // Theme actions
  const toggleTheme = () => {
    setState(prev => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }));
  };

  return (
    <PortfolioContext.Provider
      value={{
        ...state,
        updateProfile,
        updateProfilePhoto,
        updateResume,
        addSkill,
        removeSkill,
        addProject,
        updateProject,
        deleteProject,
        reorderProjects,
        addExperience,
        updateExperience,
        deleteExperience,
        addEducation,
        updateEducation,
        deleteEducation,
        addCertification,
        updateCertification,
        deleteCertification,
        toggleAdminMode,
        logout,
        toggleTheme,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
