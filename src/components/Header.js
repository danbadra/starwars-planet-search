import { useContext } from 'react';
import StandardContext from '../context/StandardContext';

export default function Header() {
  const { search, setSearch } = useContext(StandardContext);

  return (
    <input
      data-testid="name-filter"
      name="search"
      value={ search }
      onChange={ (e) => setSearch(e.target.value) }
    />
  );
}
