import { useState } from 'react';
import { signIn, signUp } from './services/fetch-utils';

export default function AuthPage({ setUser }) {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const user = await signUp(email, password);
      setUser(user);
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleSignInSubmit(e) {
    e.preventDefault();
    const user = await signIn(signInEmail, signInPassword);

    setUser(user);
  }

  return (
    <div>
      <h3>BEER!</h3>
      <h1 className='error'>{error}</h1>
      <form onSubmit={handleSubmit}>
        <p>Sign Up</p>
        <label>
          email
          <input onChange={e => setEmail(e.target.value)} value={email} type='email' />
        </label>
        <label>
          password
          <input onChange={e => setPassword(e.target.value)} value={password} type='password' />
        </label>
        <button>Sign Up</button>
      </form>
      <form onSubmit={handleSignInSubmit}>
        <p>Sign In</p>
        <label>
          email
          <input onChange={e => setSignInEmail(e.target.value)} value={signInEmail} type='email' />
        </label>
        <label>
          password
          <input onChange={e => setSignInPassword(e.target.value)} value={signInPassword} type='password' />
        </label>
        <button>Sign In</button>
      </form>
    </div>
  );
}