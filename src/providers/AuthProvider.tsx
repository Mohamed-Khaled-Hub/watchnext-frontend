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
import { useRouter } from 'next/navigation'
// Enums
import { EndpointsEnum } from '@/src/enums/endpoints.enum'
// Functions
import { saveTokens, clearTokens } from '@/src/utils/tokens'
// Hooks
import { useMe } from '@/src/providers/MeProvider'
// Types
import { AuthResponse, MessageResponse } from '@/src/types/api-responses.types'
import {
    LoginDto,
    RegisterDto,
    ChangePasswordDto,
} from '@/src/types/api-requests.types'
import { AuthContextType } from '@/src/types/contexts.types'
// Variables
import { api } from '@/src/utils/api'
import { endpoints } from '@/src/constants/server.constants'

// Context
export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

// Hook
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

// Provider
export default function AuthProvider({ children }: PropsWithChildren) {
    const router = useRouter()
    const { fetchMe, clearMe } = useMe()

    // POST /auth/login
    const login = useCallback(
        async (loginData: LoginDto) => {
            const response = await axios.post<AuthResponse>(
                endpoints[EndpointsEnum.AUTH].login,
                loginData
            )

            const { accessToken } = response.data
            saveTokens(accessToken)

            try {
                await fetchMe()
            } catch (err) {
                console.error('Failed to load user profile after login:', err)
            } finally {
                router.replace('/')
            }
        },
        [fetchMe, router]
    )

    // POST /auth/register
    const register = useCallback(
        async (registerData: RegisterDto) => {
            const response = await axios.post<AuthResponse>(
                endpoints[EndpointsEnum.AUTH].register,
                registerData
            )

            const { accessToken } = response.data
            saveTokens(accessToken)

            try {
                await fetchMe()
            } catch (err) {
                console.error(
                    'Failed to load user profile after registration:',
                    err
                )
            } finally {
                router.replace('/')
            }
        },
        [fetchMe, router]
    )

    // PATCH /auth/change-password
    const changePassword = useCallback(
        async (
            changePasswordData: ChangePasswordDto
        ): Promise<MessageResponse> => {
            const response = await api.patch<MessageResponse>(
                endpoints[EndpointsEnum.AUTH].changePassword,
                changePasswordData
            )
            return response.data
        },
        []
    )

    // Logout
    const logout = useCallback(() => {
        clearTokens()
        clearMe()
        router.replace('/')
    }, [router, clearMe])

    // Context Value
    const contextValue = useMemo(
        () => ({
            login,
            register,
            changePassword,
            logout,
        }),
        [login, register, changePassword, logout]
    )

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
