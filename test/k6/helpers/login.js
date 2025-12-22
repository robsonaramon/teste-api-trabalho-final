import http from 'k6/http';
import { BASE_URL } from './baseURL.js';

export function login(email, password){
    let payload = {
        email,
        password
    };

    let res = http.post(
            `${BASE_URL}/api/auth/login`,
            JSON.stringify(payload),
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
        
    return res;
}