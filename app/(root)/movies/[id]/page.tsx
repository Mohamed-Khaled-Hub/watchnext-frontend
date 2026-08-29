'use client'

// Core
import { useEffect, useState, use } from 'react'
import Image from 'next/image'
import { HiStar } from 'react-icons/hi2'
// Components
import MovieCard from '@/src/components/MovieCard'
import CrewCard from '@/src/components/CrewCard'
import PageSkeleton from '@/src/components/PageSkeleton'
import MovieActionButton from '@/src/components/MovieActionButton'
// Hooks
import { useMovies } from '@/src/providers/MoviesProvider'
import { useMe } from '@/src/providers/MeProvider'
// Types
import {
    MovieDetailsResponse,
    MovieRelatedResponse,
} from '@/src/types/api-responses.types'
import { PageWithParamsProps } from '@/src/types/props.types'
// Style
import '@/src/styles/app/(root)/movies/[id]/page.css'

export default function MovieDetailsPage({ params }: PageWithParamsProps) {
    const { id } = use(params)
    const {
        getDetails,
        getRelated,
        likeMovie,
        unlikeMovie,
        watchMovie,
        unwatchMovie,
        addToWatchlist,
        removeFromWatchlist,
    } = useMovies()
    const { me, userLists } = useMe()

    const [details, setDetails] = useState<MovieDetailsResponse | null>(null)
    const [related, setRelated] = useState<MovieRelatedResponse[]>([])
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState<{
        like?: boolean
        watch?: boolean
        watchlist?: boolean
    }>({})

    useEffect(() => {
        let isMounted = true

        const fetchMovieData = async () => {
            try {
                const [detailsData, relatedData] = await Promise.all([
                    getDetails(id),
                    getRelated(id),
                ])

                if (isMounted) {
                    setDetails(detailsData)
                    setRelated(relatedData)
                }
            } catch (error) {
                console.error(
                    'Failed to fetch movie details or related movies:',
                    error
                )
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        fetchMovieData().then()

        return () => {
            isMounted = false
        }
    }, [id, getDetails, getRelated])

    // State checks using userLists from MeProvider
    const isLiked = userLists.likedMovies.some((m) => m.id === id)
    const isWatched = userLists.watchedMovies.some((m) => m.id === id)
    const isInWatchlist = userLists.watchlist.some((m) => m.id === id)

    // Handlers
    const handleToggleLike = async () => {
        try {
            setActionLoading((prev) => ({ ...prev, like: true }))
            if (isLiked) {
                await unlikeMovie(id)
            } else {
                await likeMovie(id)
            }
        } catch (error) {
            console.error('Failed to toggle like status:', error)
        } finally {
            setActionLoading((prev) => ({ ...prev, like: false }))
        }
    }

    const handleToggleWatch = async () => {
        try {
            setActionLoading((prev) => ({ ...prev, watch: true }))
            if (isWatched) {
                await unwatchMovie(id)
            } else {
                await watchMovie(id)
            }
        } catch (error) {
            console.error('Failed to toggle watch status:', error)
        } finally {
            setActionLoading((prev) => ({ ...prev, watch: false }))
        }
    }

    const handleToggleWatchlist = async () => {
        try {
            setActionLoading((prev) => ({ ...prev, watchlist: true }))
            if (isInWatchlist) {
                await removeFromWatchlist(id)
            } else {
                await addToWatchlist(id)
            }
        } catch (error) {
            console.error('Failed to toggle watchlist status:', error)
        } finally {
            setActionLoading((prev) => ({ ...prev, watchlist: false }))
        }
    }

    if (loading) {
        return <PageSkeleton type='movie-details' />
    }

    if (!details || !details.movie) {
        return <div className='movie-section__empty'>Movie not found.</div>
    }

    const { movie, directors = [], actors = [], genres = [] } = details

    return (
        <div className='movie-details-page'>
            {/* Header / Hero Section */}
            <div className='movie-hero'>
                <div className='movie-hero__poster-wrapper'>
                    <Image
                        src={movie.poster || '/images/placeholder-poster.png'}
                        alt={movie.title}
                        fill
                        sizes='(max-width: 768px) 192px, 224px'
                        className='movie-hero__poster'
                        priority
                    />
                </div>

                <div className='movie-hero__info'>
                    <h1 className='movie-hero__title'>{movie.title}</h1>

                    <div className='movie-hero__meta'>
                        <span>{movie.year}</span>
                        {movie.rating > 0 && (
                            <>
                                <span>•</span>
                                <div className='movie-hero__rating'>
                                    <HiStar className='w-4 h-4 text-amber-400' />
                                    <span>{movie.rating.toFixed(1)}</span>
                                </div>
                            </>
                        )}
                    </div>

                    {genres.length > 0 && (
                        <div className='movie-hero__genres'>
                            {genres.map((genre) => (
                                <span
                                    key={genre.id}
                                    className='movie-hero__genre-badge'
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Actions Sidebar (Visible only when user is logged in) */}
                {me && (
                    <div className='movie-hero__actions'>
                        <MovieActionButton
                            variant='like'
                            label='Like'
                            activeLabel='Liked'
                            isActive={isLiked}
                            isLoading={actionLoading.like}
                            onClick={handleToggleLike}
                        />

                        <MovieActionButton
                            variant='watch'
                            label='Mark Watched'
                            activeLabel='Watched'
                            isActive={isWatched}
                            isLoading={actionLoading.watch}
                            onClick={handleToggleWatch}
                        />

                        <MovieActionButton
                            variant='watchlist'
                            label='Add to Watchlist'
                            activeLabel='In Watchlist'
                            isActive={isInWatchlist}
                            isLoading={actionLoading.watchlist}
                            onClick={handleToggleWatchlist}
                        />
                    </div>
                )}
            </div>

            {/* Directors Section */}
            {directors.length > 0 && (
                <section className='movie-section'>
                    <h2 className='movie-section__title'>
                        Directors
                        <span className='movie-section__count'>
                            {directors.length}
                        </span>
                    </h2>
                    <div className='movie-section__grid'>
                        {directors.map((director) => (
                            <CrewCard key={director.id} member={director} />
                        ))}
                    </div>
                </section>
            )}

            {/* Actors Section */}
            {actors.length > 0 && (
                <section className='movie-section'>
                    <h2 className='movie-section__title'>
                        Cast
                        <span className='movie-section__count'>
                            {actors.length}
                        </span>
                    </h2>
                    <div className='movie-section__grid'>
                        {actors.map((actor) => (
                            <CrewCard key={actor.id} member={actor} />
                        ))}
                    </div>
                </section>
            )}

            {/* Related Movies Section */}
            {related.length > 0 && (
                <section className='movie-section'>
                    <h2 className='movie-section__title'>
                        Related Movies
                        <span className='movie-section__count'>
                            {related.length}
                        </span>
                    </h2>
                    <div className='movie-section__grid'>
                        {related.map((relatedMovie, idx) => (
                            <MovieCard
                                key={relatedMovie.id}
                                movie={relatedMovie}
                                priority={idx < 4}
                            />
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
