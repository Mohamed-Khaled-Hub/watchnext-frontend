// Core
import { PropsWithChildren } from 'react'
// Providers
import AuthProvider from '@/src/providers/AuthProvider'
import MeProvider from '@/src/providers/MeProvider'
import MoviesProvider from '@/src/providers/MoviesProvider'
import CrewProvider from '@/src/providers/CrewProvider'
import NavigationProvider from '@/src/providers/NavigationProvider'

export default function AllProviders({ children }: PropsWithChildren) {
    return (
        <MeProvider>
            <NavigationProvider>
                <AuthProvider>
                    <MoviesProvider>
                        <CrewProvider>{children}</CrewProvider>
                    </MoviesProvider>
                </AuthProvider>
            </NavigationProvider>
        </MeProvider>
    )
}
