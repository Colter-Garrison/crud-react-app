import { useEffect, useState } from 'react';
import { getBeers } from './services/fetch-utils';
import { Beers } from './Beers';

export default function ListPage() {
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    async function doFetch() {
      const allBeers = await getBeers();
      setBeers(allBeers);
    }
    doFetch();
  }, []);
  return (
    <div>
      {
        beers.map((beer, i) => <Beers beer={beer} key={beer.brewery + i + beer.style} />)
      }
    </div>
  );
}
