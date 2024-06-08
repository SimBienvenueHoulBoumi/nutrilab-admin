export interface JwtPayload {
    sub: {
        id: string;
        username: string;
        firstname: string;
        lastname: string;
        role: string;
        password: string;
        createdAt: string;
        updatedAt: string;
    };
    iat: number;
    exp: number;
}
