'use client'

// Core
import { PropsWithChildren, createContext, useContext, useMemo } from 'react'
// Hooks
import { useMe } from '@/src/providers/MeProvider'
// Types
import { NavigationLink, FooterSection } from '@/src/types/ui.types'
import { NavigationContextType } from '@/src/types/contexts.types'

// Context
export const NavigationContext = createContext<NavigationContextType>(
    {} as NavigationContextType
)

// Hook
export const useNavigation = () => {
    const context = useContext(NavigationContext)
    if (!context) {
        throw new Error(
            'useNavigation must be used within a NavigationProvider'
        )
    }
    return context
}

// Provider
export default function NavigationProvider({ children }: PropsWithChildren) {
    const { me } = useMe()

    // Static Navigation Links
    const navLinks: NavigationLink[] = useMemo(
        () => [
            { label: 'Home', href: '/' },
            { label: 'Movies', href: '/movies' },
            { label: 'Crew', href: '/crew' },
        ],
        []
    )

    // Dynamic Footer Sections based on Auth state
    const footerSections: FooterSection[] = useMemo(
        () => [
            {
                title: 'Navigation',
                links: navLinks,
            },
            {
                title: 'Account',
                links: me
                    ? [{ label: 'Profile', href: '/profile' }]
                    : [
                          { label: 'Sign In', href: '/login' },
                          { label: 'Sign Up', href: '/register' },
                      ],
            },
        ],
        [me, navLinks]
    )

    // Context Value
    const contextValue = useMemo(
        () => ({
            navLinks,
            footerSections,
        }),
        [navLinks, footerSections]
    )

    return (
        <NavigationContext.Provider value={contextValue}>
            {children}
        </NavigationContext.Provider>
    )
}
