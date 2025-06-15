// Main constants export file
export * from './calculator';
export * from './ui';

// Application metadata
export const APP_INFO = {
  name: 'SciCalc',
  version: '1.0.0',
  description: 'Advanced Scientific Graphing Calculator',
  author: 'SciCalc Team',
  repository: 'https://github.com/sibohuang123/SciCalc',
  license: 'MIT',
} as const;

// Feature flags
export const FEATURES = {
  GRAPHING_2D: true,
  GRAPHING_3D: true,
  MATRIX_OPERATIONS: true,
  COMPLEX_NUMBERS: true,
  EQUATION_SOLVER: true,
  STATISTICS: true,
  UNIT_CONVERSION: true,
  CUSTOM_FUNCTIONS: true,
  CLOUD_SYNC: false, // Future feature
  COLLABORATION: false, // Future feature
} as const;

// API endpoints (for future cloud features)
export const API_ENDPOINTS = {
  BASE_URL: process.env.VITE_API_BASE_URL || 'http://localhost:3001',
  AUTH: '/auth',
  CALCULATIONS: '/calculations',
  GRAPHS: '/graphs',
  SETTINGS: '/settings',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  CALCULATOR_STATE: 'scicalc_calculator_state',
  SETTINGS: 'scicalc_settings',
  HISTORY: 'scicalc_history',
  VARIABLES: 'scicalc_variables',
  CUSTOM_FUNCTIONS: 'scicalc_custom_functions',
  THEME: 'scicalc_theme',
} as const;
