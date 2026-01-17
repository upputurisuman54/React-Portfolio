import React, { useState } from 'react';
import { usePortfolio, Certification } from '../../context/PortfolioContext';
import { Award, Plus, Edit, Trash2, Download, Eye, X } from 'lucide-react';
import CertificationModal from './CertificationModal';

const Certifications: React.FC = () => {
  const { certifications, isAdminMode, addCertification, updateCertification, deleteCertification } = usePortfolio();
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lightboxCert, setLightboxCert] = useState<Certification | null>(null);

  const handleAddCertification = () => {
    setEditingCertification(null);
    setIsModalOpen(true);
  };

  const handleEditCertification = (cert: Certification) => {
    setEditingCertification(cert);
    setIsModalOpen(true);
  };

  const handleSaveCertification = (certData: Omit<Certification, 'id'>) => {
    if (editingCertification) {
      updateCertification(editingCertification.id, certData);
    } else {
      addCertification(certData);
    }
    setIsModalOpen(false);
    setEditingCertification(null);
  };

  const handleDeleteCertification = (id: string) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      deleteCertification(id);
    }
  };

  return (
    <section
      id="certifications"
      className="py-20 relative"
      aria-labelledby="certifications-heading"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-radial from-accent/10 to-transparent rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">Achievements</p>
          <h2
            id="certifications-heading"
            className="section-title"
          >
            Certifications
          </h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            Professional certifications and achievements
          </p>
          
          {/* Admin Add Button */}
          {isAdminMode && (
            <button
              onClick={handleAddCertification}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary text-white font-medium hover:opacity-90 transition-opacity animate-fade-up"
            >
              <Plus className="w-5 h-5" />
              Add Certification
            </button>
          )}
        </div>

        {/* Certifications Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="glass-panel p-6 rounded-2xl hover-lift group animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Certificate Thumbnail */}
              {cert.file && (cert.file.endsWith('.jpeg') || cert.file.endsWith('.jpg') || cert.file.endsWith('.png')) ? (
                <div className="w-full h-32 rounded-xl overflow-hidden mb-4 bg-white">
                  <img 
                    src={cert.file} 
                    alt={`${cert.title} certificate`}
                    className="w-full h-full object-cover brightness-110 contrast-105 group-hover:scale-105 transition-transform"
                  />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-7 h-7 text-white" />
                </div>
              )}

              {/* Category Badge */}
              {(cert as any).category && (
                <span className="inline-block px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs font-semibold mb-2">
                  {(cert as any).category}
                </span>
              )}

              {/* Content */}
              <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-2">
                {cert.title}
              </h3>
              <p className="text-foreground/80 text-sm font-medium mb-2">
                {cert.issuer}
              </p>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                {cert.date}
              </span>

              {/* Actions */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                <button
                  onClick={() => setLightboxCert(cert)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                  aria-label="View certificate"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <a
                  href={cert.file}
                  download
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted/50 transition-colors"
                  aria-label="Download certificate"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>

              {/* Admin Actions */}
              {isAdminMode && (
                <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditCertification(cert)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg hover:bg-primary/10 text-foreground/70 hover:text-primary text-sm transition-colors"
                    aria-label="Edit certification"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCertification(cert.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg hover:bg-destructive/10 text-foreground/70 hover:text-destructive text-sm transition-colors"
                    aria-label="Delete certification"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {certifications.length === 0 && (
          <div className="text-center py-16">
            <p className="text-foreground/70 text-lg font-medium">No certifications added yet.</p>
            {isAdminMode && (
              <button
                onClick={handleAddCertification}
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary text-white font-medium hover:opacity-90 transition-opacity"
              >
                <Plus className="w-5 h-5" />
                Add Your First Certification
              </button>
            )}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxCert && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setLightboxCert(null)}
          />
          <div className="relative w-full max-w-4xl max-h-[90vh] glass-panel rounded-2xl overflow-hidden animate-scale-in">
            <button
              onClick={() => setLightboxCert(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-2">{lightboxCert.title}</h3>
              <p className="text-foreground/80 font-medium mb-4">{lightboxCert.issuer} • {lightboxCert.date}</p>
              <div className="bg-white rounded-xl overflow-hidden">
                {lightboxCert.file && (lightboxCert.file.endsWith('.jpeg') || lightboxCert.file.endsWith('.jpg') || lightboxCert.file.endsWith('.png')) ? (
                  <img 
                    src={lightboxCert.file} 
                    alt={`${lightboxCert.title} certificate`}
                    className="w-full h-auto max-h-[60vh] object-contain brightness-110 contrast-105"
                  />
                ) : (
                  <div className="p-8 text-center bg-muted/30">
                    <Award className="w-24 h-24 mx-auto text-primary/30 mb-4" />
                    <p className="text-foreground/60 font-medium">
                      Certificate file available for download.
                    </p>
                  </div>
                )}
              </div>
              <div className="flex gap-3 mt-4 justify-center">
                <a
                  href={lightboxCert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary text-primary font-medium hover:bg-primary/10 transition-colors"
                >
                  <Eye className="w-5 h-5" />
                  View Full Size
                </a>
                <a
                  href={lightboxCert.file}
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary text-white font-medium hover:opacity-90 transition-opacity"
                >
                  <Download className="w-5 h-5" />
                  Download Certificate
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certification Modal */}
      {isModalOpen && (
        <CertificationModal
          certification={editingCertification}
          onSave={handleSaveCertification}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCertification(null);
          }}
        />
      )}
    </section>
  );
};

export default Certifications;
