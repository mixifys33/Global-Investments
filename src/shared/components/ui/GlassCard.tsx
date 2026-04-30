"use client";

import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'dark' | 'light';
  animated?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '',
  variant = 'default',
  animated = true
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'dark':
        return 'bg-black/30 border-white/10';
      case 'light':
        return 'bg-white/20 border-white/30';
      default:
        return 'bg-black/20 border-white/10';
    }
  };

  const animationClass = animated ? 'animate-gradient-border' : '';

  return (
    <div className={`backdrop-blur-xl shadow-2xl rounded-2xl border relative overflow-hidden ${getVariantClasses()} ${className}`}>
      {/* Animated border glow */}
      {animated && (
        <>
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 ${animationClass}`}></div>
          <div className={`absolute inset-[1px] rounded-2xl backdrop-blur-xl ${getVariantClasses().split(' ')[0]}`}></div>
        </>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;