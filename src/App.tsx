import { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { AppLayout } from '@/components/Layout';
import { Calculator } from '@/components/Calculator';
import type { ViewMode } from '@/types';

function App() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [calculatorMode, setCalculatorMode] = useState<'basic' | 'scientific'>('scientific');
  const [currentView] = useState<ViewMode>('calculator');

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: themeMode === 'light' ? '#1976d2' : '#90caf9',
      },
      secondary: {
        main: themeMode === 'light' ? '#dc004e' : '#f48fb1',
      },
      background: {
        default: themeMode === 'light' ? '#ffffff' : '#121212',
        paper: themeMode === 'light' ? '#f5f5f5' : '#1e1e1e',
      },
      text: {
        primary: themeMode === 'light' ? '#000000' : '#ffffff',
      },
      error: {
        main: themeMode === 'light' ? '#f44336' : '#cf6679',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
    },
  });

  const handleToggleTheme = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleToggleMenu = () => {
    // TODO: Implement menu toggle for future features
    console.log('Menu toggle clicked');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'calculator':
        return (
          <Calculator
            mode={calculatorMode}
            onModeChange={setCalculatorMode}
          />
        );
      case 'graph':
        // TODO: Implement graph view
        return <Box>Graph view coming soon...</Box>;
      case 'settings':
        // TODO: Implement settings view
        return <Box>Settings view coming soon...</Box>;
      case 'history':
        // TODO: Implement history view
        return <Box>History view coming soon...</Box>;
      default:
        return (
          <Calculator
            mode={calculatorMode}
            onModeChange={setCalculatorMode}
          />
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppLayout
        onToggleTheme={handleToggleTheme}
        onToggleMenu={handleToggleMenu}
        title="SciCalc - Scientific Calculator"
      >
        {renderCurrentView()}
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;
