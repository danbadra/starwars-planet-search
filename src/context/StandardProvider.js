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
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [isClicked, setIsClicked] = useState('1');
  const [onDeleteBtnClick, setOnDeleteBtnClick] = useState('');
  const [deletedFilter, setDeletedFilter] = useState('');

  // allFilters é um array de objetos {columnFilter, comparisonFilter, numericValue}.
  // usedFilters possui todos os columnFilters que já foram usados.
  // allColumnFilters possui todos os columnFilters
  // onDeleteBtnClick será o nome

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
    setAllFilters([...allFilters, { columnFilter,
      comparisonFilter,
      numericValue }]);
    setUsedFilters([...usedFilters, columnFilter]);
  };

  // Gerencia as colunas já utilizadas para filtrar
  useEffect(() => {
    const handleAvailableColumns = () => {
      if (usedFilters.length === 0) return allColumnFilters;
      const unusedFilters = allColumnFilters.filter((a) => !usedFilters.includes(a));
      setAllColumnFilters([...unusedFilters]);
      setColumnFilter(allColumnFilters[0]);
    };
    handleAvailableColumns();
  }, [usedFilters]);

  // 1ª tentativa de apagar apenas um filtro:
  // useEffect(() => {
  //   const eraseOneFilter = () => {

  // 1. Passa o nome da coluna salvo em onDeleteBtnClick para deletedFilter
  //     setDeletedFilter(onDeleteBtnClick);

  // 2. Incluir em allColumnFilters a coluna que estava sendo utilizada, mas não está mais (deletedFilter)
  //     setAllColumnFilters([...allColumnFilters, deletedFilter]);

  // 3. Exluir de usedFilters o deletedFilter
  //     const newUsedFilters = usedFilters
  //       .filter((filter) => filter.columnFilter !== deletedFilter);
  //     setUsedFilters(newUsedFilters);

  // 4. Excluir o filtro clicado de allFilters
  //     const newAllFilters = allFilters
  //       .filter((remainingFilter) => remainingFilter.columnFilter !== deletedFilter);

  //     setAllFilters(newAllFilters);
  //   };
  //   eraseOneFilter();
  // }, [onDeleteBtnClick]);

  // Apaga apenas um filtro ativo
  useEffect(() => {
    const eraseOneFilter = () => {
    // 1. Passa o nome da coluna salvo em onDeleteBtnClick para deletedFilter
      setDeletedFilter(onDeleteBtnClick);

      // 2. Incluir em allColumnFilters a coluna que estava sendo utilizada, mas não está mais (deletedFilter)
      setAllColumnFilters([...allColumnFilters, deletedFilter]);

      // 3. Excluir o filtro correto de allFilters com base no nome da coluna
      const newAllFilters = allFilters.filter(
        (remainingFilter) => remainingFilter.columnFilter !== onDeleteBtnClick,
      );
      setAllFilters(newAllFilters);

      // 4. Exluir de usedFilters o onDeleteBtnClick
      const newUsedFilters = usedFilters.filter((filter) => filter !== onDeleteBtnClick);
      setUsedFilters(newUsedFilters);
    };
    eraseOneFilter();
  }, [onDeleteBtnClick]);

  // Limpa todos os filtros ativos
  useEffect(() => {
    const eraseFilters = () => {
      setAllFilters([]);
      setAllColumnFilters([
        'population',
        'orbital_period',
        'diameter',
        'rotation_period',
        'surface_water',
      ]);
    };
    setUsedFilters([]);
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
          setIsClicked,
          onDeleteBtnClick,
          setOnDeleteBtnClick } }
      >
        { children }
      </StandardContext.Provider>
    </div>
  );
}

StandardProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.string),
}.isRequired;
