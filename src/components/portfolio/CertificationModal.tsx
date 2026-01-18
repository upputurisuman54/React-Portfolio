import React, { useState, useEffect, useRef } from 'react';
import { Certification } from '../../context/PortfolioContext';
import { X, Upload, FileText } from 'lucide-react';

interface CertificationModalProps {
  certification: Certification | null;
  onSave: (certification: Omit<Certification, 'id'>) => void;
  onClose: () => void;
}

const CertificationModal: React.FC<CertificationModalProps> = ({ certification, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    date: '',
    file: '/assets/cert-placeholder.pdf',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (certification) {
      setFormData({
        title: certification.title,
        issuer: certification.issuer,
        date: certification.date,
        file: certification.file,
      });
    }
  }, [certification]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Certificate title is required';
    }
    if (!formData.issuer.trim()) {
      newErrors.issuer = 'Issuer is required';
    }
    if (!formData.date.trim()) {
      newErrors.date = 'Date is required';
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

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleFileSelect = (file: File) => {
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF or image file');
      return;
    }

    // Create blob URL for preview (in production, upload to server)
    const fileUrl = URL.createObjectURL(file);
    setFormData(prev => ({ ...prev, file: fileUrl }));

    /*
     * TODO: Replace with server upload for production
     * 
     * async function uploadCertificate(file: File) {
     *   const formData = new FormData();
     *   formData.append('certificate', file);
     *   
     *   const response = await fetch('/api/upload/certificate', {
     *     method: 'POST',
     *     body: formData,
     *     headers: {
     *       'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
     *     }
     *   });
     *   
     *   const { url } = await response.json();
     *   return url;
     * }
     */
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
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto glass-panel p-6 rounded-2xl animate-scale-in">
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
            {certification ? 'Edit Certification' : 'Add Certification'}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-primary mb-2">
              Certificate Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className={`w-full px-4 py-3 rounded-xl bg-background border ${
                errors.title ? 'border-destructive' : 'border-border'
              } focus:border-primary outline-none transition-colors`}
              placeholder="e.g., AWS Solutions Architect"
            />
            {errors.title && (
              <p className="text-destructive text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Issuer */}
          <div>
            <label htmlFor="issuer" className="block text-sm font-medium text-primary mb-2">
              Issuing Organization *
            </label>
            <input
              type="text"
              id="issuer"
              value={formData.issuer}
              onChange={(e) => setFormData(prev => ({ ...prev, issuer: e.target.value }))}
              className={`w-full px-4 py-3 rounded-xl bg-background border ${
                errors.issuer ? 'border-destructive' : 'border-border'
              } focus:border-primary outline-none transition-colors`}
              placeholder="e.g., Amazon Web Services"
            />
            {errors.issuer && (
              <p className="text-destructive text-sm mt-1">{errors.issuer}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-primary mb-2">
              Date Issued *
            </label>
            <input
              type="text"
              id="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className={`w-full px-4 py-3 rounded-xl bg-background border ${
                errors.date ? 'border-destructive' : 'border-border'
              } focus:border-primary outline-none transition-colors`}
              placeholder="e.g., Dec 2024"
            />
            {errors.date && (
              <p className="text-destructive text-sm mt-1">{errors.date}</p>
            )}
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Certificate File (PDF or Image)
            </label>
            <div
              onDrop={handleFileDrop}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onClick={() => fileInputRef.current?.click()}
              className={`
                border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all
                ${isDragging
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50 hover:bg-primary/5'
                }
              `}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,image/*"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                className="hidden"
              />
              
              {formData.file && formData.file !== '/assets/cert-placeholder.pdf' ? (
                <div className="flex items-center justify-center gap-3">
                  <FileText className="w-8 h-8 text-primary" />
                  <span className="text-primary font-medium">File selected</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-10 h-10 text-secondary" />
                  <p className="text-secondary">
                    Click or drag to upload
                  </p>
                  <p className="text-xs text-muted">
                    PDF, PNG, JPG up to 5MB
                  </p>
                </div>
              )}
            </div>
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
              {certification ? 'Save Changes' : 'Add Certification'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CertificationModal;
