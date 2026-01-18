import React, { useState, useRef, useCallback } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { X, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';

interface ProfileUploaderProps {
  onClose: () => void;
}

const ProfileUploader: React.FC<ProfileUploaderProps> = ({ onClose }) => {
  const { profile, updateProfilePhoto } = usePortfolio();
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    /*
     * TODO: In production, upload to server/S3
     * Example implementation:
     * 
     * const formData = new FormData();
     * formData.append('photo', file);
     * 
     * const response = await fetch('/api/profile/photo', {
     *   method: 'POST',
     *   body: formData,
     *   headers: {
     *     'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
     *   }
     * });
     * 
     * const { url } = await response.json();
     * updateProfilePhoto(url);
     */
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleSave = () => {
    if (preview) {
      // Store as base64 in localStorage (for demo)
      // In production, this would be the uploaded URL
      updateProfilePhoto(preview);
      onClose();
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-uploader-title"
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
          <h2 id="profile-uploader-title" className="text-2xl font-bold text-primary">
            Update Profile Photo
          </h2>
          <p className="text-secondary mt-1">
            Upload a new profile photo. Recommended size: 400x400px
          </p>
        </div>

        {/* Current Photo Preview */}
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden glass-panel">
            <img
              src={preview || profile.photo}
              alt="Profile preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/assets/profile-placeholder.jpg';
              }}
            />
          </div>
        </div>

        {/* Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
            transition-all duration-300
            ${isDragging
              ? 'border-primary bg-primary/10'
              : 'border-border hover:border-primary/50 hover:bg-primary/5'
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            aria-label="Select profile photo"
          />
          
          <div className="flex flex-col items-center gap-3">
            {isDragging ? (
              <Upload className="w-12 h-12 text-primary animate-bounce" />
            ) : (
              <ImageIcon className="w-12 h-12 text-secondary" />
            )}
            <div>
              <p className="text-primary font-medium">
                {isDragging ? 'Drop your image here' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-sm text-muted mt-1">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          {preview && (
            <button
              onClick={handleRemove}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-destructive text-destructive hover:bg-destructive/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg border border-border text-secondary hover:bg-muted/50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!preview}
            className="flex-1 px-4 py-2 rounded-lg bg-gradient-primary text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            Save Photo
          </button>
        </div>

        {/* Crop Suggestion */}
        <p className="text-sm text-muted mt-4 text-center">
          💡 Tip: For best results, use a square image with your face centered.
          Consider using a tool like{' '}
          <a href="https://crop-circle.imageonline.co/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            crop-circle.imageonline.co
          </a>{' '}
          to crop your photo into a circle before uploading.
        </p>
      </div>
    </div>
  );
};

export default ProfileUploader;
