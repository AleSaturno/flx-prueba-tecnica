import { v4 as uuidv4 } from 'uuid';

const BASE_URL = 'http://localhost:4000/users';
const simulateDelay = ms => new Promise(res => setTimeout(res, ms));

// GET
export const getUsers = async ({
  limit = 10,
  offset = 0,
  search = '',
  status = 'all'
} = {}) => {
  await simulateDelay(500);
  const params = new URLSearchParams();
  params.set('_limit', limit);
  params.set('_start', offset);
  if (search) params.set('q', search);
  if (status !== 'all') params.set('status', status);

  const res = await fetch(`${BASE_URL}?${params.toString()}`);
  const items = await res.json();
  const total = parseInt(res.headers.get('X-Total-Count'), 10) || items.length;
  return { items, total };
};

// CREATE
export const createUser = async (user) => {
  await simulateDelay(500);
  const newUser = { id: uuidv4(), ...user };
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });
  return res.json();
};

// UPDATE
export const updateUser = async (user) => {
  await simulateDelay(500);
  const res = await fetch(`${BASE_URL}/${user.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return res.json();
};

// DELETE
export const deleteUser = async (id) => {
  await simulateDelay(500);
  return fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
};
