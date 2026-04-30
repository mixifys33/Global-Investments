"use client";

import React from 'react';

interface StunningLayoutProps {
  children: React.ReactNode;
  variant?: 'default' | 'hero' | 'dark' | 'light' | 'gradient' | 'cosmic';
  showParticles?: boolean;
  showWaves?: boolean;
  showOrbs?: boolean;
  className?: string;
}

const StunningLayout: React.FC<StunningLayoutProps> = ({ 
  children, 
  variant = 'default',
  showParticles = true,
  showWaves = true,
  showOrbs = true,
  className = ''
}) => {
  const getBackgroundClass = () => {
    switch (variant) {
      case 'hero':
        return 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900';
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900';
      case 'light':
        return 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50';
      case 'gradient':
        return 'bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900';
      case 'cosmic':
        return 'bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900';
      default:
        return 'bg-gradient-to-br from-purple-900 via-blue-900 to-green-900';
    }
  };

  const getWaveColors = () => {
    switch (variant) {
      case 'hero':
        return {
          wave1: 'rgba(99, 102, 241, 0.4)',
          wave2: 'rgba(147, 51, 234, 0.3)',
          wave3: 'rgba(236, 72, 153, 0.2)',
          wave4: 'rgba(59, 130, 246, 0.15)'
        };
      case 'dark':
        return {
          wave1: 'rgba(30, 58, 138, 0.4)',
          wave2: 'rgba(67, 56, 202, 0.3)',
          wave3: 'rgba(17, 24, 39, 0.2)',
          wave4: 'rgba(55, 65, 81, 0.15)'
        };
      case 'light':
        return {
          wave1: 'rgba(59, 130, 246, 0.3)',
          wave2: 'rgba(147, 51, 234, 0.2)',
          wave3: 'rgba(236, 72, 153, 0.15)',
          wave4: 'rgba(99, 102, 241, 0.1)'
        };
      case 'gradient':
        return {
          wave1: 'rgba(16, 185, 129, 0.4)',
          wave2: 'rgba(20, 184, 166, 0.3)',
          wave3: 'rgba(6, 182, 212, 0.2)',
          wave4: 'rgba(14, 165, 233, 0.15)'
        };
      case 'cosmic':
        return {
          wave1: 'rgba(139, 92, 246, 0.4)',
          wave2: 'rgba(147, 51, 234, 0.3)',
          wave3: 'rgba(217, 70, 239, 0.2)',
          wave4: 'rgba(168, 85, 247, 0.15)'
        };
      default:
        return {
          wave1: 'rgba(59, 130, 246, 0.6)',
          wave2: 'rgba(147, 51, 234, 0.4)',
          wave3: 'rgba(34, 197, 94, 0.3)',
          wave4: 'rgba(255, 215, 0, 0.2)'
        };
    }
  };

  const waveColors = getWaveColors();
  const gradientId = `${variant}-gradient`;

  return (
    <div className={`relative min-h-screen overflow-hidden ${getBackgroundClass()} ${className}`}>
      {/* Animated Wave Background */}
      {showWaves && (
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`${gradientId}-wave-1`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={waveColors.wave1} />
                <stop offset="33%" stopColor={waveColors.wave2} />
                <stop offset="66%" stopColor={waveColors.wave3} />
                <stop offset="100%" stopColor={waveColors.wave4} />
              </linearGradient>
              <linearGradient id={`${gradientId}-wave-2`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={waveColors.wave2} />
                <stop offset="33%" stopColor={waveColors.wave3} />
                <stop offset="66%" stopColor={waveColors.wave4} />
                <stop offset="100%" stopColor={waveColors.wave1} />
              </linearGradient>
              <linearGradient id={`${gradientId}-wave-3`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={waveColors.wave3} />
                <stop offset="33%" stopColor={waveColors.wave4} />
                <stop offset="66%" stopColor={waveColors.wave1} />
                <stop offset="100%" stopColor={waveColors.wave2} />
              </linearGradient>
              <linearGradient id={`${gradientId}-wave-4`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={waveColors.wave4} />
                <stop offset="33%" stopColor={waveColors.wave1} />
                <stop offset="66%" stopColor={waveColors.wave2} />
                <stop offset="100%" stopColor={waveColors.wave3} />
              </linearGradient>
            </defs>
            
            {/* Wave Layers */}
            <path 
              d="M0,400 C300,200 600,600 1200,400 L1200,800 L0,800 Z" 
              fill={`url(#${gradientId}-wave-1)`}
              className="animate-wave-1"
            />
            <path 
              d="M0,500 C400,300 800,700 1200,500 L1200,800 L0,800 Z" 
              fill={`url(#${gradientId}-wave-2)`}
              className="animate-wave-2"
            />
            <path 
              d="M0,600 C200,400 800,800 1200,600 L1200,800 L0,800 Z" 
              fill={`url(#${gradientId}-wave-3)`}
              className="animate-wave-3"
            />
            <path 
              d="M0,350 C500,150 700,550 1200,350 L1200,800 L0,800 Z" 
              fill={`url(#${gradientId}-wave-4)`}
              className="animate-wave-1"
              style={{ animationDelay: '1s' }}
            />
          </svg>
        </div>
      )}

      {/* Floating Orbs */}
      {showOrbs && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-float blur-xl"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-float-reverse blur-xl delay-300"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full animate-float blur-xl delay-500"></div>
          <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full animate-pulse blur-xl delay-700"></div>
          <div className="absolute bottom-1/4 right-20 w-36 h-36 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full animate-float-reverse blur-xl delay-1000"></div>
        </div>
      )}

      {/* Enhanced Floating Particles */}
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-3 h-3 bg-blue-400 rounded-full animate-float opacity-80 shadow-lg"></div>
          <div className="absolute top-40 right-20 w-4 h-4 bg-purple-400 rounded-full animate-float-reverse opacity-60 shadow-lg"></div>
          <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-float opacity-70 delay-300 shadow-lg"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-90 shadow-lg"></div>
          <div className="absolute bottom-1/3 right-10 w-3 h-3 bg-pink-400 rounded-full animate-float opacity-50 delay-500 shadow-lg"></div>
          <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-70 delay-700 shadow-lg"></div>
          <div className="absolute top-60 right-1/2 w-2 h-2 bg-orange-400 rounded-full animate-float opacity-60 delay-1000 shadow-lg"></div>
          <div className="absolute bottom-40 left-1/2 w-3 h-3 bg-indigo-400 rounded-full animate-float-reverse opacity-50 delay-1200 shadow-lg"></div>
          <div className="absolute top-80 left-3/4 w-2 h-2 bg-emerald-400 rounded-full animate-pulse opacity-80 delay-1500 shadow-lg"></div>
          <div className="absolute bottom-60 right-3/4 w-3 h-3 bg-rose-400 rounded-full animate-float opacity-60 delay-1800 shadow-lg"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default StunningLayout;