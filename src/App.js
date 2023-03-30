import React from 'react';
import './App.css';
import Filters from './components/Filters';
import Table from './components/Table';
import StandardProvider from './context/StandardProvider';

function App() {
  return (
    <StandardProvider>
      <Filters />
      <Table />
    </StandardProvider>
  );
}

export default App;
