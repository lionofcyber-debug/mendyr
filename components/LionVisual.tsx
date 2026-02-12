
import React from 'react';
import { COLORS } from '../constants';

export const LionVisual: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center py-8">
      {/* Glow effect background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="w-48 h-48 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: COLORS.gold }}></div>
      </div>
      
      {/* Symbolic Guardian Lion Head (SVG) */}
      <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 drop-shadow-2xl animate-gold-pulse">
        {/* Main Head Structure */}
        <path d="M50 10L65 25V40L80 50L75 70L50 90L25 70L20 50L35 40V25L50 10Z" fill="#1a222f" stroke={COLORS.gold} strokeWidth="2" />
        
        {/* Eyes */}
        <path d="M40 45L45 42L48 45H40Z" fill={COLORS.goldLight} />
        <path d="M60 45L55 42L52 45H60Z" fill={COLORS.goldLight} />
        
        {/* Mane Details */}
        <path d="M35 25L25 35M65 25L75 35M20 50L10 60M80 50L90 60" stroke={COLORS.gold} strokeWidth="1" strokeDasharray="2 2" />
        
        {/* Core Jewel */}
        <circle cx="50" cy="55" r="3" fill={COLORS.gold} className="animate-pulse" />
        
        {/* Decorative Circuit Lines */}
        <path d="M30 75L50 85L70 75" stroke={COLORS.gold} strokeWidth="1" opacity="0.5" />
      </svg>
      
      {/* Status Indicators */}
      <div className="absolute bottom-4 flex gap-4 text-[10px] orbitron text-gray-400">
        <span className="flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-green-500 animate-ping"></span>
          24/7 ACTIVE
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-gold-accent" style={{ backgroundColor: COLORS.gold }}></span>
          SENTINEL MODE
        </span>
      </div>
    </div>
  );
};
