import { useMemo, useState } from 'react';
import { useMatrixContext } from '../../hooks/useMatrixContext';
import {
  calculatePercentile,
  calculateRowSum,
  findNearestCells,
} from '../../utils/matrixUtils';
import MatrixCell from './MatrixCell';
import '../../styles/MatrixTable.scss';

export default function MatrixTable() {
  const { state, dispatch } = useMatrixContext();
  const { matrix, N, X } = state;

  const [hoveredCellId, setHoveredCellId] = useState<number | null>(null);
  const [hoveredSumRowIndex, setHoveredSumRowIndex] = useState<number | null>(
    null,
  );

  const nearestCellIds = useMemo<Set<number>>(() => {
    if (hoveredCellId === null || X === 0) return new Set();
    const hoveredCell = matrix.flat().find((c) => c.id === hoveredCellId);
    if (!hoveredCell) return new Set();
    return findNearestCells(matrix, hoveredCell.amount, hoveredCell.id, X);
  }, [hoveredCellId, matrix, X]);

  const colPercentiles = useMemo(
    () =>
      Array.from({ length: N }, (_, colIdx) => {
        const colValues = matrix.map((row) => row[colIdx]?.amount ?? 0);
        return calculatePercentile(colValues);
      }),
    [matrix, N],
  );

  function handleAddRow() {
    dispatch({ type: 'ADD_ROW' });
  }

  function handleRemoveRow(rowIndex: number) {
    dispatch({ type: 'REMOVE_ROW', payload: { rowIndex } });
  }

  function handleCellClick(rowIndex: number, colIndex: number) {
    dispatch({ type: 'INCREMENT_CELL', payload: { rowIndex, colIndex } });
  }

  return (
    <div className='matrix-wrapper'>
      <table className='matrix-table'>
        <thead>
          <tr>
            <th></th>
            {Array.from({ length: N }, (_, i) => (
              <th key={i}>N = {i + 1}</th>
            ))}
            <th>Sum</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, rowIndex) => {
            const rowSum = calculateRowSum(row);
            const isHoveringSum = hoveredSumRowIndex === rowIndex;
            const maxInRow =
              row.length > 0 ? Math.max(...row.map((c) => c.amount)) : 1;

            return (
              <tr key={rowIndex}>
                <th>M = {rowIndex + 1}</th>
                {row.map((cell, colIndex) => {
                  const percentValue =
                    rowSum > 0 ? Math.round((cell.amount / rowSum) * 100) : 0;
                  const heatPercent =
                    maxInRow > 0 ? (cell.amount / maxInRow) * 100 : 0;
                  return (
                    <MatrixCell
                      key={cell.id}
                      cell={cell}
                      isHighlighted={nearestCellIds.has(cell.id)}
                      showAsPercent={isHoveringSum}
                      percentValue={percentValue}
                      heatPercent={heatPercent}
                      onCellClick={() => handleCellClick(rowIndex, colIndex)}
                      onMouseEnter={() => setHoveredCellId(cell.id)}
                      onMouseLeave={() => setHoveredCellId(null)}
                    />
                  );
                })}
                <td
                  className='sum-cell'
                  onMouseEnter={() => setHoveredSumRowIndex(rowIndex)}
                  onMouseLeave={() => setHoveredSumRowIndex(null)}
                >
                  {rowSum}
                </td>
                <td className='action-cell'>
                  <button
                    className='remove-btn'
                    onClick={() => handleRemoveRow(rowIndex)}
                    title='Remove row'
                  >
                    ✕
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th>60th percentile</th>
            {colPercentiles.map((val, i) => (
              <td key={i}>{val}</td>
            ))}
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>

      <button className='add-row-btn' onClick={handleAddRow}>
        + Add Row
      </button>
    </div>
  );
}
