// Formatting and validation utilities

import type { HistoryEntry, CalculatorButton } from '@/types';

/**
 * Format expression for display
 */
export function formatExpression(expression: string): string {
  return expression
    .replace(/\*/g, '×')
    .replace(/\//g, '÷')
    .replace(/\^/g, '^')
    .replace(/sqrt/g, '√')
    .replace(/pi/g, 'π')
    .replace(/infinity/gi, '∞');
}

/**
 * Format time for history entries
 */
export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
}

/**
 * Format date for history entries
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/**
 * Validate mathematical expression
 */
export function validateExpression(expression: string): {
  isValid: boolean;
  error?: string;
} {
  if (!expression.trim()) {
    return { isValid: false, error: 'Empty expression' };
  }
  
  // Check for balanced parentheses
  let parenthesesCount = 0;
  for (const char of expression) {
    if (char === '(') parenthesesCount++;
    if (char === ')') parenthesesCount--;
    if (parenthesesCount < 0) {
      return { isValid: false, error: 'Unmatched closing parenthesis' };
    }
  }
  
  if (parenthesesCount > 0) {
    return { isValid: false, error: 'Unmatched opening parenthesis' };
  }
  
  // Check for invalid characters
  const validChars = /^[0-9+\-*/^().a-zA-Z\s]+$/;
  if (!validChars.test(expression)) {
    return { isValid: false, error: 'Invalid characters in expression' };
  }
  
  return { isValid: true };
}

/**
 * Sanitize input for calculator
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[^\d+\-*/^().a-zA-Z\s]/g, '')
    .trim();
}

/**
 * Generate unique ID for history entries
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Format memory value for display
 */
export function formatMemoryValue(value: number): string {
  if (value === 0) return 'M';
  return `M: ${formatNumber(value)}`;
}

/**
 * Format number with thousands separators
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 10,
    useGrouping: true,
  }).format(value);
}

/**
 * Parse number from formatted string
 */
export function parseFormattedNumber(value: string): number {
  return parseFloat(value.replace(/,/g, ''));
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Capitalize first letter of string
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Convert camelCase to Title Case
 */
export function camelToTitle(text: string): string {
  return text
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}
