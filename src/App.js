import React from 'react';
import './App.css';
import Filters from './components/Filters';
import Table from './components/Table';
import ActiveFilters from './components/AcitveFilters';
import StandardProvider from './context/StandardProvider';

function App() {
  return (
    <StandardProvider>
      <Filters />
      <ActiveFilters />
      <Table />
    </StandardProvider>
  );
}

export default App;
