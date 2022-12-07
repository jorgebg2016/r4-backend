import { Request, Response, NextFunction } from 'express';
import { validateToken } from './../helpers/Tokenizer';

/**
 * Middleware to check whether user has authorization token and if this one hasn't expired yet
 */
export const auth = () => async (request: Request, response: Response, next: NextFunction) => {

    let jwt: string|undefined = request.headers.authorization;

    if(!jwt) return response.status(401).json({ 
        error: 'Authentication Error.',
        message: 'Authorization token is required.' 
    });

    if(jwt.toLowerCase().startsWith('bearer')) jwt = jwt.slice('bearer'.length).trim();

    const decodedToken = await validateToken(jwt);

    if (!decodedToken) return response.status(401).json({ 
        error: 'Authentication Error.', 
        message: 'Token has expired.' 
    });

    next();
};