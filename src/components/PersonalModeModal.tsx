import React, { useState } from 'react';
import { Crown, X, Eye, EyeOff } from 'lucide-react';

interface PersonalModeModalProps {
  onAuthenticate: (success: boolean) => void;
  onCancel: () => void;
}

export const PersonalModeModal: React.FC<PersonalModeModalProps> = ({
  onAuthenticate,
  onCancel,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple password check - in a real app, this would be more secure
    if (password === 'willpro2025') {
      onAuthenticate(true);
    } else {
      setError('Invalid password. Please try again.');
      onAuthenticate(false);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-300 dark:border-gray-600 rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#ffcc00] rounded-full flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Activate Personal Mode
            </h3>
          </div>
          <button
            onClick={onCancel}
            className="p-2 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors"
            style={{ outline: 'none', boxShadow: 'none' }}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Enter your password to access Personal Mode with enhanced features and personalized settings.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white backdrop-blur-md placeholder-gray-500 dark:placeholder-gray-400"
              style={{ outline: 'none', boxShadow: 'none' }}
              placeholder="Enter password..."
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              style={{ outline: 'none', boxShadow: 'none' }}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          
          {error && (
            <p className="text-red-600 dark:text-red-400 text-sm mb-4">
              {error}
            </p>
          )}
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-500/80 hover:bg-gray-600/80 text-white rounded-lg transition-colors backdrop-blur-md"
              style={{ outline: 'none', boxShadow: 'none' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!password.trim() || isLoading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#ffcc00] hover:bg-[#ffcc00]/90 disabled:bg-gray-400/80 disabled:cursor-not-allowed text-white rounded-lg transition-colors backdrop-blur-md"
              style={{ outline: 'none', boxShadow: 'none' }}
            >
              <Crown className="w-4 h-4" />
              {isLoading ? 'Activating...' : 'Activate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};