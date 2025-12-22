
import http from 'k6/http';
import { BASE_URL } from './baseURL.js';

export function register(username, email, password){
    let payload = {
        username,
        email,
        password
    };

    let res = http.post(
            `${BASE_URL}/api/auth/register`,
            JSON.stringify(payload),
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
    return res;
}