import type { Cell } from '../../types/main-types';

interface MatrixCellProps {
  cell: Cell;
  isHighlighted: boolean;
  showAsPercent: boolean;
  percentValue: number;
  heatPercent: number;
  onCellClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function MatrixCell({
  cell,
  isHighlighted,
  showAsPercent,
  percentValue,
  heatPercent,
  onCellClick,
  onMouseEnter,
  onMouseLeave,
}: MatrixCellProps) {
  const classNames = [
    'matrix-cell',
    isHighlighted ? 'highlighted' : '',
    showAsPercent ? 'as-percent' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const heatStyle = showAsPercent
    ? { background: `rgba(66, 135, 245, ${(heatPercent / 100) * 0.75})` }
    : undefined;

  return (
    <td
      className={classNames}
      style={heatStyle}
      onClick={onCellClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {showAsPercent ? `${percentValue}%` : cell.amount}
    </td>
  );
}


