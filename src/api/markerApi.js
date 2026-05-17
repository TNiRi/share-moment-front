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