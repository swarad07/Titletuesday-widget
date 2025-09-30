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
    <form onSubmit={handleSubmit} style={{
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      padding: '16px 20px',
      borderRadius: '8px',
      marginBottom: '12px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    }}>
      <div style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
      }}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Chess.com username"
          disabled={isLoading}
          style={{
            flex: 1,
            padding: '8px 12px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '4px',
            color: '#ffffff',
            fontSize: '14px',
            outline: 'none',
            fontFamily: 'inherit',
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !username.trim()}
          style={{
            padding: '8px 16px',
            backgroundColor: isLoading || !username.trim() ? '#4b5563' : '#3b82f6',
            border: 'none',
            borderRadius: '4px',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: '600',
            cursor: isLoading || !username.trim() ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s',
          }}
        >
          {isLoading ? 'Loading...' : 'Load'}
        </button>
        <button
          type="button"
          onClick={onCustomize}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6366f1',
            border: 'none',
            borderRadius: '4px',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
        >
          Customize
        </button>
      </div>
    </form>
  );
};

export default UsernameInput;
