// Calculator constants

export const MATHEMATICAL_CONSTANTS = {
  PI: Math.PI,
  E: Math.E,
  PHI: (1 + Math.sqrt(5)) / 2, // Golden ratio
  SQRT2: Math.SQRT2,
  SQRT1_2: Math.SQRT1_2,
  LN2: Math.LN2,
  LN10: Math.LN10,
  LOG2E: Math.LOG2E,
  LOG10E: Math.LOG10E,
} as const;

export const PHYSICAL_CONSTANTS = {
  SPEED_OF_LIGHT: 299792458, // m/s
  PLANCK_CONSTANT: 6.62607015e-34, // J⋅s
  BOLTZMANN_CONSTANT: 1.380649e-23, // J/K
  AVOGADRO_NUMBER: 6.02214076e23, // mol⁻¹
  ELEMENTARY_CHARGE: 1.602176634e-19, // C
  GRAVITATIONAL_CONSTANT: 6.67430e-11, // m³⋅kg⁻¹⋅s⁻²
} as const;

export const ANGLE_CONVERSIONS = {
  DEG_TO_RAD: Math.PI / 180,
  RAD_TO_DEG: 180 / Math.PI,
  GRAD_TO_RAD: Math.PI / 200,
  RAD_TO_GRAD: 200 / Math.PI,
  DEG_TO_GRAD: 10 / 9,
  GRAD_TO_DEG: 9 / 10,
} as const;

export const NUMBER_SYSTEM_BASES = {
  binary: 2,
  octal: 8,
  decimal: 10,
  hexadecimal: 16,
} as const;

export const CALCULATOR_LIMITS = {
  MAX_DISPLAY_DIGITS: 15,
  MAX_PRECISION: 15,
  MAX_HISTORY_ENTRIES: 50,
  MAX_VARIABLES: 26, // A-Z
  MIN_VALUE: -1e308,
  MAX_VALUE: 1e308,
  EPSILON: Number.EPSILON,
} as const;

export const OPERATION_PRECEDENCE = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '%': 2,
  '^': 3,
  '**': 3,
  'unary+': 4,
  'unary-': 4,
  '!': 5,
} as const;

export const FUNCTION_CATEGORIES = {
  BASIC: ['add', 'subtract', 'multiply', 'divide', 'power', 'sqrt'],
  TRIGONOMETRIC: ['sin', 'cos', 'tan', 'asin', 'acos', 'atan'],
  HYPERBOLIC: ['sinh', 'cosh', 'tanh', 'asinh', 'acosh', 'atanh'],
  LOGARITHMIC: ['log', 'ln', 'log2', 'log10', 'exp', 'exp10'],
  STATISTICAL: ['mean', 'median', 'mode', 'std', 'variance'],
  ADVANCED: ['factorial', 'gamma', 'beta', 'erf', 'erfc'],
} as const;

export const ERROR_MESSAGES = {
  DIVISION_BY_ZERO: 'Cannot divide by zero',
  INVALID_INPUT: 'Invalid input',
  SYNTAX_ERROR: 'Syntax error',
  MATH_ERROR: 'Mathematical error',
  OVERFLOW: 'Number too large',
  UNDERFLOW: 'Number too small',
  DOMAIN_ERROR: 'Input outside function domain',
  UNDEFINED_VARIABLE: 'Undefined variable',
  INVALID_OPERATION: 'Invalid operation',
} as const;
