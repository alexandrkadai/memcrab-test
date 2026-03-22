import { MatrixProvider } from '../../context/MatrixContext';
import { useMatrixContext } from '../../hooks/useMatrixContext';
import MatrixHeader from './MatrixHeader';
import MatrixTable from './MatrixTable';

function MatrixContent() {
  const { state } = useMatrixContext();
  return (
    <div className="main-container">
      <MatrixHeader />
      {state.matrix.length > 0 && <MatrixTable />}
    </div>
  );
}

export default function MatrixMain() {
  return (
    <MatrixProvider>
      <MatrixContent />
    </MatrixProvider>
  );
}


 