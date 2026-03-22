import { useState } from 'react';
import { useMatrixContext } from '../../hooks/useMatrixContext';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function MatrixHeader() {
  const { dispatch } = useMatrixContext();
  const [m, setM] = useState<string>('');
  const [n, setN] = useState<string>('');
  const [x, setX] = useState<string>('');

  const mNum = Math.min(100, Math.max(0, Number(m) || 0));
  const nNum = Math.min(100, Math.max(0, Number(n) || 0));
  const maxX = Math.max(0, mNum * nNum - 1);
  const xNum = Math.min(maxX, Math.max(0, Number(x) || 0));

  function handleGenerate() {
    dispatch({
      type: 'GENERATE_MATRIX',
      payload: { M: mNum, N: nNum, X: xNum },
    });
  }

  return (
    <div className='header-controls'>
      <Input
        inputPlaceholder='Rows (M, 0–100)'
        inputValue={m}
        min={0}
        max={100}
        onChange={(e) => setM(e.target.value)}
      />
      <Input
        inputPlaceholder='Columns (N, 0–100)'
        inputValue={n}
        min={0}
        max={100}
        onChange={(e) => setN(e.target.value)}
      />
      <Input
        inputPlaceholder={`Nearest (X, 0–${maxX})`}
        inputValue={x}
        min={0}
        max={maxX}
        onChange={(e) => setX(e.target.value)}
      />
      <Button buttonText='Generate' buttonAction={handleGenerate} />
    </div>
  );
}
