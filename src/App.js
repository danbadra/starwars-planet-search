import React from 'react';
import './App.css';
import Header from './components/Header';
import Table from './components/Table';
import StandardProvider from './context/StandardProvider';

function App() {
  return (
    <StandardProvider>
      <Header />
      <Table />
    </StandardProvider>
  );
}

export default App;
