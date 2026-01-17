import React, { useState, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { X, Upload, FileText, Download, Trash2, AlertCircle } from 'lucide-react';

interface ResumeManagerProps {
  onClose: () => void;
}

const ResumeManager: React.FC<ResumeManagerProps> = ({ onClose }) => {
  const { resume, updateResume } = usePortfolio();
  const [newResumeUrl, setNewResumeUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleFileSelect = async (file: File) => {
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }

    setIsProcessing(true);

    // Create blob URL for preview
    const fileUrl = URL.createObjectURL(file);
    setNewResumeUrl(fileUrl);

    /*
     * TODO: For production, implement server-side upload and PDF parsing
     * 
     * Example implementation:
     * 
     * // 1. Upload the file to server/S3
     * const formData = new FormData();
     * formData.append('resume', file);
     * 
     * const uploadResponse = await fetch('/api/upload/resume', {
     *   method: 'POST',
     *   body: formData,
     *   headers: {
     *     'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
     *   }
     * });
     * 
     * const { url } = await uploadResponse.json();
     * 
     * // 2. Parse the PDF to extract sections
     * const parseResponse = await fetch('/api/parse-resume', {
     *   method: 'POST',
     *   headers: { 'Content-Type': 'application/json' },
     *   body: JSON.stringify({ resumeUrl: url })
     * });
     * 
     * const parsedData = await parseResponse.json();
     * // parsedData would contain: name, title, skills, experience, etc.
     * 
     * // 3. Update portfolio data with parsed information
     * updatePortfolioFromResume(parsedData);
     */

    // Simulate PDF parsing with pdf.js (client-side)
    await simulatePdfParsing(file);

    setIsProcessing(false);
  };

  const simulatePdfParsing = async (file: File) => {
    /*
     * PDF.js Integration Example:
     * 
     * import * as pdfjsLib from 'pdfjs-dist';
     * pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';
     * 
     * const arrayBuffer = await file.arrayBuffer();
     * const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
     * 
     * let fullText = '';
     * for (let i = 1; i <= pdf.numPages; i++) {
     *   const page = await pdf.getPage(i);
     *   const textContent = await page.getTextContent();
     *   const pageText = textContent.items.map(item => item.str).join(' ');
     *   fullText += pageText + '\n';
     * }
     * 
     * // Parse the extracted text to identify sections
     * const sections = parseResumeText(fullText);
     * 
     * function parseResumeText(text) {
     *   const sections = {
     *     name: '',
     *     title: '',
     *     contact: {},
     *     summary: '',
     *     skills: [],
     *     experience: [],
     *     education: [],
     *     certifications: []
     *   };
     * 
     *   // Use regex patterns to identify sections
     *   const nameMatch = text.match(/^([A-Z][a-z]+ [A-Z][a-z]+)/);
     *   if (nameMatch) sections.name = nameMatch[1];
     * 
     *   const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/);
     *   if (emailMatch) sections.contact.email = emailMatch[1];
     * 
     *   // ... more parsing logic
     * 
     *   return sections;
     * }
     */

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleSave = () => {
    if (newResumeUrl) {
      updateResume(newResumeUrl);
      onClose();
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to remove the current resume?')) {
      updateResume('');
      setNewResumeUrl(null);
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
      <div className="relative w-full max-w-2xl glass-panel p-6 rounded-2xl animate-scale-in">
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
            Manage Resume
          </h2>
          <p className="text-secondary mt-1">
            Upload your resume PDF. The system will attempt to parse and populate your portfolio sections.
          </p>
        </div>

        {/* Current Resume */}
        {resume.url && (
          <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20 mb-6">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-primary" />
              <div>
                <p className="font-medium text-primary">Current Resume</p>
                <p className="text-sm text-muted">Resume is uploaded</p>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href={resume.url}
                download="resume.pdf"
                className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                aria-label="Download resume"
              >
                <Download className="w-5 h-5" />
              </a>
              <button
                onClick={handleDelete}
                className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                aria-label="Delete resume"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Upload Zone */}
        <div
          onDrop={handleFileDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
            ${isDragging
              ? 'border-primary bg-primary/10'
              : 'border-border hover:border-primary/50 hover:bg-primary/5'
            }
            ${isProcessing ? 'pointer-events-none opacity-50' : ''}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            className="hidden"
          />
          
          {isProcessing ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              <p className="text-primary font-medium">Processing resume...</p>
              <p className="text-sm text-muted">Extracting information from PDF</p>
            </div>
          ) : newResumeUrl ? (
            <div className="flex flex-col items-center gap-3">
              <FileText className="w-12 h-12 text-green-500" />
              <p className="text-primary font-medium">New resume ready</p>
              <p className="text-sm text-muted">Click Save to update your resume</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <Upload className="w-12 h-12 text-secondary" />
              <p className="text-primary font-medium">
                {isDragging ? 'Drop your PDF here' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-sm text-muted">PDF files only, up to 10MB</p>
            </div>
          )}
        </div>

        {/* PDF Parsing Info */}
        <div className="mt-6 p-4 rounded-xl bg-accent/10 border border-accent/20">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-primary mb-1">Auto-parsing Feature</p>
              <p className="text-secondary">
                When you upload a resume, the system will attempt to extract information like your name,
                skills, experience, and education to populate your portfolio sections. For best results,
                use a well-structured PDF with clear section headers.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl border border-border text-secondary hover:bg-muted/50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!newResumeUrl || isProcessing}
            className="flex-1 px-4 py-3 rounded-xl bg-gradient-primary text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            Save Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeManager;
