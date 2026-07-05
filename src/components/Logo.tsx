import React from 'react';
// @ts-ignore
import flexirentLogo from '../assets/images/flexirent_logo_1783269752000.jpg';

interface LogoProps {
  className?: string;
  showText?: boolean;
  textColor?: string;
}

export default function Logo({ className = "h-10", showText = true, textColor }: LogoProps) {
  return (
    <div className={`flex items-center space-x-2.5 select-none ${className}`}>
      {/* Visual Icon with dynamic glowing and gradient paths */}
      <div className="relative shrink-0 flex items-center justify-center">
        {/* Glow behind the logo */}
        <div className="absolute inset-0 bg-blue-500/10 dark:bg-yellow-500/5 blur-md rounded-full pointer-events-none" />
        
        <img
          src={flexirentLogo}
          alt="Flexirent Logo"
          className="h-8 w-8 md:h-10 md:w-10 rounded-full border border-yellow-500/30 dark:border-yellow-400/40 shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-sans font-black text-lg md:text-xl tracking-tight leading-none ${textColor || "text-slate-900 dark:text-white"}`}>
            Flexi<span className="text-blue-600 dark:text-yellow-400 font-black">Rent</span>
          </span>
          <span className="text-[7.5px] font-mono font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase mt-0.5 leading-none">
            RWANDA MOBILITY
          </span>
        </div>
      )}
    </div>
  );
}
