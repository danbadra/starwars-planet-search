import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testes de Table', () => {
test('Testa se os cabeçalhos de cada coluna aparecem corretamente na tela', () => {
  render(<App />);
  const name = screen.getByText(/Name/i);
  expect(name).toBeInTheDocument();

  const rotation = screen.getByText(/Rotation Period/i);
  expect(rotation).toBeInTheDocument();

  const orbit = screen.getByText(/Orbital Period/i);
  expect(orbit).toBeInTheDocument();

  const diameter = screen.getByText(/Diameter/i);
  expect(diameter).toBeInTheDocument();

  const climate = screen.getByText(/Climate/i);
  expect(climate).toBeInTheDocument();

  const gravity = screen.getByText(/Gravity/i);
  expect(gravity).toBeInTheDocument();
  
  const terrain = screen.getByText(/Terrain/i);
  expect(terrain).toBeInTheDocument();

  const surface = screen.getByText(/Surface Water/i);
  expect(surface).toBeInTheDocument();

  const population = screen.getByText(/Population/i);
  expect(population).toBeInTheDocument();

  const films = screen.getByText(/Films/i);
  expect(films).toBeInTheDocument();

  const created = screen.getByText(/Created/i);
  expect(created).toBeInTheDocument();

  const edited = screen.getByText(/Edited/i);
  expect(edited).toBeInTheDocument();

  const url = screen.getByText(/Url/i);
  expect(url).toBeInTheDocument();
});
})

describe('Testes de Filters', () => {
  test('', () => {
    render(<App />);
    const nameFilter = screen.getByTestId("name-filter");
    expect(nameFilter).toBeInTheDocument();
    userEvent.type(nameFilter, 'Tatooine');
    userEvent.clear(nameFilter);

    const columnFilter = screen.getByTestId("column-filter");
    expect(columnFilter).toBeInTheDocument();
    userEvent.selectOptions(columnFilter, 'population');
    expect(columnFilter.value).toBe('population');

    const comparisonFilter = screen.getByTestId("comparison-filter");
    expect(comparisonFilter).toBeInTheDocument();
    userEvent.selectOptions(comparisonFilter, 'maior que');
    expect(comparisonFilter.value).toBe('maior que');
    

    const valueFilter = screen.getByTestId("value-filter");
    expect(valueFilter).toBeInTheDocument();
    userEvent.type(nameFilter, '10000');


    const buttonFilter = screen.getByTestId("button-filter");
    expect(buttonFilter).toBeInTheDocument();
    userEvent.click(buttonFilter);
  });
  })

// describe('Testes de ActiveFilters', () => {
//   test('', () => {
//     render(<App />);
//     const linkElement = screen.getByText(/name/i);
//     expect(linkElement).toBeInTheDocument();
//   });
//   })