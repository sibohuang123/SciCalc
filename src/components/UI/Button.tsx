import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface CalculatorButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'number' | 'operation' | 'function' | 'equals' | 'clear';
  gridArea?: string;
}

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'gridArea',
})<{ gridArea?: string }>(({ theme, gridArea }) => ({
  gridArea,
  minHeight: 60,
  fontSize: '1.1rem',
  fontWeight: 500,
  borderRadius: theme.spacing(1),
  transition: 'all 0.2s ease-in-out',
  
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: theme.shadows[4],
  },
  
  '&:active': {
    transform: 'translateY(0)',
    boxShadow: theme.shadows[2],
  },
}));

const getButtonStyles = (variant: CalculatorButtonProps['variant'], theme: any) => {
  switch (variant) {
    case 'number':
      return {
        backgroundColor: theme.palette.grey[100],
        color: theme.palette.text.primary,
        '&:hover': {
          backgroundColor: theme.palette.grey[200],
        },
      };
    case 'operation':
      return {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      };
    case 'function':
      return {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.secondary.dark,
        },
      };
    case 'equals':
      return {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.success.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.success.dark,
        },
      };
    case 'clear':
      return {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.error.dark,
        },
      };
    default:
      return {};
  }
};

export const Button: React.FC<CalculatorButtonProps> = ({
  variant = 'number',
  gridArea,
  children,
  sx,
  ...props
}) => {
  return (
    <StyledButton
      gridArea={gridArea}
      sx={(theme) => ({
        ...getButtonStyles(variant, theme),
        ...sx,
      })}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
