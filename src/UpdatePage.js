import { useEffect, useState } from 'react';
import { deleteBeers, getBeersById, updateBeers } from './services/fetch-utils';
import { useHistory, useParams } from 'react-router-dom';

export default function UpdatePage() {
  const { push } = useHistory();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [brewery, setBrewery] = useState('');
  const [currentBeer, setCurrentBeer] = useState({});
  console.log(currentBeer);
  useEffect(() => {
    async function doFetch() {
      const beer = await getBeersById(id);
      setName(beer.beer);
      setBrewery(beer.brewery);
      setCurrentBeer(beer);
    }
    doFetch();
  }, [id]);

  async function handleDeleteBeer() {
    await deleteBeers(id);
    push('/beers');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await updateBeers({
      beer: name,
      brewery: brewery
    }, id);
    setName('');
    setBrewery('');
    push('/beers');
  }

  return (
    <div>
      <h2>update a Beer</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name of Beer:
          <input onChange={e => setName(e.target.value)} value={currentBeer.name} />
        </label>
        <label>
          Brewery:
          <input onChange={e => setBrewery(e.target.value)} value={brewery} />
        </label>
        <button>Update Beer</button>
      </form>
      <button onClick={handleDeleteBeer} className='delete-button'>Delete Beer</button>
    </div>
  );
}
