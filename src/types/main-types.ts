export type CellId = number;
export type CellValue = number;
export type Cell = {
  id: CellId;
  amount: CellValue;
};

export type MatrixState = {
  M: number;
  N: number;
  X: number;
  matrix: Cell[][];
};
