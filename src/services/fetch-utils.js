import { client } from './client';

export async function createBeer(beer) {
  const { data, error } = await client
    .from('beers')
    .insert(beer)
    .single();

  return data;
}

export async function getBeers() {
  const { data, error } = await client
    .from('beers')
    .select('*');

  return data;
}

export async function updateBeers(beer, id) {
  const { data, error } = await client
    .from('beers')
    .update(beer)
    .match({ id: id })
    .single();

  return data;
}

export async function deleteBeers(id) {
  const { data, error } = await client
    .from('beers')
    .delete()
    .match({ id: id })
    .single();

  return data;
}

export async function getBeersById(id) {
  const { data, error } = await client
    .from('beers')
    .select('*')
    .match({ id })
    .single();

  return data;
}

export async function signUp(email, password) {
  const { user, error } = await client.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    console.error(error);
    throw error;
  } else {
    return user;
  }
}

export async function signIn(email, password) {
  const { user } = await client.auth.signIn({
    email: email,
    password: password,
  });

  return user;
}

export async function logout() {
  const { error } = await client.auth.signOut();
}