import { api_url } from "./Index"


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