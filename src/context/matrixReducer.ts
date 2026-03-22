import type { MatrixAction } from '../types/context-types';
import type { MatrixState } from '../types/main-types';
import { createCell, generateMatrix } from '../utils/matrixUtils';

export const initialState: MatrixState = {
  M: 0,
  N: 0,
  X: 0,
  matrix: [],
};

export function matrixReducer(
  state: MatrixState,
  action: MatrixAction,
): MatrixState {
  switch (action.type) {
    case 'GENERATE_MATRIX': {
      const { M, N, X } = action.payload;
      return { M, N, X, matrix: generateMatrix(M, N) };
    }

    case 'INCREMENT_CELL': {
      const { rowIndex, colIndex } = action.payload;
      const newMatrix = state.matrix.map((row, rIdx) =>
        row.map((cell, cIdx) => {
          if (rIdx === rowIndex && cIdx === colIndex) {
            return { ...cell, amount: cell.amount + 1 };
          }
          return cell;
        }),
      );
      return { ...state, matrix: newMatrix };
    }

    case 'ADD_ROW': {
      const newRow = Array.from({ length: state.N }, () => createCell());
      return { ...state, M: state.M + 1, matrix: [...state.matrix, newRow] };
    }

    case 'REMOVE_ROW': {
      const { rowIndex } = action.payload;
      const newMatrix = state.matrix.filter((_, idx) => idx !== rowIndex);
      return { ...state, M: state.M - 1, matrix: newMatrix };
    }

    default:
      return state;
  }
}
