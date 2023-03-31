import { useContext } from 'react';
import StandardContext from '../context/StandardContext';

export default function Filters() {
  const {
    search,
    setSearch,
    setColumnFilter,
    setComparisonFilter,
    setNumericValue,
    addNewFilter,
    allFilters,
    allColumnFilters,
    isClicked,
    setIsClicked,
  } = useContext(StandardContext);

  return (
    <div>
      <input
        data-testid="name-filter"
        name="search"
        value={ search }
        onChange={ (e) => setSearch(e.target.value) }
        placeholder="Search by name"
      />

      <select
        data-testid="column-filter"
        onChange={ (e) => setColumnFilter(e.target.value) }
      >
        {
          allColumnFilters.map((column) => (
            <option
              key={ column }
            >
              {column}
            </option>))
        }
      </select>

      <select
        data-testid="comparison-filter"
        onChange={ (e) => setComparisonFilter(e.target.value) }
      >
        <option>maior que</option>
        <option>igual a</option>
        <option>menor que</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        defaultValue="0"
        onChange={ (e) => setNumericValue(e.target.value) }
      />

      <button
        data-testid="button-filter"
        onClick={ addNewFilter }
      >
        Adicionar filtro
      </button>

      <div>
        <div>Filtros Ativos</div>
        <button
          onClick={ () => setIsClicked(isClicked + 1) }
        >
          Remover Todos os Filtros
        </button>

      </div>
      {
        allFilters.map((filter) => (
          <div key={ filter.columnFilter }>
            <p>{filter.columnFilter}</p>
            <p>{filter.comparisonFilter}</p>
            <p>{filter.numericValue}</p>
            <p><button>X</button></p>
          </div>
        ))
      }
    </div>
  );
}
