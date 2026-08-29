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
    CrewResponse,
    CrewMoviesResponse,
    CrewDetailsResponse,
} from '@/src/types/api-responses.types'
import { CrewContextType } from '@/src/types/contexts.types'
// Variables
import { endpoints } from '@/src/constants/server.constants'

// Context
export const CrewContext = createContext<CrewContextType>({} as CrewContextType)

// Hook
export const useCrew = () => {
    const context = useContext(CrewContext)
    if (!context) {
        throw new Error('useCrew must be used within a CrewProvider')
    }
    return context
}

// Provider
export default function CrewProvider({ children }: PropsWithChildren) {
    // GET /crew?search={string}
    const getAllCrew = useCallback(
        async (search?: string): Promise<CrewResponse[]> => {
            const response = await axios.get<CrewResponse[]>(
                endpoints[EndpointsEnum.CREW].getAllCrew(search)
            )
            return response.data
        },
        []
    )

    // GET /crew/:id
    const getCrewById = useCallback(
        async (id: string): Promise<CrewDetailsResponse> => {
            const response = await axios.get<CrewDetailsResponse>(
                endpoints[EndpointsEnum.CREW].getCrewById(id)
            )
            return response.data
        },
        []
    )

    // GET /crew/:id/movies
    const getCrewMovies = useCallback(
        async (id: string): Promise<CrewMoviesResponse[]> => {
            const response = await axios.get<CrewMoviesResponse[]>(
                endpoints[EndpointsEnum.CREW].getCrewMovies(id)
            )
            return response.data
        },
        []
    )

    // Context Value
    const contextValue = useMemo(
        () => ({
            getAllCrew,
            getCrewById,
            getCrewMovies,
        }),
        [getAllCrew, getCrewById, getCrewMovies]
    )

    return (
        <CrewContext.Provider value={contextValue}>
            {children}
        </CrewContext.Provider>
    )
}
