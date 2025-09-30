import React, { useState } from 'react';
import { CustomizationOptions, DEFAULT_CUSTOMIZATION } from '../types/customization';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (options: CustomizationOptions) => void;
  currentOptions: CustomizationOptions;
}

const CustomizeModal: React.FC<CustomizeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentOptions,
}) => {
  const [options, setOptions] = useState<CustomizationOptions>(currentOptions);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(options);
    onClose();
  };

  const handleReset = () => {
    setOptions(DEFAULT_CUSTOMIZATION);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#1f2937',
          padding: '24px',
          borderRadius: '12px',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '80vh',
          overflowY: 'auto',
          color: '#ffffff',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: '600' }}>
          Customize Widget
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Background Color */}
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>
              Background Color (Chroma Key)
            </label>
            <input
              type="color"
              value={options.bgColor}
              onChange={(e) => setOptions({ ...options, bgColor: e.target.value })}
              style={{ width: '100%', height: '40px', cursor: 'pointer' }}
            />
          </div>

          {/* Text Color */}
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>
              Text Color
            </label>
            <input
              type="color"
              value={options.textColor}
              onChange={(e) => setOptions({ ...options, textColor: e.target.value })}
              style={{ width: '100%', height: '40px', cursor: 'pointer' }}
            />
          </div>

          {/* Box Background Color */}
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>
              Box Background Color
            </label>
            <input
              type="color"
              value={options.boxBgColor.replace('rgba(0, 0, 0, 0.85)', '#000000')}
              onChange={(e) => setOptions({ ...options, boxBgColor: `${e.target.value}dd` })}
              style={{ width: '100%', height: '40px', cursor: 'pointer' }}
            />
          </div>

          {/* Win Color */}
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>
              Win Color (Green)
            </label>
            <input
              type="color"
              value={options.winColor}
              onChange={(e) => setOptions({ ...options, winColor: e.target.value })}
              style={{ width: '100%', height: '40px', cursor: 'pointer' }}
            />
          </div>

          {/* Loss Color */}
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>
              Loss Color (Red)
            </label>
            <input
              type="color"
              value={options.lossColor}
              onChange={(e) => setOptions({ ...options, lossColor: e.target.value })}
              style={{ width: '100%', height: '40px', cursor: 'pointer' }}
            />
          </div>

          {/* Draw Color */}
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>
              Draw Color (Gray)
            </label>
            <input
              type="color"
              value={options.drawColor}
              onChange={(e) => setOptions({ ...options, drawColor: e.target.value })}
              style={{ width: '100%', height: '40px', cursor: 'pointer' }}
            />
          </div>

          {/* None Color */}
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>
              Not Played Color (Dark Gray)
            </label>
            <input
              type="color"
              value={options.noneColor}
              onChange={(e) => setOptions({ ...options, noneColor: e.target.value })}
              style={{ width: '100%', height: '40px', cursor: 'pointer' }}
            />
          </div>

          {/* Font Size */}
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>
              Font Size
            </label>
            <select
              value={options.fontSize}
              onChange={(e) => setOptions({ ...options, fontSize: e.target.value })}
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: '#374151',
                color: '#ffffff',
                border: '1px solid #4b5563',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
          <button
            onClick={handleReset}
            style={{
              flex: 1,
              padding: '10px',
              backgroundColor: '#4b5563',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Reset to Default
          </button>
          <button
            onClick={handleSave}
            style={{
              flex: 1,
              padding: '10px',
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Save & Apply
          </button>
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: '12px',
            width: '100%',
            padding: '10px',
            backgroundColor: 'transparent',
            color: '#9ca3af',
            border: '1px solid #4b5563',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CustomizeModal;
