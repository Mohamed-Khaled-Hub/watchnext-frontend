// Core
import { PropsWithChildren } from 'react'
// Providers
import AuthProvider from '@/src/providers/AuthProvider'
import MeProvider from '@/src/providers/MeProvider'
import MoviesProvider from '@/src/providers/MoviesProvider'

export default function AllProviders({ children }: PropsWithChildren) {
    return (
        <MeProvider>
            <AuthProvider>
                <MoviesProvider>{children}</MoviesProvider>
            </AuthProvider>
        </MeProvider>
    )
}
