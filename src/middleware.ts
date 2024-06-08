import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { JwtPayload } from './interface/jwtPayload.interface'; 

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY);

export async function isValidToken(token: string, secret: Uint8Array): Promise<boolean> {
    try {
        const { payload } = await jwtVerify(token, secret) as { payload: JwtPayload };
        return payload.sub.role === 'admin';
    } catch (e) {
        return false;
    }
}

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicPage = ['/'].includes(path);

    const token = request.cookies.get('token')?.value || "";

    if (isPublicPage && await isValidToken(token, SECRET_KEY)) {
        return NextResponse.redirect(new URL("/dashboard/home", request.nextUrl));
    }

    if (!isPublicPage && !(await isValidToken(token, SECRET_KEY))) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/dashboard/home',
        '/dashboard/users',
        '/appropos'
    ],
};
