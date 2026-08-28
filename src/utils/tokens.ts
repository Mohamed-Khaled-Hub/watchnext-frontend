// Core
import Cookies from 'js-cookie'

export const tokenKey = process.env.NEXT_PUBLIC_TOKEN_KEY as string

export function getTokens(): string | null {
    return Cookies.get(tokenKey) || null
}

export function saveTokens(newTokens: string): void {
    try {
        Cookies.set(tokenKey, newTokens, {
            expires: 7,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
        })
    } catch (err) {
        console.error('Failed to write tokens to cookies:', err)
    }
}

export function clearTokens(): void {
    try {
        Cookies.remove(tokenKey, { path: '/' })
    } catch (err) {
        console.error('Failed to remove tokens from cookies:', err)
    }
}
