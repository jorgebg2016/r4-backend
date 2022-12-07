import { LoginCredentials } from "../types/AuthTypes";

/**
 * Check if the request payload is LoginCredentials.
 * 
 * @param { LoginCredentials|any } loginCredentials 
 * @returns {boolean}
 */
export function isLoginCredentials(loginCredentials: LoginCredentials | any): loginCredentials is LoginCredentials {

    if('email' in loginCredentials && 'password' in loginCredentials &&
        typeof loginCredentials['email'] === 'string' && typeof loginCredentials['password'] === 'string'
    ) return true;

    return false;
};