import { Link } from 'react-router-dom';

export function Beers({ beer }) {
  return <Link to={`/beers/${beer.id}`} >
    <p>{beer.beer} by {beer.brewery}</p>
  </Link>;
}
