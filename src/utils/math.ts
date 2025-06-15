// Mathematical utility functions

import { ANGLE_CONVERSIONS, CALCULATOR_LIMITS } from '@/constants';
import type { AngleUnit, NumberSystem } from '@/types';

/**
 * Convert angle from one unit to another
 */
export function convertAngle(value: number, from: AngleUnit, to: AngleUnit): number {
  if (from === to) return value;
  
  // Convert to radians first
  let radians: number;
  switch (from) {
    case 'degrees':
      radians = value * ANGLE_CONVERSIONS.DEG_TO_RAD;
      break;
    case 'gradians':
      radians = value * ANGLE_CONVERSIONS.GRAD_TO_RAD;
      break;
    default:
      radians = value;
  }
  
  // Convert from radians to target unit
  switch (to) {
    case 'degrees':
      return radians * ANGLE_CONVERSIONS.RAD_TO_DEG;
    case 'gradians':
      return radians * ANGLE_CONVERSIONS.RAD_TO_GRAD;
    default:
      return radians;
  }
}

/**
 * Convert number between different number systems
 */
export function convertNumberSystem(
  value: string,
  from: NumberSystem,
  to: NumberSystem
): string {
  if (from === to) return value;
  
  // Convert to decimal first
  const decimal = parseInt(value, getBase(from));
  if (isNaN(decimal)) throw new Error('Invalid number format');
  
  // Convert to target base
  return decimal.toString(getBase(to)).toUpperCase();
}

function getBase(system: NumberSystem): number {
  switch (system) {
    case 'binary': return 2;
    case 'octal': return 8;
    case 'decimal': return 10;
    case 'hexadecimal': return 16;
    default: return 10;
  }
}

/**
 * Format number for display with proper precision
 */
export function formatNumber(value: number, precision: number = 10): string {
  if (!isFinite(value)) {
    if (isNaN(value)) return 'Error';
    return value > 0 ? 'Infinity' : '-Infinity';
  }
  
  // Handle very small numbers
  if (Math.abs(value) < CALCULATOR_LIMITS.EPSILON) {
    return '0';
  }
  
  // Use scientific notation for very large or very small numbers
  if (Math.abs(value) >= 1e10 || (Math.abs(value) < 1e-4 && value !== 0)) {
    return value.toExponential(precision);
  }
  
  // Regular formatting
  const formatted = value.toPrecision(precision);
  return parseFloat(formatted).toString();
}

/**
 * Check if a number is within calculator limits
 */
export function isWithinLimits(value: number): boolean {
  return value >= CALCULATOR_LIMITS.MIN_VALUE && value <= CALCULATOR_LIMITS.MAX_VALUE;
}

/**
 * Safe division that handles division by zero
 */
export function safeDivide(a: number, b: number): number {
  if (Math.abs(b) < CALCULATOR_LIMITS.EPSILON) {
    throw new Error('Division by zero');
  }
  return a / b;
}

/**
 * Calculate factorial
 */
export function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error('Factorial is only defined for non-negative integers');
  }
  if (n > 170) {
    throw new Error('Factorial overflow');
  }
  
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * Calculate percentage
 */
export function percentage(value: number, percent: number): number {
  return (value * percent) / 100;
}

/**
 * Round to specified decimal places
 */
export function roundToPrecision(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
