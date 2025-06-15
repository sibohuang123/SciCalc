// Core calculator types

export type OperationType = 
  | 'add' | 'subtract' | 'multiply' | 'divide' | 'power' | 'modulo'
  | 'sin' | 'cos' | 'tan' | 'asin' | 'acos' | 'atan'
  | 'sinh' | 'cosh' | 'tanh'
  | 'log' | 'ln' | 'log2' | 'log10'
  | 'exp' | 'exp10' | 'sqrt' | 'cbrt' | 'factorial'
  | 'abs' | 'ceil' | 'floor' | 'round'
  | 'negate' | 'reciprocal' | 'percent';

export type NumberSystem = 'decimal' | 'binary' | 'octal' | 'hexadecimal';

export type AngleUnit = 'degrees' | 'radians' | 'gradians';

export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: OperationType | null;
  waitingForOperand: boolean;
  memory: number;
  history: HistoryEntry[];
  variables: Record<string, number>;
  angleUnit: AngleUnit;
  numberSystem: NumberSystem;
  precision: number;
}

export interface HistoryEntry {
  id: string;
  expression: string;
  result: number;
  timestamp: Date;
}

export interface CalculatorButton {
  id: string;
  label: string;
  value: string | OperationType;
  type: 'number' | 'operation' | 'function' | 'constant' | 'memory' | 'control';
  category?: 'basic' | 'scientific' | 'advanced';
  shortcut?: string;
  description?: string;
}

export interface MemoryState {
  value: number;
  operations: MemoryOperation[];
}

export interface MemoryOperation {
  type: 'store' | 'recall' | 'add' | 'subtract' | 'clear';
  value: number;
  timestamp: Date;
}

export interface CalculationError {
  type: 'syntax' | 'math' | 'overflow' | 'underflow' | 'domain';
  message: string;
  position?: number;
}

export interface ExpressionToken {
  type: 'number' | 'operator' | 'function' | 'variable' | 'constant' | 'parenthesis';
  value: string;
  position: number;
}

export interface CalculationResult {
  value: number;
  expression: string;
  steps?: string[];
  error?: CalculationError;
}
