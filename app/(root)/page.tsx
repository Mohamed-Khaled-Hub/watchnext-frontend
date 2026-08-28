'use client'

// Core
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
// Components
import MovieCard from '@/src/components/MovieCard'
import CrewCard from '@/src/components/CrewCard'
import CardSkeleton from '@/src/components/CardSkeleton'
// Hooks
import { useMovies } from '@/src/providers/MoviesProvider'
import { useCrew } from '@/src/providers/CrewProvider'
// Types
import { MovieResponse, CrewResponse } from '@/src/types/api-responses.types'
// Style
import '@/src/styles/app/(root)/page.css'

export default function HomePage() {
    const { getAllMovies } = useMovies()
    const { getAllCrew } = useCrew()

    const [movies, setMovies] = useState<MovieResponse[]>([])
    const [crew, setCrew] = useState<CrewResponse[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isMounted = true

        const fetchData = async () => {
            try {
                const [moviesData, crewData] = await Promise.all([
                    getAllMovies(),
                    getAllCrew(),
                ])

                if (isMounted) {
                    setMovies(moviesData.slice(0, 5))
                    setCrew(crewData.slice(0, 5))
                }
            } catch (error) {
                console.error('Failed to fetch homepage data:', error)
            } finally {
                if (isMounted) setLoading(false)
            }
        }

        fetchData()

        return () => {
            isMounted = false
        }
    }, [getAllMovies, getAllCrew])

    return (
        <div className='home-page'>
            {/* Movies Section */}
            <section className='home-section'>
                <div className='home-section__header'>
                    <div>
                        <h2 className='home-section__title'>Movies</h2>
                        <p className='home-section__subtitle'>
                            Explore trending movies and top picks
                        </p>
                    </div>
                    <Link href='/movies' className='home-section__link'>
                        <span>View all</span>
                        <FaArrowRight className='home-section__link-icon' />
                    </Link>
                </div>

                <div className='home-section__grid'>
                    {loading ? (
                        Array.from({ length: 5 }).map((_, idx) => (
                            <CardSkeleton key={idx} type='movie' />
                        ))
                    ) : movies.length > 0 ? (
                        movies
                            .slice(0, 5)
                            .map((movie, idx) => (
                                <MovieCard
                                    key={movie.id}
                                    movie={movie}
                                    priority={idx === 0}
                                />
                            ))
                    ) : (
                        <p className='home-section__empty'>
                            No movies available.
                        </p>
                    )}
                </div>
            </section>

            {/* Crew Section */}
            <section className='home-section'>
                <div className='home-section__header'>
                    <div>
                        <h2 className='home-section__title'>Crew</h2>
                        <p className='home-section__subtitle'>
                            Featured directors, writers, and cast
                        </p>
                    </div>
                    <Link href='/crew' className='home-section__link'>
                        <span>View all</span>
                        <FaArrowRight className='home-section__link-icon' />
                    </Link>
                </div>

                <div className='home-section__grid'>
                    {loading ? (
                        Array.from({ length: 5 }).map((_, idx) => (
                            <CardSkeleton key={idx} type='crew' />
                        ))
                    ) : crew.length > 0 ? (
                        crew
                            .slice(0, 5)
                            .map((member) => (
                                <CrewCard key={member.id} member={member} />
                            ))
                    ) : (
                        <p className='home-section__empty'>
                            No crew members available.
                        </p>
                    )}
                </div>
            </section>
        </div>
    )
}
