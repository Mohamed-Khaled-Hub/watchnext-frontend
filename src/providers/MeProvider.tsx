'use client'

// Core
import {
    PropsWithChildren,
    createContext,
    useContext,
    useCallback,
    useState,
    useEffect,
    useMemo,
} from 'react'
// Enums
import { EndpointsEnum } from '@/src/enums/endpoints.enum'
// Functions
import { getTokens, clearTokens } from '@/src/utils/tokens'
// Types
import {
    UserResponse,
    MovieResponse,
    TasteResponse,
    MessageResponse,
} from '@/src/types/api-responses.types'
import { MeContextType } from '@/src/types/contexts.type'
// Variables
import { api } from '@/src/utils/api'
import { endpoints } from '@/src/constants/server.constants'

// Context
export const MeContext = createContext<MeContextType>({} as MeContextType)

// Hook
export const useMe = () => {
    const context = useContext(MeContext)
    if (!context) {
        throw new Error('useMe must be used within a MeProvider')
    }
    return context
}

// Provider
export default function MeProvider({ children }: PropsWithChildren) {
    const [me, setMe] = useState<UserResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(
        () => typeof window !== 'undefined' && !!getTokens()
    )

    // Clear user state
    const clearMe = useCallback(() => {
        setMe(null)
    }, [])

    // GET /me
    const fetchMe = useCallback(async (): Promise<UserResponse | null> => {
        try {
            setLoading(true)
            const response = await api.get<UserResponse>(
                endpoints[EndpointsEnum.ME].getMe
            )
            setMe(response.data)
            return response.data
        } catch {
            setMe(null)
            return null
        } finally {
            setLoading(false)
        }
    }, [])

    // GET /me/liked
    const fetchLikedMovies = useCallback(async (): Promise<MovieResponse[]> => {
        const response = await api.get<MovieResponse[]>(
            endpoints[EndpointsEnum.ME].getLikedMovies
        )
        return response.data
    }, [])

    // GET /me/watched
    const fetchWatchedMovies = useCallback(async (): Promise<
        MovieResponse[]
    > => {
        const response = await api.get<MovieResponse[]>(
            endpoints[EndpointsEnum.ME].getWatchedMovies
        )
        return response.data
    }, [])

    // GET /me/watchlist
    const fetchWatchlist = useCallback(async (): Promise<MovieResponse[]> => {
        const response = await api.get<MovieResponse[]>(
            endpoints[EndpointsEnum.ME].getWatchlist
        )
        return response.data
    }, [])

    // GET /me/taste
    const fetchUserTaste = useCallback(async (): Promise<TasteResponse[]> => {
        const response = await api.get<TasteResponse[]>(
            endpoints[EndpointsEnum.ME].getUserTaste
        )
        return response.data
    }, [])

    // DELETE /me
    const deleteMe = useCallback(async (): Promise<MessageResponse> => {
        const response = await api.delete<MessageResponse>(
            endpoints[EndpointsEnum.ME].deleteMe
        )
        clearTokens()
        clearMe()
        return response.data
    }, [clearMe])

    // Initial mount check
    useEffect(() => {
        let isMounted = true
        const token = getTokens()

        if (!token) {
            return
        }

        api.get<UserResponse>(endpoints[EndpointsEnum.ME].getMe)
            .then((response) => {
                if (isMounted) {
                    setMe(response.data)
                }
            })
            .catch(() => {
                if (isMounted) {
                    setMe(null)
                }
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false)
                }
            })

        return () => {
            isMounted = false
        }
    }, [])

    // Context Value
    const contextValue = useMemo(
        () => ({
            me,
            loading,
            fetchMe,
            fetchLikedMovies,
            fetchWatchedMovies,
            fetchWatchlist,
            fetchUserTaste,
            deleteMe,
            clearMe,
        }),
        [
            me,
            loading,
            fetchMe,
            fetchLikedMovies,
            fetchWatchedMovies,
            fetchWatchlist,
            fetchUserTaste,
            deleteMe,
            clearMe,
        ]
    )

    return (
        <MeContext.Provider value={contextValue}>{children}</MeContext.Provider>
    )
}
