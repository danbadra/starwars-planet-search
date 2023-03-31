import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StandardContext from './StandardContext';

export default function StandardProvider({ children }) {
  // * 1. ESTADOS GLOBAIS
  const [planets, setPlanets] = useState([]);
  const [search, setSearch] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [numericValue, setNumericValue] = useState('0');
  const [allFilters, setAllFilters] = useState([]);

  // * 2. FUNÇÕES
  // Faz requisição à API
  useEffect(() => {
    const fetchPlanets = async () => {
      const result = await fetch('https://swapi.dev/api/planets');
      const data = await result.json();
      const planetsList = data.results;
      const filteredRows = planetsList.filter((row) => row !== row.residents);
      setPlanets(filteredRows);
    };
    fetchPlanets();
  }, []);

  // Gerencia o comparisonFilter
  const handleFilters = (array) => {
    console.log(array);
    allFilters.forEach((f) => {
      switch (f.comparisonFilter) {
      case 'maior que':
        array = array.filter((planet) => +planet[f.columnFilter] > +f.numericValue);
        break;
      case 'menor que':
        array = array.filter((planet) => +planet[f.columnFilter] < +f.numericValue);
        break;
      case 'igual a':
        array = array.filter((planet) => +planet[f.columnFilter] === +f.numericValue);
        break;
      default:
        break;
      }
    });
    return array;
  };

  const addNewFilter = () => setAllFilters(
    [...allFilters, { columnFilter, comparisonFilter, numericValue }],
  );

  // * 3. ENVIO DOS ESTADOS GLOBAIS PARA OS DEMAIS COMPONENTES
  return (
    <div>
      <StandardContext.Provider
        value={ { planets,
          setPlanets,
          search,
          setSearch,
          columnFilter,
          setColumnFilter,
          comparisonFilter,
          setComparisonFilter,
          numericValue,
          setNumericValue,
          handleFilters,
          allFilters,
          addNewFilter } }
      >
        { children }
      </StandardContext.Provider>
    </div>
  );
}

StandardProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.string),
}.isRequired;
