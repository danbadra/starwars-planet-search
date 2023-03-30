import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StandardContext from './StandardContext';

export default function StandardProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Função que puxa as informações da API e seta as infos recebidas no estado.
    const fetchPlanets = async () => {
      const result = await fetch('https://swapi.dev/api/planets');
      const data = await result.json();
      const planetsList = data.results;
      // Filtra todas as colunas que não são 'residents'
      const filteredRows = planetsList.filter((row) => row !== row.residents);

      // Seta o estado planets como todas as informações menos 'residents'
      setPlanets(filteredRows);
    };

    // Chama a função para requisitar à API
    fetchPlanets();
  }, []);

  return (
    <div>
      <StandardContext.Provider value={ { planets, setPlanets, search, setSearch } }>
        { children }
      </StandardContext.Provider>
    </div>
  );
}

StandardProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.string),
}.isRequired;
