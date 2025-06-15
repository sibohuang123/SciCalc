import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { Calculator } from '../Calculator';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Calculator', () => {
  it('renders calculator with display and buttons', () => {
    renderWithTheme(<Calculator />);
    
    // Check if display is present
    expect(screen.getByText('0')).toBeInTheDocument();
    
    // Check if some key buttons are present
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText('=')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('handles number input correctly', () => {
    renderWithTheme(<Calculator />);
    
    // Click number buttons
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('3'));
    
    // Check if display shows the entered number
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  it('handles basic arithmetic operations', () => {
    renderWithTheme(<Calculator />);
    
    // Enter 5 + 3 = 8
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));
    
    // Check if result is displayed
    expect(screen.getByText('8')).toBeInTheDocument();
  });

  it('handles clear function', () => {
    renderWithTheme(<Calculator />);
    
    // Enter some numbers
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('3'));
    
    // Clear
    fireEvent.click(screen.getByText('C'));
    
    // Check if display is reset to 0
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles decimal point input', () => {
    renderWithTheme(<Calculator />);
    
    // Enter 1.5
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('.'));
    fireEvent.click(screen.getByText('5'));
    
    // Check if display shows the decimal number
    expect(screen.getByText('1.5')).toBeInTheDocument();
  });

  it('switches between basic and scientific modes', () => {
    renderWithTheme(<Calculator onModeChange={() => {}} />);
    
    // Check if mode toggle buttons are present
    expect(screen.getByText('Basic')).toBeInTheDocument();
    expect(screen.getByText('Scientific')).toBeInTheDocument();
    
    // Scientific functions should be visible in scientific mode
    expect(screen.getByText('sin')).toBeInTheDocument();
    expect(screen.getByText('cos')).toBeInTheDocument();
    expect(screen.getByText('π')).toBeInTheDocument();
  });
});
