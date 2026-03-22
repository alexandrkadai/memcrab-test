import type { Cell } from '../types/main-types';

let nextId = 1;

function randomAmount(): number {
  return Math.floor(Math.random() * 900) + 100;
}

export function createCell(): Cell {
  return { id: nextId++, amount: randomAmount() };
}

export function calculateRowSum(row: Cell[]): number {
  return row.reduce((sum, cell) => sum + cell.amount, 0);
}

export function calculatePercentile(values: number[], percentile = 60): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const rank = (percentile / 100) * (sorted.length - 1);
  const lower = Math.floor(rank);
  const upper = Math.ceil(rank);
  if (lower === upper) return sorted[lower];
  const frac = rank - lower;
  return +(sorted[lower] + frac * (sorted[upper] - sorted[lower])).toFixed(2);
}

export function findNearestCells(
  matrix: Cell[][],
  targetAmount: number,
  targetId: number,
  count: number,
): Set<number> {
  const allCells = matrix.flat().filter((cell) => cell.id !== targetId);
  allCells.sort(
    (a, b) => Math.abs(a.amount - targetAmount) - Math.abs(b.amount - targetAmount),
  );
  return new Set(allCells.slice(0, count).map((c) => c.id));
}

export function generateMatrix(M: number, N: number): Cell[][] {
  return Array.from({ length: M }, () => Array.from({ length: N }, () => createCell()));
}
