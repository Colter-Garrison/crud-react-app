import { useState } from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import AuthPage from './AuthPage';
import CreatePage from './CreatePage';
import ListPage from './ListPage';
import UpdatePage from './UpdatePage';
import { client } from './services/client';
import { logout } from './services/fetch-utils';
import './App.css';

export default function App() {
  const [user, setUser] = useState(client.auth.user());

  async function handleLogoutClick() {
    await logout();
    setUser('');
  }

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Sign In</Link>
            </li>
            <li>
              <Link to='/create'>Create new Beer</Link>
            </li>
            <li>
              <Link to='/beers/1'>Update a Beer</Link>
            </li>
            <li>
              <Link to='/beers'>List of Your Beers</Link>
            </li>
            <li>
              {user &&
              <button onClick={handleLogoutClick}>LogOut</button>}
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path='/'>
            {
              !user ? <AuthPage setUser={setUser} />
                : <Redirect to='/beers' />
            }
          </Route>
          <Route exact path='/beers/:id'>
            <UpdatePage />
          </Route>
          <Route exact path='/beers'>
            {
              user ? <ListPage />
                : <Redirect to='/' />
            }
          </Route>
          <Route exact path='/create'>
            <CreatePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}