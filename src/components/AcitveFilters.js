import { useContext } from 'react';
import StandardContext from '../context/StandardContext';

export default function ActiveFilters() {
  const {
    allFilters,
    // setAllFilters,
    isClicked,
    setIsClicked,
    usedFilters,
    // setUsedFilters,
    setOnDeleteBtnClick,
    // setAllColumnFilters,
    // allColumnFilters,
  } = useContext(StandardContext);

  if (usedFilters.length === 0) return <div />;

  return (
    <div
      style={ { marginTop: '10px',
        marginBottom: '10px' } }
    >
      <div>Filtros Ativos</div>
      <button
        data-testid="button-remove-filters"
        onClick={ () => setIsClicked(isClicked + 1) }
      >
        Remover Todos os Filtros
      </button>

      {
        allFilters.map((filter, index) => (
          <div
            key={ index }
            data-testid="filter"
            style={ { display: 'flex',
              justifyContent: 'space-evenly',
              border: '1px solid black' } }
          >
            <p>{filter.columnFilter}</p>
            <p>{filter.comparisonFilter}</p>
            <p>{filter.numericValue}</p>
            <p>
              <button
                onClick={ () => setOnDeleteBtnClick(filter.columnFilter) }
              >
                X
              </button>

            </p>
          </div>
        ))

      }
    </div>
  );
}
