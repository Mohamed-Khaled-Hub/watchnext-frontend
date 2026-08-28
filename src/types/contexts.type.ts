// Types
import {
    LoginDto,
    RegisterDto,
    ChangePasswordDto,
} from '@/src/types/api-requests.types'
import {
    UserResponse,
    MovieResponse,
    MessageResponse,
    TasteResponse,
    MovieDetailsResponse,
    MovieRelatedResponse,
    MovieConnectionResponse,
} from '@/src/types/api-responses.types'

export type AuthContextType = {
    login: (loginData: LoginDto) => Promise<void>
    register: (registerData: RegisterDto) => Promise<void>
    changePassword: (
        changePasswordData: ChangePasswordDto
    ) => Promise<MessageResponse>
    logout: () => void
}

export type MeContextType = {
    me: UserResponse | null
    loading: boolean
    fetchMe: () => Promise<UserResponse | null>
    fetchLikedMovies: () => Promise<MovieResponse[]>
    fetchWatchedMovies: () => Promise<MovieResponse[]>
    fetchWatchlist: () => Promise<MovieResponse[]>
    fetchUserTaste: () => Promise<TasteResponse[]>
    deleteMe: () => Promise<MessageResponse>
    clearMe: () => void
}

export type MoviesContextType = {
    getAllMovies: (search?: string) => Promise<MovieResponse[]>
    getMovieById: (id: string) => Promise<MovieResponse>
    getDetails: (id: string) => Promise<MovieDetailsResponse>
    getRelated: (id: string) => Promise<MovieRelatedResponse[]>
    getConnections: (
        id: string,
        targetId: string
    ) => Promise<MovieConnectionResponse>
    likeMovie: (id: string) => Promise<MessageResponse>
    unlikeMovie: (id: string) => Promise<MessageResponse>
    watchMovie: (id: string) => Promise<MessageResponse>
    unwatchMovie: (id: string) => Promise<MessageResponse>
    addToWatchlist: (id: string) => Promise<MessageResponse>
    removeFromWatchlist: (id: string) => Promise<MessageResponse>
}
