import { RequestHandler, Request, Response } from 'express';
import { Category, CategoryInstance } from '../database/models/Category';
import { 
    CategoryRequestParams, 
    CategoryRequestBody,
    CategorySerialized,
    CategoriesDataSerialized,
    CategoryQuery,
    DeleteCategorySuccess,
} from '../types/CategoryTypes';

import { ActionError } from '../types/CommonTypes';
import bcrypt from 'bcrypt';
import { LoginCredentials, TokenData, UserAuthenticated } from '../types/AuthTypes';
import { User, UserInstance } from '../database/models/User';
import { createToken, createCookie } from '../helpers/Tokenizer';
import { isLoginCredentials } from '../guards/LoginCredentialsGuard';

/**
 * Login user.
 */
const login: RequestHandler<{}, UserAuthenticated|ActionError> 
    = async (
        request: Request<{}, UserAuthenticated|ActionError, LoginCredentials, {}>, 
        response: Response<UserAuthenticated|ActionError>
) => {

    let payload: LoginCredentials = request.body;

    if(!isLoginCredentials(payload)) return response.status(400).json({
        error: 'Authentication Error.',
        message: `The login credentaials must be 'email' and 'password'.`
    });

    let user: UserInstance|null = await User.findOne({
        where: {
            email: payload.email
        }
    });

    if(!user || (user && !(await bcrypt.compare(payload.password, user.password)))) return response.status(404).json({
        error: 'Authentication Error.',
        message: `Wrong credentials.`
    });

    user.password = await bcrypt.hash(payload.password, 8);

    await user.save();

    let tokenData: TokenData = createToken(user);

    response.setHeader('Set-Cookie', [createCookie(tokenData)]);

    let loggedIn: UserAuthenticated = {
        ...tokenData,
        id: user.id,
        name: user.name,
        email: user.email
    };

    return response.status(200).json(loggedIn);
};

export {
    login,
};