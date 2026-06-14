import { api_url } from "./index"


export const create_marker = async (token, marker_data) => {
    const request = await fetch(`${api_url}/markers/`, {
        method: 'POST',
        body: JSON.stringify(marker_data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }        
    })
    return request.ok;
}

export const get_my_markers = async (token) => {
    const request = await fetch(`${api_url}/markers/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }        
    })
    return await request.json();
}

export const get_marker_by_id = async (token, marker_id) => {
    const request = await fetch(`${api_url}/markers/${marker_id}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }        
    })
    return await request.json();
}

export const get_near_markers = async (token, latitude, longitude) => {
    const request = await fetch(`${api_url}/markers/near/`, {
        method: 'POST',
        body: JSON.stringify({latitude, longitude}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }        
    })
    return await request.json();
}