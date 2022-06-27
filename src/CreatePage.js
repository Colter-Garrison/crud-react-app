import { useState } from 'react';
import { createBeer } from './services/fetch-utils';
import { useHistory } from 'react-router-dom';

export default function CreatePage() {
  const { push } = useHistory();
  const [name, setName] = useState('');
  const [brewery, setBrewery] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const beer = await createBeer({
      name: name,
      brewery: brewery
    });
    
    console.log(beer);
    setName('');
    setBrewery('');
    push('/beers');
  }

  return (
    <div>
      <h2>Create a Beer</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name of Beer:
          <input onChange={e => setName(e.target.value)} value={name} />
        </label>
        <label>
          Brewery:
          <input onChange={e => setBrewery(e.target.value)} value={brewery} />
        </label>
        <button>Create a Beer</button>
      </form>
    </div>
  );
}
