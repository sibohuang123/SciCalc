// Calculator service for mathematical operations

import { evaluate } from 'mathjs';
import type { 
  CalculationResult, 
  CalculationError, 
  OperationType,
  AngleUnit 
} from '@/types';
import { convertAngle, isWithinLimits } from '@/utils';
import { MATHEMATICAL_CONSTANTS, ERROR_MESSAGES } from '@/constants';

export class CalculatorService {
  private angleUnit: AngleUnit = 'degrees';
  private precision: number = 10;

  setAngleUnit(unit: AngleUnit): void {
    this.angleUnit = unit;
  }

  setPrecision(precision: number): void {
    this.precision = Math.max(1, Math.min(15, precision));
  }

  /**
   * Evaluate a mathematical expression
   */
  evaluate(expression: string): CalculationResult {
    try {
      // Sanitize and prepare expression
      const sanitized = this.sanitizeExpression(expression);
      
      // Replace constants
      const withConstants = this.replaceConstants(sanitized);
      
      // Handle angle conversions for trigonometric functions
      const withAngles = this.handleAngleConversions(withConstants);
      
      // Evaluate using math.js
      const result = evaluate(withAngles);
      
      // Validate result
      if (!isFinite(result)) {
        throw new Error(ERROR_MESSAGES.OVERFLOW);
      }
      
      if (!isWithinLimits(result)) {
        throw new Error(ERROR_MESSAGES.OVERFLOW);
      }
      
      return {
        value: result,
        expression: expression,
      };
      
    } catch (error) {
      return {
        value: NaN,
        expression: expression,
        error: this.createError(error),
      };
    }
  }

  /**
   * Perform a basic operation
   */
  performOperation(
    left: number, 
    operation: OperationType, 
    right?: number
  ): CalculationResult {
    try {
      let result: number;
      
      switch (operation) {
        case 'add':
          result = left + (right ?? 0);
          break;
        case 'subtract':
          result = left - (right ?? 0);
          break;
        case 'multiply':
          result = left * (right ?? 1);
          break;
        case 'divide':
          if (right === 0) throw new Error(ERROR_MESSAGES.DIVISION_BY_ZERO);
          result = left / (right ?? 1);
          break;
        case 'power':
          result = Math.pow(left, right ?? 2);
          break;
        case 'modulo':
          if (right === 0) throw new Error(ERROR_MESSAGES.DIVISION_BY_ZERO);
          result = left % (right ?? 1);
          break;
        case 'sqrt':
          if (left < 0) throw new Error(ERROR_MESSAGES.DOMAIN_ERROR);
          result = Math.sqrt(left);
          break;
        case 'cbrt':
          result = Math.cbrt(left);
          break;
        case 'factorial':
          result = this.factorial(left);
          break;
        case 'abs':
          result = Math.abs(left);
          break;
        case 'negate':
          result = -left;
          break;
        case 'reciprocal':
          if (left === 0) throw new Error(ERROR_MESSAGES.DIVISION_BY_ZERO);
          result = 1 / left;
          break;
        default:
          result = this.performTrigOperation(left, operation);
      }
      
      if (!isWithinLimits(result)) {
        throw new Error(ERROR_MESSAGES.OVERFLOW);
      }
      
      return {
        value: result,
        expression: `${operation}(${left}${right !== undefined ? `, ${right}` : ''})`,
      };
      
    } catch (error) {
      return {
        value: NaN,
        expression: `${operation}(${left}${right !== undefined ? `, ${right}` : ''})`,
        error: this.createError(error),
      };
    }
  }

  private performTrigOperation(value: number, operation: OperationType): number {
    // Convert angle to radians for trigonometric functions
    const radians = this.angleUnit === 'radians' ? value : 
                   convertAngle(value, this.angleUnit, 'radians');
    
    switch (operation) {
      case 'sin': return Math.sin(radians);
      case 'cos': return Math.cos(radians);
      case 'tan': return Math.tan(radians);
      case 'asin': 
        if (value < -1 || value > 1) throw new Error(ERROR_MESSAGES.DOMAIN_ERROR);
        return convertAngle(Math.asin(value), 'radians', this.angleUnit);
      case 'acos':
        if (value < -1 || value > 1) throw new Error(ERROR_MESSAGES.DOMAIN_ERROR);
        return convertAngle(Math.acos(value), 'radians', this.angleUnit);
      case 'atan':
        return convertAngle(Math.atan(value), 'radians', this.angleUnit);
      case 'sinh': return Math.sinh(radians);
      case 'cosh': return Math.cosh(radians);
      case 'tanh': return Math.tanh(radians);
      case 'log': return Math.log10(value);
      case 'ln': return Math.log(value);
      case 'log2': return Math.log2(value);
      case 'exp': return Math.exp(value);
      case 'exp10': return Math.pow(10, value);
      default:
        throw new Error(ERROR_MESSAGES.INVALID_OPERATION);
    }
  }

  private factorial(n: number): number {
    if (n < 0 || !Number.isInteger(n)) {
      throw new Error(ERROR_MESSAGES.DOMAIN_ERROR);
    }
    if (n > 170) throw new Error(ERROR_MESSAGES.OVERFLOW);
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }

  private sanitizeExpression(expression: string): string {
    return expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, 'pi')
      .replace(/√/g, 'sqrt');
  }

  private replaceConstants(expression: string): string {
    let result = expression;
    result = result.replace(/\bpi\b/g, MATHEMATICAL_CONSTANTS.PI.toString());
    result = result.replace(/\be\b/g, MATHEMATICAL_CONSTANTS.E.toString());
    result = result.replace(/\bphi\b/g, MATHEMATICAL_CONSTANTS.PHI.toString());
    return result;
  }

  private handleAngleConversions(expression: string): string {
    // This is a simplified version - in a full implementation,
    // we would parse the expression and convert angles for trig functions
    return expression;
  }

  private createError(error: any): CalculationError {
    const message = error instanceof Error ? error.message : String(error);
    
    if (message.includes('divide') || message.includes('zero')) {
      return { type: 'math', message: ERROR_MESSAGES.DIVISION_BY_ZERO };
    }
    if (message.includes('domain') || message.includes('range')) {
      return { type: 'domain', message: ERROR_MESSAGES.DOMAIN_ERROR };
    }
    if (message.includes('overflow') || message.includes('large')) {
      return { type: 'overflow', message: ERROR_MESSAGES.OVERFLOW };
    }
    if (message.includes('syntax')) {
      return { type: 'syntax', message: ERROR_MESSAGES.SYNTAX_ERROR };
    }
    
    return { type: 'math', message: ERROR_MESSAGES.MATH_ERROR };
  }
}

// Export singleton instance
export const calculatorService = new CalculatorService();
