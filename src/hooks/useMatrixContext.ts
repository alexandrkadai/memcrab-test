import { useContext } from 'react';
import {
  MatrixContext,
  type MatrixContextValue,
} from '../context/MatrixContext';

export function useMatrixContext(): MatrixContextValue {
  const context = useContext(MatrixContext);
  if (!context) {
    throw new Error('useMatrixContext must be used inside <MatrixProvider>');
  }
  return context;
}
