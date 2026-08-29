'use client'

// Core
import Link from 'next/link'
import Image from 'next/image'
import { HiStar } from 'react-icons/hi2'
// Hooks
import { useMe } from '@/src/providers/MeProvider'
// Constants
import { ACTION_ICONS } from '@/src/constants/ui.constans'
// Types
import { MovieCardProps } from '@/src/types/props.types'
// Style
import '@/src/styles/components/MovieCard.css'

export default function MovieCard({ movie, priority = false }: MovieCardProps) {
    const { me, userLists } = useMe()

    const isLiked = me && userLists.likedMovies.some((m) => m.id === movie.id)
    const isWatched =
        me && userLists.watchedMovies.some((m) => m.id === movie.id)
    const isInWatchlist =
        me && userLists.watchlist.some((m) => m.id === movie.id)

    const LikeIcon = ACTION_ICONS.like.active
    const WatchIcon = ACTION_ICONS.watch.active
    const WatchlistIcon = ACTION_ICONS.watchlist.active

    const hasBadges = me && (isLiked || isWatched || isInWatchlist)

    return (
        <Link href={`/movies/${movie.id}`} className='movie-card'>
            <div className='movie-card__image-container'>
                {movie.poster ? (
                    <Image
                        src={movie.poster}
                        alt={movie.title}
                        fill
                        sizes='(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw'
                        priority={priority}
                        className='movie-card__image'
                    />
                ) : (
                    <div className='movie-card__fallback'>{movie.title[0]}</div>
                )}

                {hasBadges && (
                    <div className='movie-card__badges'>
                        {isLiked && (
                            <span
                                className='movie-card__badge movie-card__badge--like'
                                title='Liked'
                            >
                                <LikeIcon className='movie-card__badge-icon' />
                            </span>
                        )}
                        {isWatched && (
                            <span
                                className='movie-card__badge movie-card__badge--watch'
                                title='Watched'
                            >
                                <WatchIcon className='movie-card__badge-icon' />
                            </span>
                        )}
                        {isInWatchlist && (
                            <span
                                className='movie-card__badge movie-card__badge--watchlist'
                                title='In Watchlist'
                            >
                                <WatchlistIcon className='movie-card__badge-icon' />
                            </span>
                        )}
                    </div>
                )}
            </div>

            <div className='movie-card__content'>
                <h3 className='movie-card__title'>{movie.title}</h3>
                <div className='movie-card__meta'>
                    <span>{movie.year}</span>
                    {movie.rating != null && (
                        <span className='movie-card__rating'>
                            <HiStar className='movie-card__rating-icon' />
                            {movie.rating.toFixed(1)}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    )
}
