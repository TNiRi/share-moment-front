import { api_url } from "./index"


export const sign_up = async (user_data) => {
    const request = await fetch(`${api_url}/users/signup/`, {
        method: 'POST',
        body: JSON.stringify(user_data),
        headers: {
            'Content-Type': 'application/json',
        }        
    })
    return request.ok;
}

export const sign_in = async (user_data) => {
    const request = await fetch(`${api_url}/users/signin/`, {
        method: 'POST',
        body: JSON.stringify(user_data),
        headers: {
            'Content-Type': 'application/json',
        }        
    })
    const result = await request.json();
    if (request.ok) {
        return result.token;
    }
    return null;
}

export const me = async (token) => {
    const request = await fetch(`${api_url}/users/me/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }        
    })
    const result = await request.json();
    if (request.ok) {
        return result;
    }
    return null;
}