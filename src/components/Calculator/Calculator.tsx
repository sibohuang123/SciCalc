import React, { useCallback } from 'react';
import { Box, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Display } from './Display';
import { ButtonGrid } from './ButtonGrid';
import { useCalculator } from '@/hooks';
import type { CalculatorButton, OperationType } from '@/types';
import { MATHEMATICAL_CONSTANTS } from '@/constants';

interface CalculatorProps {
  mode?: 'basic' | 'scientific';
  onModeChange?: (mode: 'basic' | 'scientific') => void;
}

const CalculatorContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 600,
  margin: '0 auto',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[8],
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    borderRadius: theme.spacing(1),
  },
}));

const ModeToggle = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
}));

const CalculatorHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(2),
}));

export const Calculator: React.FC<CalculatorProps> = ({
  mode = 'scientific',
  onModeChange,
}) => {
  const { state, actions } = useCalculator();

  const handleButtonClick = useCallback((button: CalculatorButton) => {
    const { type, value } = button;

    switch (type) {
      case 'number':
        if (value === '.') {
          // Handle decimal point
          if (!state.display.includes('.')) {
            actions.inputNumber(value);
          }
        } else {
          actions.inputNumber(value);
        }
        break;

      case 'operation':
        if (value === 'equals') {
          actions.calculate();
        } else if (value === 'negate') {
          const currentValue = parseFloat(state.display);
          actions.updateDisplay((-currentValue).toString());
        } else if (value === 'percent') {
          const currentValue = parseFloat(state.display);
          actions.updateDisplay((currentValue / 100).toString());
        } else {
          actions.inputOperation(value as OperationType);
        }
        break;

      case 'function':
        if (value === 'square') {
          const currentValue = parseFloat(state.display);
          const result = Math.pow(currentValue, 2);
          actions.updateDisplay(result.toString());
        } else if (value === 'reciprocal') {
          const currentValue = parseFloat(state.display);
          if (currentValue !== 0) {
            const result = 1 / currentValue;
            actions.updateDisplay(result.toString());
          } else {
            actions.updateDisplay('Error');
          }
        } else {
          // Handle other functions through the operation system
          actions.inputOperation(value as OperationType);
        }
        break;

      case 'constant':
        if (value === 'pi') {
          actions.updateDisplay(MATHEMATICAL_CONSTANTS.PI.toString());
        } else if (value === 'e') {
          actions.updateDisplay(MATHEMATICAL_CONSTANTS.E.toString());
        }
        break;

      case 'memory':
        switch (value) {
          case 'memoryStore':
            actions.memoryStore();
            break;
          case 'memoryRecall':
            actions.memoryRecall();
            break;
          case 'memoryClear':
            actions.memoryClear();
            break;
          case 'memoryAdd':
            actions.memoryAdd();
            break;
          case 'memorySubtract':
            actions.memorySubtract();
            break;
        }
        break;

      case 'control':
        switch (value) {
          case 'clear':
            actions.clear();
            break;
          case 'clearEntry':
            actions.clearEntry();
            break;
          case 'backspace':
            actions.backspace();
            break;
        }
        break;
    }
  }, [state.display, actions]);

  const handleModeChange = useCallback(
    (_: React.MouseEvent<HTMLElement>, newMode: 'basic' | 'scientific' | null) => {
      if (newMode && onModeChange) {
        onModeChange(newMode);
      }
    },
    [onModeChange]
  );

  return (
    <CalculatorContainer elevation={8}>
      <CalculatorHeader>
        <Typography variant="h4" component="h1" gutterBottom>
          SciCalc
        </Typography>
        
        {onModeChange && (
          <ModeToggle>
            <ToggleButtonGroup
              value={mode}
              exclusive
              onChange={handleModeChange}
              aria-label="calculator mode"
              size="small"
            >
              <ToggleButton value="basic" aria-label="basic mode">
                Basic
              </ToggleButton>
              <ToggleButton value="scientific" aria-label="scientific mode">
                Scientific
              </ToggleButton>
            </ToggleButtonGroup>
          </ModeToggle>
        )}
      </CalculatorHeader>

      <Display
        value={state.display}
        expression={state.operation ? `${state.previousValue} ${state.operation}` : undefined}
        memory={state.memory}
      />

      <ButtonGrid
        mode={mode}
        onButtonClick={handleButtonClick}
      />
    </CalculatorContainer>
  );
};

export default Calculator;
