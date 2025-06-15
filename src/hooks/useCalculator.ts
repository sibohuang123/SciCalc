import { useState, useCallback } from 'react';
import type { CalculatorState, OperationType, HistoryEntry } from '@/types';
import { calculatorService } from '@/services';
import { generateId } from '@/utils';

const initialState: CalculatorState = {
  display: '0',
  previousValue: null,
  operation: null,
  waitingForOperand: false,
  memory: 0,
  history: [],
  variables: {},
  angleUnit: 'degrees',
  numberSystem: 'decimal',
  precision: 10,
};

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>(initialState);

  const updateDisplay = useCallback((value: string) => {
    setState(prev => ({ ...prev, display: value }));
  }, []);

  const inputNumber = useCallback((num: string) => {
    setState(prev => {
      if (prev.waitingForOperand) {
        return {
          ...prev,
          display: num,
          waitingForOperand: false,
        };
      }
      
      const newDisplay = prev.display === '0' ? num : prev.display + num;
      return { ...prev, display: newDisplay };
    });
  }, []);

  const inputOperation = useCallback((nextOperation: OperationType) => {
    setState(prev => {
      const inputValue = parseFloat(prev.display);
      
      if (prev.previousValue === null) {
        return {
          ...prev,
          previousValue: inputValue,
          operation: nextOperation,
          waitingForOperand: true,
        };
      }
      
      if (prev.operation && !prev.waitingForOperand) {
        const result = calculatorService.performOperation(
          prev.previousValue,
          prev.operation,
          inputValue
        );
        
        if (result.error) {
          return {
            ...prev,
            display: result.error.message,
            previousValue: null,
            operation: null,
            waitingForOperand: true,
          };
        }
        
        return {
          ...prev,
          display: result.value.toString(),
          previousValue: result.value,
          operation: nextOperation,
          waitingForOperand: true,
        };
      }
      
      return {
        ...prev,
        operation: nextOperation,
        waitingForOperand: true,
      };
    });
  }, []);

  const calculate = useCallback(() => {
    setState(prev => {
      if (prev.operation && prev.previousValue !== null) {
        const inputValue = parseFloat(prev.display);
        const result = calculatorService.performOperation(
          prev.previousValue,
          prev.operation,
          inputValue
        );
        
        if (result.error) {
          return {
            ...prev,
            display: result.error.message,
            previousValue: null,
            operation: null,
            waitingForOperand: true,
          };
        }
        
        // Add to history
        const historyEntry: HistoryEntry = {
          id: generateId(),
          expression: result.expression,
          result: result.value,
          timestamp: new Date(),
        };
        
        return {
          ...prev,
          display: result.value.toString(),
          previousValue: null,
          operation: null,
          waitingForOperand: true,
          history: [historyEntry, ...prev.history.slice(0, 49)],
        };
      }
      
      return prev;
    });
  }, []);

  const clear = useCallback(() => {
    setState(initialState);
  }, []);

  const clearEntry = useCallback(() => {
    setState(prev => ({ ...prev, display: '0' }));
  }, []);

  const backspace = useCallback(() => {
    setState(prev => {
      if (prev.display.length > 1) {
        return { ...prev, display: prev.display.slice(0, -1) };
      }
      return { ...prev, display: '0' };
    });
  }, []);

  const memoryStore = useCallback(() => {
    setState(prev => ({
      ...prev,
      memory: parseFloat(prev.display),
    }));
  }, []);

  const memoryRecall = useCallback(() => {
    setState(prev => ({
      ...prev,
      display: prev.memory.toString(),
      waitingForOperand: false,
    }));
  }, []);

  const memoryClear = useCallback(() => {
    setState(prev => ({ ...prev, memory: 0 }));
  }, []);

  const memoryAdd = useCallback(() => {
    setState(prev => ({
      ...prev,
      memory: prev.memory + parseFloat(prev.display),
    }));
  }, []);

  const memorySubtract = useCallback(() => {
    setState(prev => ({
      ...prev,
      memory: prev.memory - parseFloat(prev.display),
    }));
  }, []);

  return {
    state,
    actions: {
      inputNumber,
      inputOperation,
      calculate,
      clear,
      clearEntry,
      backspace,
      updateDisplay,
      memoryStore,
      memoryRecall,
      memoryClear,
      memoryAdd,
      memorySubtract,
    },
  };
}

export default useCalculator;
