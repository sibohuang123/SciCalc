// UI and theming constants

export const THEMES = {
  LIGHT: {
    mode: 'light' as const,
    primary: '#1976d2',
    secondary: '#dc004e',
    background: '#ffffff',
    surface: '#f5f5f5',
    text: '#000000',
    error: '#f44336',
    warning: '#ff9800',
    success: '#4caf50',
  },
  DARK: {
    mode: 'dark' as const,
    primary: '#90caf9',
    secondary: '#f48fb1',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    error: '#cf6679',
    warning: '#ffb74d',
    success: '#81c784',
  },
} as const;

export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const BUTTON_SIZES = {
  small: {
    width: 48,
    height: 48,
    fontSize: 14,
  },
  medium: {
    width: 64,
    height: 64,
    fontSize: 16,
  },
  large: {
    width: 80,
    height: 80,
    fontSize: 18,
  },
} as const;

export const ANIMATION_DURATIONS = {
  short: 150,
  medium: 300,
  long: 500,
} as const;

export const Z_INDEX = {
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
} as const;

export const KEYBOARD_SHORTCUTS = [
  { key: 'Enter', action: 'calculate', description: 'Calculate result' },
  { key: 'Escape', action: 'clear', description: 'Clear display' },
  { key: 'Backspace', action: 'backspace', description: 'Delete last character' },
  { key: 'Delete', action: 'clearEntry', description: 'Clear current entry' },
  { key: '+', action: 'add', description: 'Addition' },
  { key: '-', action: 'subtract', description: 'Subtraction' },
  { key: '*', action: 'multiply', description: 'Multiplication' },
  { key: '/', action: 'divide', description: 'Division' },
  { key: '^', action: 'power', description: 'Power' },
  { key: 's', ctrlKey: true, action: 'save', description: 'Save to memory' },
  { key: 'r', ctrlKey: true, action: 'recall', description: 'Recall from memory' },
  { key: 'h', ctrlKey: true, action: 'history', description: 'Show history' },
  { key: 'g', ctrlKey: true, action: 'graph', description: 'Open graph view' },
  { key: 't', ctrlKey: true, action: 'toggleTheme', description: 'Toggle theme' },
] as const;

export const VIEW_MODES = {
  CALCULATOR: 'calculator',
  GRAPH: 'graph',
  SETTINGS: 'settings',
  HISTORY: 'history',
} as const;

export const GRAPH_COLORS = [
  '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
  '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf',
] as const;
