import React, { useState } from 'react';

interface UsernameInputProps {
  onSubmit: (username: string) => void;
  onCustomize: () => void;
  isLoading: boolean;
}

const UsernameInput: React.FC<UsernameInputProps> = ({ 
  onSubmit, 
  onCustomize, 
  isLoading
}) => {
  const [username, setUsername] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2 mb-4">
      <form onSubmit={handleSubmit} className="bg-black/85 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-xl space-y-3">
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
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {isLoading ? 'Loading...' : 'Load'}
          </button>
        </div>
      </form>
      
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onCustomize}
          className="flex-1 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Customize
        </button>
        <button
          type="button"
          onClick={handleCopyUrl}
          className={`px-4 py-2.5 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${
            copied ? 'bg-green-700' : 'bg-gray-800 hover:bg-gray-700'
          }`}
          title="Copy widget URL"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy URL
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default UsernameInput;
