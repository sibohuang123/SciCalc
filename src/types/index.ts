// Main types export file
export * from './calculator';
export * from './graph';

// Common UI types
export interface Theme {
  mode: 'light' | 'dark';
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  error: string;
  warning: string;
  success: string;
}

export interface AppSettings {
  theme: Theme;
  language: string;
  precision: number;
  angleUnit: 'degrees' | 'radians' | 'gradians';
  numberSystem: 'decimal' | 'binary' | 'octal' | 'hexadecimal';
  autoSave: boolean;
  soundEnabled: boolean;
  animations: boolean;
}

export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  action: string;
  description: string;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
  timestamp: Date;
}

// Navigation types
export type ViewMode = 'calculator' | 'graph' | 'settings' | 'history';

export interface NavigationState {
  currentView: ViewMode;
  previousView: ViewMode | null;
  sidebarOpen: boolean;
  fullscreen: boolean;
}
