'use client'

// Core
import { useEffect, useState, SubmitEvent, useCallback } from 'react'
// Components
import MovieCard from '@/src/components/MovieCard'
import CardSkeleton from '@/src/components/CardSkeleton'
import SearchBar from '@/src/components/SearchBar'
// Hooks
import { useMovies } from '@/src/providers/MoviesProvider'
// Types
import { MovieResponse } from '@/src/types/api-responses.types'
// Style
import '@/src/styles/app/(root)/movies/page.css'

export default function MoviesPage() {
    const { getAllMovies } = useMovies()

    const [movies, setMovies] = useState<MovieResponse[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [activeQuery, setActiveQuery] = useState('')
    const [loading, setLoading] = useState(true)

    // Fetch movies handler for explicit searches
    const fetchMovies = useCallback(
        async (query?: string) => {
            setLoading(true)
            try {
                const data = await getAllMovies(query)
                setMovies(data)
            } catch (error) {
                console.error('Failed to fetch movies:', error)
            } finally {
                setLoading(false)
            }
        },
        [getAllMovies]
    )

    // Initial fetch on page mount
    useEffect(() => {
        let isMounted = true

        const loadInitialData = async () => {
            try {
                const data = await getAllMovies()
                if (isMounted) {
                    setMovies(data)
                }
            } catch (error) {
                console.error('Failed to fetch movies:', error)
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        loadInitialData().then()

        return () => {
            isMounted = false
        }
    }, [getAllMovies])

    // Handle form submit (pressing enter or clicking search button)
    const handleSearchSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const trimmedQuery = searchQuery.trim()
        setActiveQuery(trimmedQuery)
        fetchMovies(trimmedQuery || undefined).then()
    }

    return (
        <div className='movies-page'>
            {/* Header & Search Bar */}
            <div className='movies-header'>
                <div>
                    <h1 className='movies-header__title'>All Movies</h1>
                    <p className='movies-header__subtitle'>
                        Browse through the complete library of movies
                    </p>
                </div>

                <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onSubmit={handleSearchSubmit}
                    placeholder='Search movies by title...'
                    ariaLabel='Search movies'
                />
            </div>

            {/* Movies Grid */}
            <div className='movies-grid'>
                {loading ? (
                    Array.from({ length: 10 }).map((_, idx) => (
                        <CardSkeleton key={idx} type='movie' />
                    ))
                ) : movies.length > 0 ? (
                    movies.map((movie, idx) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            priority={idx < 4}
                        />
                    ))
                ) : (
                    <p className='movies-grid__empty'>
                        {activeQuery
                            ? `No movies found matching "${activeQuery}".`
                            : 'No movies available.'}
                    </p>
                )}
            </div>
        </div>
    )
}
