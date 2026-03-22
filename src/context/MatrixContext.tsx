import {
  createContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react';
import type { MatrixAction } from '../types/context-types';
import type { MatrixState } from '../types/main-types';
import { initialState, matrixReducer } from './matrixReducer';

export interface MatrixContextValue {
  state: MatrixState;
  dispatch: Dispatch<MatrixAction>;
}

export const MatrixContext = createContext<MatrixContextValue | null>(null);

interface MatrixProviderProps {
  children: ReactNode;
}

export function MatrixProvider({ children }: MatrixProviderProps) {
  const [state, dispatch] = useReducer(matrixReducer, initialState);

  return (
    <MatrixContext.Provider value={{ state, dispatch }}>
      {children}
    </MatrixContext.Provider>
  );
}
