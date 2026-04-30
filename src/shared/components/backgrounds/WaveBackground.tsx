"use client";

import React from 'react';

interface WaveBackgroundProps {
  children: React.ReactNode;
  variant?: 'default' | 'dark' | 'light';
  showParticles?: boolean;
}

const WaveBackground: React.FC<WaveBackgroundProps> = ({ 
  children, 
  variant = 'default',
  showParticles = true 
}) => {
  const getGradientClass = () => {
    switch (variant) {
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900';
      case 'light':
        return 'bg-gradient-to-br from-blue-50 via-purple-50 to-green-50';
      default:
        return 'bg-gradient-to-br from-purple-900 via-blue-900 to-green-900';
    }
  };

  const getWaveColors = () => {
    switch (variant) {
      case 'dark':
        return {
          wave1: 'rgba(30, 58, 138, 0.3)',
          wave2: 'rgba(67, 56, 202, 0.2)', 
          wave3: 'rgba(17, 24, 39, 0.1)'
        };
      case 'light':
        return {
          wave1: 'rgba(59, 130, 246, 0.2)',
          wave2: 'rgba(147, 51, 234, 0.15)',
          wave3: 'rgba(34, 197, 94, 0.1)'
        };
      default:
        return {
          wave1: 'rgba(59, 130, 246, 0.3)',
          wave2: 'rgba(147, 51, 234, 0.2)',
          wave3: 'rgba(34, 197, 94, 0.1)'
        };
    }
  };

  const waveColors = getWaveColors();

  return (
    <div className={`relative overflow-hidden ${getGradientClass()}`}>
      {/* Moving Wave Background */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`wave-gradient-1-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={waveColors.wave1} />
              <stop offset="50%" stopColor="rgba(147, 51, 234, 0.3)" />
              <stop offset="100%" stopColor="rgba(34, 197, 94, 0.3)" />
            </linearGradient>
            <linearGradient id={`wave-gradient-2-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={waveColors.wave2} />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.2)" />
              <stop offset="100%" stopColor="rgba(147, 51, 234, 0.2)" />
            </linearGradient>
            <linearGradient id={`wave-gradient-3-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={waveColors.wave3} />
              <stop offset="50%" stopColor="rgba(34, 197, 94, 0.1)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
            </linearGradient>
          </defs>
          
          {/* Wave 1 */}
          <path 
            d="M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z" 
            fill={`url(#wave-gradient-1-${variant})`}
            className="animate-wave-1"
          />
          
          {/* Wave 2 */}
          <path 
            d="M0,500 C400,400 800,600 1200,500 L1200,800 L0,800 Z" 
            fill={`url(#wave-gradient-2-${variant})`}
            className="animate-wave-2"
          />
          
          {/* Wave 3 */}
          <path 
            d="M0,600 C200,550 800,650 1200,600 L1200,800 L0,800 Z" 
            fill={`url(#wave-gradient-3-${variant})`}
            className="animate-wave-3"
          />
        </svg>
        
        {/* Floating particles */}
        {showParticles && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-float opacity-60"></div>
            <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-float-reverse opacity-40"></div>
            <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-float opacity-50 delay-300"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-pulse opacity-70"></div>
            <div className="absolute bottom-1/3 right-10 w-2 h-2 bg-pink-400 rounded-full animate-float opacity-30 delay-500"></div>
            <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-50 delay-700"></div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default WaveBackground;