// Core
import {
    ButtonHTMLAttributes,
    InputHTMLAttributes,
    PropsWithChildren,
    SubmitEvent,
} from 'react'
// Types
import { CrewResponse, MovieResponse } from '@/src/types/api-responses.types'

export type PageWithParamsProps = {
    params: Promise<{ id: string }>
}

export type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string
    isPassword?: boolean
}

export type FormButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
    PropsWithChildren & {
        loading?: boolean
        loadingText?: string
        className?: string
    }

export type FormErrorProps = {
    message?: string | null
    className?: string
}

export type FormCardProps = PropsWithChildren & {
    title: string
    subtitle?: string
    footerText?: string
    footerLinkText?: string
    footerLinkHref?: string
    className?: string
}

export type MainContentProps = PropsWithChildren & {
    className?: string
}

export type MovieCardProps = {
    movie: MovieResponse
    priority?: boolean
}

export type CrewCardProps = {
    member: CrewResponse
}

export type CardSkeletonProps = {
    type?: 'movie' | 'crew'
}

export type SearchBarProps = {
    value: string
    onChange: (value: string) => void
    onSubmit: (e: SubmitEvent<HTMLFormElement>) => void
    placeholder?: string
    ariaLabel?: string
}

export type PageSkeletonProps = {
    type?: 'movie-details' | 'crew-details'
}

export type MovieActionButtonProps = {
    label: string
    activeLabel?: string
    isActive: boolean
    isLoading?: boolean
    onClick: () => void | Promise<void>
    variant: 'like' | 'watch' | 'watchlist'
}
