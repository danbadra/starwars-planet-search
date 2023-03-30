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
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
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

      {
        allFilters.map((filter) => {
          console.log(filter);
          return (
            <table key={ filter.columnFilter }>
              <thead>
                <tr>
                  <th>Filtros Ativos</th>
                  <th><button>Remover Todos os Filtros</button></th>
                </tr>
              </thead>
              <tbody>
                <tr key={ filter.columnFilter }>
                  <td>{filter.columnFilter}</td>
                  <td>{filter.comparisonFilter}</td>
                  <td>{filter.numericValue}</td>
                  <td><button>X</button></td>
                </tr>
              </tbody>
            </table>
          );
        })
      }
    </div>
  );
}
