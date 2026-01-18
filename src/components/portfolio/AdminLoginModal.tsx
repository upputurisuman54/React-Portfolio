import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { X, Lock, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const { toggleAdminMode } = usePortfolio();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    /*
     * TODO: Replace with secure authentication
     * Example implementation:
     * 
     * const response = await fetch('/api/auth/login', {
     *   method: 'POST',
     *   headers: { 'Content-Type': 'application/json' },
     *   body: JSON.stringify({ password }),
     * });
     * 
     * if (response.ok) {
     *   const { token } = await response.json();
     *   localStorage.setItem('auth_token', token);
     *   toggleAdminMode(true);
     *   onClose();
     * } else {
     *   setError('Invalid password');
     * }
     */

    const success = toggleAdminMode(password);
    
    if (success) {
      setPassword('');
      onClose();
    } else {
      setError('Invalid password. Please try again.');
    }

    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-login-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md glass-panel p-6 rounded-2xl animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-primary/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-secondary" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 id="admin-login-title" className="text-2xl font-bold text-primary">
            Admin Access
          </h2>
          <p className="text-secondary mt-2">
            Enter the admin password to manage your portfolio
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Password Input */}
          <div>
            <label htmlFor="admin-password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="admin-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-primary placeholder:text-muted"
              autoFocus
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-primary text-white font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {isLoading ? 'Verifying...' : 'Login'}
          </button>
        </form>

        {/* Hint */}
        <p className="text-center text-muted text-sm mt-4">
          Demo password: <code className="px-2 py-1 rounded bg-muted/50">admin123</code>
        </p>

        {/* Security Notice */}
        <div className="mt-4 p-3 rounded-lg bg-accent/10 text-sm text-secondary">
          <strong>Security Note:</strong> In production, implement proper authentication
          using JWT tokens, OAuth, or session-based auth with secure password hashing.
        </div>
      </div>
    </div>
  );
};

export default AdminLoginModal;
