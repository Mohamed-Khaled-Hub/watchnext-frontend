// Enums
import { EndpointsEnum } from '@/src/enums/endpoints.enum'

export const server = process.env.NEXT_PUBLIC_SERVER_ENDPOINT

export const endpoints = {
    [EndpointsEnum.AUTH]: {
        login: `${server}/${EndpointsEnum.AUTH}/login`,
        register: `${server}/${EndpointsEnum.AUTH}/register`,
        changePassword: `${server}/${EndpointsEnum.AUTH}/change-password`,
    },
    [EndpointsEnum.CREW]: {
        getAllCrew: (search?: string) =>
            search
                ? `${server}/${EndpointsEnum.CREW}?search=${encodeURIComponent(search)}`
                : `${server}/${EndpointsEnum.CREW}`,
        getCrewById: (id: string) => `${server}/${EndpointsEnum.CREW}/${id}`,
        getCrewMovies: (id: string) =>
            `${server}/${EndpointsEnum.CREW}/${id}/movies`,
    },
    [EndpointsEnum.ME]: {
        getMe: `${server}/${EndpointsEnum.ME}`,
        getLikedMovies: `${server}/${EndpointsEnum.ME}/liked`,
        getWatchedMovies: `${server}/${EndpointsEnum.ME}/watched`,
        getWatchlist: `${server}/${EndpointsEnum.ME}/watchlist`,
        getUserTaste: `${server}/${EndpointsEnum.ME}/taste`,
        deleteMe: `${server}/${EndpointsEnum.ME}`,
    },
    [EndpointsEnum.MOVIES]: {
        getAllMovies: (search?: string) =>
            search
                ? `${server}/${EndpointsEnum.MOVIES}?search=${encodeURIComponent(search)}`
                : `${server}/${EndpointsEnum.MOVIES}`,
        getMovieById: (id: string) => `${server}/${EndpointsEnum.MOVIES}/${id}`,
        getDetails: (id: string) =>
            `${server}/${EndpointsEnum.MOVIES}/${id}/details`,
        getRelated: (id: string) =>
            `${server}/${EndpointsEnum.MOVIES}/${id}/related`,
        getConnections: (id: string, targetId: string) =>
            `${server}/${EndpointsEnum.MOVIES}/${id}/connections/${targetId}`,
        likeMovie: (id: string) =>
            `${server}/${EndpointsEnum.MOVIES}/${id}/like`,
        unlikeMovie: (id: string) =>
            `${server}/${EndpointsEnum.MOVIES}/${id}/like`,
        watchMovie: (id: string) =>
            `${server}/${EndpointsEnum.MOVIES}/${id}/watch`,
        unwatchMovie: (id: string) =>
            `${server}/${EndpointsEnum.MOVIES}/${id}/watch`,
        addToWatchlist: (id: string) =>
            `${server}/${EndpointsEnum.MOVIES}/${id}/watchlist`,
        removeFromWatchlist: (id: string) =>
            `${server}/${EndpointsEnum.MOVIES}/${id}/watchlist`,
    },
    [EndpointsEnum.RECOMMENDATIONS]: {
        getRecommendations: `${server}/${EndpointsEnum.RECOMMENDATIONS}`,
    },
}
