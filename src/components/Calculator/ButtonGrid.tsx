import React, { useCallback, useEffect } from 'react';
import { Box, Grid, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Button } from '@/components/UI';
import { CALCULATOR_BUTTONS, BUTTON_LAYOUTS } from '@/constants';
import type { CalculatorButton } from '@/types';

interface ButtonGridProps {
  onButtonClick: (button: CalculatorButton) => void;
  mode?: 'basic' | 'scientific';
  disabled?: boolean;
}

const GridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[2],
}));

const getButtonVariant = (type: CalculatorButton['type']) => {
  switch (type) {
    case 'number':
      return 'number';
    case 'operation':
      return 'operation';
    case 'function':
    case 'constant':
      return 'function';
    case 'memory':
      return 'function';
    case 'control':
      return 'clear';
    default:
      return 'number';
  }
};

const getGridTemplateColumns = (layout: string[][], isSmallScreen: boolean) => {
  const cols = layout[0]?.length || 4;
  if (isSmallScreen) {
    return `repeat(${cols}, 1fr)`;
  }
  return `repeat(${cols}, minmax(80px, 1fr))`;
};

const getGridTemplateRows = (layout: string[][], isSmallScreen: boolean) => {
  const rows = layout.length;
  const minHeight = isSmallScreen ? '60px' : '80px';
  return `repeat(${rows}, ${minHeight})`;
};

export const ButtonGrid: React.FC<ButtonGridProps> = ({
  onButtonClick,
  mode = 'scientific',
  disabled = false,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Use basic layout on very small screens
  const currentMode = isExtraSmall ? 'basic' : mode;
  const layout = BUTTON_LAYOUTS[currentMode.toUpperCase() as keyof typeof BUTTON_LAYOUTS];
  
  // Create button lookup map
  const buttonMap = React.useMemo(() => {
    const map = new Map<string, CalculatorButton>();
    CALCULATOR_BUTTONS.forEach(button => {
      map.set(button.id, button);
    });
    return map;
  }, []);

  // Handle keyboard input
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (disabled) return;
    
    const key = event.key;
    const ctrlKey = event.ctrlKey;
    const shiftKey = event.shiftKey;
    
    // Find button by shortcut
    const button = CALCULATOR_BUTTONS.find(btn => {
      if (!btn.shortcut) return false;
      
      // Handle special key combinations
      if (btn.shortcut.includes('Ctrl+')) {
        const shortcutKey = btn.shortcut.replace('Ctrl+', '');
        return ctrlKey && key.toLowerCase() === shortcutKey.toLowerCase();
      }
      
      // Handle special keys
      if (btn.shortcut === 'Enter' && key === 'Enter') return true;
      if (btn.shortcut === 'Escape' && key === 'Escape') return true;
      if (btn.shortcut === 'Backspace' && key === 'Backspace') return true;
      if (btn.shortcut === 'Delete' && key === 'Delete') return true;
      
      // Handle regular keys
      return key === btn.shortcut;
    });
    
    if (button) {
      event.preventDefault();
      onButtonClick(button);
    }
  }, [disabled, onButtonClick]);

  // Set up keyboard event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleButtonClick = useCallback((buttonId: string) => {
    if (disabled) return;
    
    const button = buttonMap.get(buttonId);
    if (button) {
      onButtonClick(button);
    }
  }, [disabled, buttonMap, onButtonClick]);

  return (
    <GridContainer
      sx={{
        gridTemplateColumns: getGridTemplateColumns(layout, isSmallScreen),
        gridTemplateRows: getGridTemplateRows(layout, isSmallScreen),
        maxWidth: isExtraSmall ? '100%' : currentMode === 'basic' ? '400px' : '500px',
        margin: '0 auto',
      }}
    >
      {layout.flat().map((buttonId, index) => {
        const button = buttonMap.get(buttonId);
        if (!button) return null;

        // Special handling for zero button in basic mode
        const isZeroInBasic = buttonId === '0' && currentMode === 'basic';
        
        return (
          <Button
            key={`${buttonId}-${index}`}
            variant={getButtonVariant(button.type)}
            onClick={() => handleButtonClick(buttonId)}
            disabled={disabled}
            title={button.description}
            sx={{
              fontSize: isSmallScreen ? '1rem' : '1.1rem',
              fontWeight: button.type === 'operation' ? 600 : 500,
              minHeight: isSmallScreen ? 60 : 80,
              // Special styling for zero button in basic mode
              ...(isZeroInBasic && {
                gridColumn: 'span 2',
              }),
              // Special styling for equals button
              ...(buttonId === 'equals' && currentMode === 'basic' && {
                gridRow: 'span 2',
              }),
              // Responsive font size adjustments
              [theme.breakpoints.down('sm')]: {
                fontSize: '0.9rem',
                minHeight: 50,
              },
            }}
          >
            {button.label}
          </Button>
        );
      })}
    </GridContainer>
  );
};

export default ButtonGrid;
