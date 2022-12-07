
export interface LoginCredentials {
    email: string;
    password: string;
};

export interface UserAuthenticated extends TokenData {
    id: number;
    name: string;
    email: string;
};

export interface TokenData {
    token: string;
    expiresIn: number;
};

export interface DataStoredInToken {
    _id: string;
};