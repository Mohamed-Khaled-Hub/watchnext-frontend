// Core
import axios from 'axios'
import { redirect } from 'next/navigation'
// Tokens
import { getTokens, clearTokens } from '@/src/utils/tokens'

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use(
    (config) => {
        const token = getTokens()

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && typeof window !== 'undefined') {
            clearTokens()
            redirect('/')
        }
        return Promise.reject(error)
    }
)
