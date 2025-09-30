import React, { useState } from 'react';
import { SessionConfig } from '../types/customization';

interface UsernameInputProps {
  onSubmit: (username: string, session?: SessionConfig) => void;
  onCustomize: () => void;
  isLoading: boolean;
  sessionConfig: SessionConfig;
  onSessionChange: (config: SessionConfig) => void;
}

const UsernameInput: React.FC<UsernameInputProps> = ({ 
  onSubmit, 
  onCustomize, 
  isLoading, 
  sessionConfig, 
  onSessionChange 
}) => {
  const [username, setUsername] = useState('');
  const [copied, setCopied] = useState(false);
  const [showSessionOptions, setShowSessionOptions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim(), sessionConfig);
    }
  };
  
  const handleSessionModeChange = (mode: 'titled-tuesday' | 'custom') => {
    if (mode === 'custom' && !sessionConfig.startTime) {
      // Set to current time by default
      onSessionChange({ mode, startTime: Math.floor(Date.now() / 1000) });
    } else if (mode === 'titled-tuesday') {
      onSessionChange({ mode });
    } else {
      onSessionChange({ ...sessionConfig, mode });
    }
  };
  
  const handleTimeChange = (type: 'now' | 'custom', customTime?: string) => {
    if (type === 'now') {
      onSessionChange({ ...sessionConfig, startTime: Math.floor(Date.now() / 1000) });
    } else if (customTime) {
      // Convert local datetime to Unix timestamp
      const timestamp = Math.floor(new Date(customTime).getTime() / 1000);
      onSessionChange({ ...sessionConfig, startTime: timestamp });
    }
  };
  
  const getLocalDateTimeString = () => {
    if (!sessionConfig.startTime) return '';
    const date = new Date(sessionConfig.startTime * 1000);
    // Format for datetime-local input
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2 mb-4">
      <form onSubmit={handleSubmit} className="bg-black/85 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-xl space-y-3">
        {/* Session Mode Selector */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleSessionModeChange('titled-tuesday')}
            className={`flex-1 px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
              sessionConfig.mode === 'titled-tuesday'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Titled Tuesday
          </button>
          <button
            type="button"
            onClick={() => handleSessionModeChange('custom')}
            className={`flex-1 px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
              sessionConfig.mode === 'custom'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Custom Session
          </button>
        </div>

        {/* Custom Session Time Picker */}
        {sessionConfig.mode === 'custom' && (
          <div className="space-y-2">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleTimeChange('now')}
                className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs font-medium rounded transition-colors"
              >
                Start Now
              </button>
              <button
                type="button"
                onClick={() => setShowSessionOptions(!showSessionOptions)}
                className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs font-medium rounded transition-colors"
              >
                {showSessionOptions ? 'Hide' : 'Set Time'}
              </button>
            </div>
            {showSessionOptions && (
              <input
                type="datetime-local"
                value={getLocalDateTimeString()}
                onChange={(e) => handleTimeChange('custom', e.target.value)}
                className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )}
            {sessionConfig.startTime && (
              <div className="text-xs text-gray-400">
                Session starts: {new Date(sessionConfig.startTime * 1000).toLocaleString()}
              </div>
            )}
          </div>
        )}
        
        {/* Username Input */}
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
