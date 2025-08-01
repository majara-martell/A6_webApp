import { jwtDecode } from 'jwt-decode'; // Add this import

const TOKEN_KEY = 'access_token';

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
}

export function readToken() {
    try {
        const token = getToken();
        return token ? jwtDecode(token) : null;
    } catch (error) {
        console.error('Error reading token:', error);
        return null;
    }
}

export function isAuthenticated() {
    const token = getToken();
    return token ? true : false;
}

export async function authenticateUser(user, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, {
    method: 'POST',
    body: JSON.stringify({ userName: user, password: password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    setToken(data.token);
    return true;
  } else {
    throw new Error(data.message);
  }
}

export async function registerUser(user, password, password2) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/register`, {
        method: 'POST',
        body: JSON.stringify({ userName: user, password: password, password2: password2 }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (res.status === 200) {
        return true;
    } else {
        const error = await res.text();
        throw new Error(error || 'Registration failed');
    }
}