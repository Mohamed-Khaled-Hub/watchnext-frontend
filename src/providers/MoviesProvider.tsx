'use client'

// Core
import axios from 'axios'
import {
    PropsWithChildren,
    createContext,
    useContext,
    useCallback,
    useMemo,
} from 'react'
// Enums
import { EndpointsEnum } from '@/src/enums/endpoints.enum'
// Types
import {
    MovieResponse,
    MovieDetailsResponse,
    MovieRelatedResponse,
    MovieConnectionResponse,
    MessageResponse,
} from '@/src/types/api-responses.types'
import { MoviesContextType } from '@/src/types/contexts.types'
// Variables
import { api } from '@/src/utils/api'
import { endpoints } from '@/src/constants/server.constants'

// Context
export const MoviesContext = createContext<MoviesContextType>(
    {} as MoviesContextType
)

// Hook
export const useMovies = () => {
    const context = useContext(MoviesContext)
    if (!context) {
        throw new Error('useMovies must be used within a MoviesProvider')
    }
    return context
}

// Provider
export default function MoviesProvider({ children }: PropsWithChildren) {
    // GET /movies?search={string}
    const getAllMovies = useCallback(
        async (search?: string): Promise<MovieResponse[]> => {
            const response = await axios.get<MovieResponse[]>(
                endpoints[EndpointsEnum.MOVIES].getAllMovies(search)
            )
            return response.data
        },
        []
    )

    // GET /movies/:id
    const getMovieById = useCallback(
        async (id: string): Promise<MovieResponse> => {
            const response = await axios.get<MovieResponse>(
                endpoints[EndpointsEnum.MOVIES].getMovieById(id)
            )
            return response.data
        },
        []
    )

    // GET /movies/:id/details
    const getDetails = useCallback(
        async (id: string): Promise<MovieDetailsResponse> => {
            const response = await axios.get<MovieDetailsResponse>(
                endpoints[EndpointsEnum.MOVIES].getDetails(id)
            )
            return response.data
        },
        []
    )

    // GET /movies/:id/related
    const getRelated = useCallback(
        async (id: string): Promise<MovieRelatedResponse[]> => {
            const response = await axios.get<MovieRelatedResponse[]>(
                endpoints[EndpointsEnum.MOVIES].getRelated(id)
            )
            return response.data
        },
        []
    )

    // GET /movies/:id/connections/:targetId
    const getConnections = useCallback(
        async (
            id: string,
            targetId: string
        ): Promise<MovieConnectionResponse> => {
            const response = await axios.get<MovieConnectionResponse>(
                endpoints[EndpointsEnum.MOVIES].getConnections(id, targetId)
            )
            return response.data
        },
        []
    )

    // POST /movies/:id/like
    const likeMovie = useCallback(
        async (id: string): Promise<MessageResponse> => {
            const response = await api.post<MessageResponse>(
                endpoints[EndpointsEnum.MOVIES].likeMovie(id)
            )
            return response.data
        },
        []
    )

    // DELETE /movies/:id/like
    const unlikeMovie = useCallback(
        async (id: string): Promise<MessageResponse> => {
            const response = await api.delete<MessageResponse>(
                endpoints[EndpointsEnum.MOVIES].unlikeMovie(id)
            )
            return response.data
        },
        []
    )

    // POST /movies/:id/watch
    const watchMovie = useCallback(
        async (id: string): Promise<MessageResponse> => {
            const response = await api.post<MessageResponse>(
                endpoints[EndpointsEnum.MOVIES].watchMovie(id)
            )
            return response.data
        },
        []
    )

    // DELETE /movies/:id/watch
    const unwatchMovie = useCallback(
        async (id: string): Promise<MessageResponse> => {
            const response = await api.delete<MessageResponse>(
                endpoints[EndpointsEnum.MOVIES].unwatchMovie(id)
            )
            return response.data
        },
        []
    )

    // POST /movies/:id/watchlist
    const addToWatchlist = useCallback(
        async (id: string): Promise<MessageResponse> => {
            const response = await api.post<MessageResponse>(
                endpoints[EndpointsEnum.MOVIES].addToWatchlist(id)
            )
            return response.data
        },
        []
    )

    // DELETE /movies/:id/watchlist
    const removeFromWatchlist = useCallback(
        async (id: string): Promise<MessageResponse> => {
            const response = await api.delete<MessageResponse>(
                endpoints[EndpointsEnum.MOVIES].removeFromWatchlist(id)
            )
            return response.data
        },
        []
    )

    // Context Value
    const contextValue = useMemo(
        () => ({
            getAllMovies,
            getMovieById,
            getDetails,
            getRelated,
            getConnections,
            likeMovie,
            unlikeMovie,
            watchMovie,
            unwatchMovie,
            addToWatchlist,
            removeFromWatchlist,
        }),
        [
            getAllMovies,
            getMovieById,
            getDetails,
            getRelated,
            getConnections,
            likeMovie,
            unlikeMovie,
            watchMovie,
            unwatchMovie,
            addToWatchlist,
            removeFromWatchlist,
        ]
    )

    return (
        <MoviesContext.Provider value={contextValue}>
            {children}
        </MoviesContext.Provider>
    )
}
