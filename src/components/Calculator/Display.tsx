import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { formatExpression } from '@/utils';

interface DisplayProps {
  value: string;
  expression?: string;
  error?: string;
  memory?: number;
}

const DisplayContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#f8f9fa',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1),
  minHeight: 120,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const ExpressionText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.9rem',
  fontFamily: 'monospace',
  textAlign: 'right',
  minHeight: '1.2em',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

const ValueText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '2rem',
  fontFamily: 'monospace',
  fontWeight: 500,
  textAlign: 'right',
  minHeight: '2.5rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  lineHeight: 1.2,
}));

const ErrorText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: '1rem',
  fontFamily: 'monospace',
  textAlign: 'right',
  fontWeight: 500,
}));

const MemoryIndicator = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  left: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: '2px 6px',
  borderRadius: theme.spacing(0.5),
  fontSize: '0.7rem',
  fontWeight: 'bold',
}));

export const Display: React.FC<DisplayProps> = ({
  value,
  expression,
  error,
  memory,
}) => {
  const displayValue = error || value || '0';
  const isError = Boolean(error);
  
  return (
    <DisplayContainer elevation={1}>
      {memory !== undefined && memory !== 0 && (
        <MemoryIndicator>M</MemoryIndicator>
      )}
      
      <Box>
        {expression && !isError && (
          <ExpressionText variant="body2">
            {formatExpression(expression)}
          </ExpressionText>
        )}
      </Box>
      
      <Box>
        {isError ? (
          <ErrorText>
            {error}
          </ErrorText>
        ) : (
          <ValueText>
            {formatExpression(displayValue)}
          </ValueText>
        )}
      </Box>
    </DisplayContainer>
  );
};

export default Display;
