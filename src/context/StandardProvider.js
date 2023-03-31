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
  const [usedFilters, setUsedFilters] = useState([]);
  const [allColumnFilters, setAllColumnFilters] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [isClicked, setIsClicked] = useState('1');

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

  const addNewFilter = () => {
    setAllFilters([...allFilters, { columnFilter, comparisonFilter, numericValue }]);
    setUsedFilters([...usedFilters, columnFilter]);
  };

  // Gerencia as colunas já utilizadas para filtrar
  useEffect(() => {
    const handleAvailableColumns = () => {
      if (usedFilters.length === 0) return allColumnFilters;
      const unusedFilters = allColumnFilters.filter((a) => !usedFilters.includes(a));
      setAllColumnFilters([...unusedFilters]);
      setColumnFilter(allColumnFilters[0]);
      console.log(allColumnFilters);
    };
    handleAvailableColumns();
  }, [usedFilters]);

  // Limpa todos os filtros ativos
  useEffect(() => {
    const eraseFilters = () => setAllFilters([]);
    eraseFilters();
  }, [isClicked]);

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
          addNewFilter,
          usedFilters,
          setUsedFilters,
          allColumnFilters,
          setAllColumnFilters,
          isClicked,
          setIsClicked } }
      >
        { children }
      </StandardContext.Provider>
    </div>
  );
}

StandardProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.string),
}.isRequired;
