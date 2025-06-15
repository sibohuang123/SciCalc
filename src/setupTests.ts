import '@testing-library/jest-dom';

// Mock plotly.js for tests
jest.mock('plotly.js', () => ({
  newPlot: jest.fn(),
  react: jest.fn(),
  purge: jest.fn(),
  redraw: jest.fn(),
  relayout: jest.fn(),
  restyle: jest.fn(),
}));

// Mock react-plotly.js
jest.mock('react-plotly.js', () => {
  return function MockPlot() {
    return <div data-testid="mock-plot" />;
  };
});

// Global test utilities
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
