export type MatrixAction =
  | { type: 'GENERATE_MATRIX'; payload: { M: number; N: number; X: number } }
  | { type: 'INCREMENT_CELL'; payload: { rowIndex: number; colIndex: number } }
  | { type: 'ADD_ROW' }
  | { type: 'REMOVE_ROW'; payload: { rowIndex: number } };
