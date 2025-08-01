import { getToken } from './authenticate';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function authHeader(){
    const token = getToken();
    return {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`
    }
}

export async function addToFavourites(id) {
    const res = await fetch(`${BASE_URL}/api/user/favourites/${id}`, {
        method: 'PUT',
        headers: authHeader(),
    });

    if (res.status === 200) {
        return await res.json();
    } else {
        return [];//what if it doesn't have any favourites?
    }
}

export async function removeFromFavourites(id) {
    const res = await fetch(`${BASE_URL}/api/user/favourites/${id}`, {
        method: 'DELETE',
        headers: authHeader(),
    });
    
    if (res.status === 200) {
        return await res.json();
    } else {
        return [];
    }
}

export async function getFavourites() {
    const res = await fetch(`${BASE_URL}/api/user/favourites`, {
        headers: authHeader(),
    });
    
    if (res.status === 200) {
        return await res.json();
    } else {
        return [];
    }
}

export async function addToHistory(id) {
    const res = await fetch(`${BASE_URL}/api/user/history/${id}`, {
        method: 'PUT',
        headers: authHeader(),
    });
    
    if (res.status === 200) {
        return await res.json();
    } else {
        return [];
    }
}

export async function removeFromHistory(id) {
    const res = await fetch(`${BASE_URL}/api/user/history/${id}`, {
        method: 'DELETE',
        headers: authHeader(),
    });
    
    if (res.status === 200) {
        return await res.json();
    } else {
        return [];
    }
}

export async function getHistory() {
    const res = await fetch(`${BASE_URL}/api/user/history`, {
        headers: authHeader(),
    });
    
    if (res.status === 200) {
        return await res.json();
    } else {
        return [];
    }
}
/*import { getToken } from './authenticate';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function authHeader(){
    return {
        'Content-Type': 'application/json',
        Authorization: `JWT ${getToken()}`
    }
}

export async function addToFavourites(id) {
    const res = await fetch(`${BASE_URL}/favourites/${id}`, {
        method: 'POST',
        headers: authHeader(),
    });

    if (res.ok) {
        return true;
    } else {
        throw new Error('Failed to add to favourites');
    }
}

export async function removeFromFavourites(id) {
  const res = await fetch(`${BASE_URL}/favourites/${id}`, {
    method: 'DELETE',
    headers: authHeader(),
  });
  if (!res.ok) throw new Error('Failed to remove from favourites');
}

export async function getFavourites() {
  const res = await fetch(`${BASE_URL}/favourites`, {
    headers: authHeader(),
  });
  if (!res.ok) throw new Error('Failed to fetch favourites');
  return await res.json();
}

export async function addToHistory(id) {
  const res = await fetch(`${BASE_URL}/history/${id}`, {
    method: 'PUT',
    headers: authHeader(),
  });
  if (!res.ok) throw new Error('Failed to add to history');
}

export async function removeFromHistory(id) {
  const res = await fetch(`${BASE_URL}/history/${id}`, {
    method: 'DELETE',
    headers: authHeader(),
  });
  if (!res.ok) throw new Error('Failed to remove from history');
}

export async function getHistory() {
  const res = await fetch(`${BASE_URL}/history`, {
    headers: authHeader(),
  });
  if (!res.ok) throw new Error('Failed to fetch history');
  return await res.json();
}*/