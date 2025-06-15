// Calculator button configurations

import type { CalculatorButton } from '@/types';

export const CALCULATOR_BUTTONS: CalculatorButton[] = [
  // Row 1: Memory and Clear functions
  { id: 'mc', label: 'MC', value: 'memoryClear', type: 'memory', category: 'basic', shortcut: 'Ctrl+L', description: 'Memory Clear' },
  { id: 'mr', label: 'MR', value: 'memoryRecall', type: 'memory', category: 'basic', shortcut: 'Ctrl+R', description: 'Memory Recall' },
  { id: 'ms', label: 'MS', value: 'memoryStore', type: 'memory', category: 'basic', shortcut: 'Ctrl+S', description: 'Memory Store' },
  { id: 'm+', label: 'M+', value: 'memoryAdd', type: 'memory', category: 'basic', shortcut: 'Ctrl+P', description: 'Memory Add' },
  { id: 'm-', label: 'M-', value: 'memorySubtract', type: 'memory', category: 'basic', shortcut: 'Ctrl+M', description: 'Memory Subtract' },
  
  // Row 2: Advanced functions
  { id: 'sin', label: 'sin', value: 'sin', type: 'function', category: 'scientific', description: 'Sine' },
  { id: 'cos', label: 'cos', value: 'cos', type: 'function', category: 'scientific', description: 'Cosine' },
  { id: 'tan', label: 'tan', value: 'tan', type: 'function', category: 'scientific', description: 'Tangent' },
  { id: 'log', label: 'log', value: 'log', type: 'function', category: 'scientific', description: 'Logarithm base 10' },
  { id: 'ln', label: 'ln', value: 'ln', type: 'function', category: 'scientific', description: 'Natural logarithm' },
  
  // Row 3: More functions
  { id: 'asin', label: 'sin⁻¹', value: 'asin', type: 'function', category: 'scientific', description: 'Arcsine' },
  { id: 'acos', label: 'cos⁻¹', value: 'acos', type: 'function', category: 'scientific', description: 'Arccosine' },
  { id: 'atan', label: 'tan⁻¹', value: 'atan', type: 'function', category: 'scientific', description: 'Arctangent' },
  { id: 'exp', label: 'eˣ', value: 'exp', type: 'function', category: 'scientific', description: 'Exponential' },
  { id: 'pow10', label: '10ˣ', value: 'exp10', type: 'function', category: 'scientific', description: '10 to the power of x' },
  
  // Row 4: Constants and roots
  { id: 'pi', label: 'π', value: 'pi', type: 'constant', category: 'scientific', description: 'Pi constant' },
  { id: 'e', label: 'e', value: 'e', type: 'constant', category: 'scientific', description: 'Euler\'s number' },
  { id: 'sqrt', label: '√', value: 'sqrt', type: 'function', category: 'scientific', description: 'Square root' },
  { id: 'cbrt', label: '∛', value: 'cbrt', type: 'function', category: 'scientific', description: 'Cube root' },
  { id: 'factorial', label: 'x!', value: 'factorial', type: 'function', category: 'scientific', description: 'Factorial' },
  
  // Row 5: Control functions
  { id: 'clear', label: 'C', value: 'clear', type: 'control', category: 'basic', shortcut: 'Escape', description: 'Clear all' },
  { id: 'clearEntry', label: 'CE', value: 'clearEntry', type: 'control', category: 'basic', shortcut: 'Delete', description: 'Clear entry' },
  { id: 'backspace', label: '⌫', value: 'backspace', type: 'control', category: 'basic', shortcut: 'Backspace', description: 'Backspace' },
  { id: 'negate', label: '±', value: 'negate', type: 'operation', category: 'basic', description: 'Change sign' },
  { id: 'percent', label: '%', value: 'percent', type: 'operation', category: 'basic', shortcut: '%', description: 'Percent' },
  
  // Row 6: Basic operations
  { id: 'reciprocal', label: '1/x', value: 'reciprocal', type: 'function', category: 'basic', description: 'Reciprocal' },
  { id: 'power', label: 'xʸ', value: 'power', type: 'operation', category: 'basic', shortcut: '^', description: 'Power' },
  { id: 'square', label: 'x²', value: 'square', type: 'function', category: 'basic', description: 'Square' },
  { id: 'divide', label: '÷', value: 'divide', type: 'operation', category: 'basic', shortcut: '/', description: 'Division' },
  
  // Row 7: Numbers and operations
  { id: '7', label: '7', value: '7', type: 'number', category: 'basic', shortcut: '7', description: 'Seven' },
  { id: '8', label: '8', value: '8', type: 'number', category: 'basic', shortcut: '8', description: 'Eight' },
  { id: '9', label: '9', value: '9', type: 'number', category: 'basic', shortcut: '9', description: 'Nine' },
  { id: 'multiply', label: '×', value: 'multiply', type: 'operation', category: 'basic', shortcut: '*', description: 'Multiplication' },
  
  // Row 8: Numbers and operations
  { id: '4', label: '4', value: '4', type: 'number', category: 'basic', shortcut: '4', description: 'Four' },
  { id: '5', label: '5', value: '5', type: 'number', category: 'basic', shortcut: '5', description: 'Five' },
  { id: '6', label: '6', value: '6', type: 'number', category: 'basic', shortcut: '6', description: 'Six' },
  { id: 'subtract', label: '−', value: 'subtract', type: 'operation', category: 'basic', shortcut: '-', description: 'Subtraction' },
  
  // Row 9: Numbers and operations
  { id: '1', label: '1', value: '1', type: 'number', category: 'basic', shortcut: '1', description: 'One' },
  { id: '2', label: '2', value: '2', type: 'number', category: 'basic', shortcut: '2', description: 'Two' },
  { id: '3', label: '3', value: '3', type: 'number', category: 'basic', shortcut: '3', description: 'Three' },
  { id: 'add', label: '+', value: 'add', type: 'operation', category: 'basic', shortcut: '+', description: 'Addition' },
  
  // Row 10: Zero, decimal, and equals
  { id: '0', label: '0', value: '0', type: 'number', category: 'basic', shortcut: '0', description: 'Zero' },
  { id: 'decimal', label: '.', value: '.', type: 'number', category: 'basic', shortcut: '.', description: 'Decimal point' },
  { id: 'equals', label: '=', value: 'equals', type: 'operation', category: 'basic', shortcut: 'Enter', description: 'Equals' },
];

// Button layout for different screen sizes
export const BUTTON_LAYOUTS = {
  BASIC: [
    ['clear', 'clearEntry', 'backspace', 'divide'],
    ['7', '8', '9', 'multiply'],
    ['4', '5', '6', 'subtract'],
    ['1', '2', '3', 'add'],
    ['0', 'decimal', 'equals'],
  ],
  
  SCIENTIFIC: [
    ['mc', 'mr', 'ms', 'm+', 'm-'],
    ['sin', 'cos', 'tan', 'log', 'ln'],
    ['asin', 'acos', 'atan', 'exp', 'pow10'],
    ['pi', 'e', 'sqrt', 'cbrt', 'factorial'],
    ['clear', 'clearEntry', 'backspace', 'negate', 'percent'],
    ['reciprocal', 'power', 'square', 'divide'],
    ['7', '8', '9', 'multiply'],
    ['4', '5', '6', 'subtract'],
    ['1', '2', '3', 'add'],
    ['0', 'decimal', 'equals'],
  ],
} as const;
