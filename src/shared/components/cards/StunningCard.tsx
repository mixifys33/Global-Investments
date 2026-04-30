"use client";

import React from 'react';

interface StunningCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'neon' | 'gradient' | 'cosmic' | 'premium';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  glowing?: boolean;
  floating?: boolean;
  className?: string;
  onClick?: () => void;
}

const StunningCard: React.FC<StunningCardProps> = ({ 
  children, 
  variant = 'default',
  size = 'md',
  animated = true,
  glowing = false,
  floating = false,
  className = '',
  onClick
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'p-4';
      case 'md': return 'p-6';
      case 'lg': return 'p-8';
      case 'xl': return 'p-10';
      default: return 'p-6';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'glass':
        return 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl';
      case 'neon':
        return 'bg-gradient-to-br from-purple-900/80 to-blue-900/80 backdrop-blur-xl border-2 border-cyan-400/50 shadow-2xl shadow-cyan-400/20';
      case 'gradient':
        return 'bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/30 shadow-2xl';
      case 'cosmic':
        return 'bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-pink-900/80 backdrop-blur-xl border border-purple-400/30 shadow-2xl shadow-purple-400/20';
      case 'premium':
        return 'bg-gradient-to-br from-yellow-400/10 via-orange-400/10 to-red-400/10 backdrop-blur-xl border-2 border-yellow-400/30 shadow-2xl shadow-yellow-400/20';
      default:
        return 'bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl';
    }
  };

  const getAnimationClasses = () => {
    let classes = '';
    if (animated) classes += ' transition-all duration-300 transform hover:scale-[1.02]';
    if (glowing) classes += ' animate-glow-pulse';
    if (floating) classes += ' animate-float';
    return classes;
  };

  const cardClasses = `
    rounded-2xl overflow-hidden relative group cursor-pointer
    ${getSizeClasses()}
    ${getVariantClasses()}
    ${getAnimationClasses()}
    ${className}
  `;

  return (
    <div className={cardClasses} onClick={onClick}>
      {/* Animated background effects */}
      {animated && (
        <>
          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/10 group-hover:via-purple-400/10 group-hover:to-pink-400/10 transition-all duration-500 rounded-2xl"></div>
          
          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-4 left-4 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
            <div className="absolute top-6 right-6 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-4 left-6 w-1 h-1 bg-pink-400 rounded-full animate-ping delay-500"></div>
          </div>
        </>
      )}

      {/* Neon border animation for neon variant */}
      {variant === 'neon' && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 animate-gradient-border"></div>
      )}

      {/* Premium shine effect */}
      {variant === 'premium' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default StunningCard;