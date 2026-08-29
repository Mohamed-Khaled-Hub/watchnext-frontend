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
import { MeContextType, UserListsState } from '@/src/types/contexts.types'
// Variables
import { api } from '@/src/utils/api'
import { endpoints } from '@/src/constants/server.constants'

// Initial State
const initialUserLists: UserListsState = {
    likedMovies: [],
    watchedMovies: [],
    watchlist: [],
}

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
    const [userLists, setUserLists] = useState<UserListsState>(initialUserLists)
    const [loading, setLoading] = useState<boolean>(
        () => typeof window !== 'undefined' && !!getTokens()
    )

    // Clear user state
    const clearMe = useCallback(() => {
        setMe(null)
        setUserLists(initialUserLists)
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

    // Refetch all 3 lists concurrently and update state
    const refetchUserLists = useCallback(async (): Promise<UserListsState> => {
        try {
            const [likedMovies, watchedMovies, watchlist] = await Promise.all([
                fetchLikedMovies(),
                fetchWatchedMovies(),
                fetchWatchlist(),
            ])

            const updatedLists: UserListsState = {
                likedMovies,
                watchedMovies,
                watchlist,
            }

            setUserLists(updatedLists)
            return updatedLists
        } catch (error) {
            console.error('Failed to refetch user movie lists:', error)
            return initialUserLists
        }
    }, [fetchLikedMovies, fetchWatchedMovies, fetchWatchlist])

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
            .then(async (response) => {
                if (isMounted) {
                    setMe(response.data)
                }
                // Fetch lists after confirming user session
                const [likedMovies, watchedMovies, watchlist] =
                    await Promise.all([
                        fetchLikedMovies(),
                        fetchWatchedMovies(),
                        fetchWatchlist(),
                    ])

                if (isMounted) {
                    setUserLists({
                        likedMovies,
                        watchedMovies,
                        watchlist,
                    })
                }
            })
            .catch(() => {
                if (isMounted) {
                    setMe(null)
                    setUserLists(initialUserLists)
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
    }, [fetchLikedMovies, fetchWatchedMovies, fetchWatchlist])

    // Context Value
    const contextValue = useMemo(
        () => ({
            me,
            loading,
            userLists,
            fetchMe,
            fetchLikedMovies,
            fetchWatchedMovies,
            fetchWatchlist,
            fetchUserTaste,
            refetchUserLists,
            deleteMe,
            clearMe,
        }),
        [
            me,
            loading,
            userLists,
            fetchMe,
            fetchLikedMovies,
            fetchWatchedMovies,
            fetchWatchlist,
            fetchUserTaste,
            refetchUserLists,
            deleteMe,
            clearMe,
        ]
    )

    return (
        <MeContext.Provider value={contextValue}>{children}</MeContext.Provider>
    )
}
