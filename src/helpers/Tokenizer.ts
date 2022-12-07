import { sign, verify, VerifyOptions } from 'jsonwebtoken';
import { UserInstance } from "../database/models/User";
import * as path from 'path';
import * as fs from 'fs';
import { DataStoredInToken, TokenData } from '../types/AuthTypes';


/**
 * Create a new authorization token every time the user logs in.
 * 
 * @param {UserInstance} user 
 * @returns {TokenData}
 */
export function createToken(user: UserInstance): TokenData {

    const expiresIn: number = 60 * 60;

    const privateKey = fs.readFileSync(path.join(__dirname, '../../private.pem'));

    const dataStoredInToken: DataStoredInToken = {
      _id: user.name + user.email + (new Date().getTime()).toString(),
    };

    return {
      expiresIn,
      token: sign(dataStoredInToken, privateKey, { 
        expiresIn
      }),
    };
};

/**
 * Create a new authorization cookie every time the user logs in.
 * 
 * @param {TokenData} tokenData 
 * @returns {string}
 */
export function createCookie(tokenData: TokenData): string {

  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
};

/**
* Checks if JWT token is valid.
*
* @param {string} token
*/
export async function validateToken(token: string): Promise<any> {

  const privateKey = fs.readFileSync(path.join(__dirname, '../../private.pem'));

  return verify(token, privateKey);
};