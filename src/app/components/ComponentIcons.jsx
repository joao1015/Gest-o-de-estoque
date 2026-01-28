import React from 'react';

const base = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const Capacitor = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 100 40" style={base}>
    <line x1="5" y1="20" x2="35" y2="20" stroke="currentColor" strokeWidth="6" />
    <line x1="40" y1="5" x2="40" y2="35" stroke="currentColor" strokeWidth="6" />
    <line x1="60" y1="5" x2="60" y2="35" stroke="currentColor" strokeWidth="6" />
    <line x1="65" y1="20" x2="95" y2="20" stroke="currentColor" strokeWidth="6" />
  </svg>
);

export const Resistor = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 100 40" style={base}>
    <polyline
      points="5,20 15,10 25,30 35,10 45,30 55,10 65,30 75,20 95,20"
      stroke="currentColor"
      strokeWidth="6"
      fill="none"
    />
  </svg>
);

export const Inductor = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 100 40" style={base}>
    <path
      d="M5 20 C15 5, 25 5, 35 20
         C45 5, 55 5, 65 20
         C75 5, 85 5, 95 20"
      stroke="currentColor"
      strokeWidth="6"
      fill="none"
    />
  </svg>
);

export const Diode = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 100 40" style={base}>
    <line x1="5" y1="20" x2="35" y2="20" stroke="currentColor" strokeWidth="6" />
    <polygon points="35,5 35,35 65,20" fill="currentColor" />
    <line x1="65" y1="5" x2="65" y2="35" stroke="currentColor" strokeWidth="6" />
    <line x1="65" y1="20" x2="95" y2="20" stroke="currentColor" strokeWidth="6" />
  </svg>
);

export const IC = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 100 60" style={base}>
    <rect x="20" y="10" width="60" height="40" stroke="currentColor" strokeWidth="6" fill="none" />
    <line x1="10" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="5" />
    <line x1="10" y1="40" x2="20" y2="40" stroke="currentColor" strokeWidth="5" />
    <line x1="80" y1="20" x2="90" y2="20" stroke="currentColor" strokeWidth="5" />
    <line x1="80" y1="40" x2="90" y2="40" stroke="currentColor" strokeWidth="5" />
  </svg>
);

export const Transistor = ({ size = 36 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* linha vertical (base) */}
    <line x1="50" y1="20" x2="50" y2="80" />

    {/* base (B) */}
    <line x1="10" y1="50" x2="50" y2="50" />

    {/* coletor (C) */}
    <line x1="50" y1="20" x2="85" y2="10" />

    {/* emissor (E) */}
    <line x1="50" y1="80" x2="85" y2="90" />

    {/* seta do emissor (NPN) */}
    <polygon points="78,82 85,90 76,90" fill="currentColor" />
  </svg>
);



export const Connector = ({ size = 36 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 60"
    fill="currentColor"
  >
    <path d="M10 10 H90 V50 H10 Z" rx="8" />
    <circle cx="25" cy="30" r="5" fill="white" />
    <circle cx="40" cy="30" r="5" fill="white" />
    <circle cx="55" cy="30" r="5" fill="white" />
    <circle cx="70" cy="30" r="5" fill="white" />
  </svg>
);
