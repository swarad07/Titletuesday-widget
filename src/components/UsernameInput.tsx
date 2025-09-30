import React, { useState } from 'react';

interface UsernameInputProps {
  onSubmit: (username: string) => void;
  onCustomize: () => void;
  isLoading: boolean;
}

const UsernameInput: React.FC<UsernameInputProps> = ({ onSubmit, onCustomize, isLoading }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <div className="space-y-3 mb-4">
      <form onSubmit={handleSubmit} className="bg-black/85 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Chess.com username"
            disabled={isLoading}
            className="flex-1 bg-white/10 border border-white/30 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          />
          <button
            type="submit"
            disabled={isLoading || !username.trim()}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-all shadow-lg disabled:shadow-none hover:shadow-blue-600/50"
          >
            {isLoading ? 'Loading...' : 'Load'}
          </button>
        </div>
      </form>
      
      <button
        type="button"
        onClick={onCustomize}
        className="w-full px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-semibold rounded-lg transition-all shadow-lg hover:shadow-indigo-600/50 flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        Customize Widget
      </button>
    </div>
  );
};

export default UsernameInput;
