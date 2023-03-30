import React from 'react';
import './App.css';
import Table from './components/Table';
import StandardProvider from './context/StandardProvider';

function App() {
  return (
    <StandardProvider>
      <Table />
    </StandardProvider>
  );
}

export default App;
