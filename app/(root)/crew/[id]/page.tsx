'use client'

// Core
import { useEffect, useState, use } from 'react'
import Image from 'next/image'
// Components
import MovieCard from '@/src/components/MovieCard'
import PageSkeleton from '@/src/components/PageSkeleton'
// Hooks
import { useCrew } from '@/src/providers/CrewProvider'
// Types
import { CrewDetailsResponse } from '@/src/types/api-responses.types'
import { PageWithParamsProps } from '@/src/types/props.types'
// Style
import '@/src/styles/app/(root)/crew/[id]/page.css'

export default function CrewDetailsPage({ params }: PageWithParamsProps) {
    const { id } = use(params)
    const { getCrewById } = useCrew()

    const [crewDetails, setCrewDetails] = useState<CrewDetailsResponse | null>(
        null
    )
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isMounted = true

        const fetchCrewMember = async () => {
            try {
                const data = (await getCrewById(
                    id
                )) as unknown as CrewDetailsResponse
                if (isMounted) {
                    setCrewDetails(data)
                }
            } catch (error) {
                console.error('Failed to fetch crew details:', error)
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        fetchCrewMember().then()

        return () => {
            isMounted = false
        }
    }, [id, getCrewById])

    if (loading) {
        return <PageSkeleton type='crew-details' />
    }

    if (!crewDetails) {
        return (
            <div className='crew-filmography__empty'>
                Crew member not found.
            </div>
        )
    }

    const directedMovies = crewDetails.directedMovies || []
    const actedMovies = crewDetails.actedMovies || []

    return (
        <div className='crew-details-page'>
            {/* Header / Profile Hero */}
            <div className='crew-profile'>
                <div className='crew-profile__avatar-wrapper'>
                    <Image
                        src={
                            crewDetails.image ||
                            '/images/placeholder-avatar.png'
                        }
                        alt={crewDetails.name}
                        fill
                        sizes='(max-width: 768px) 192px, 224px'
                        className='crew-profile__image'
                        priority
                    />
                </div>

                <div className='crew-profile__info'>
                    <h1 className='crew-profile__name'>{crewDetails.name}</h1>

                    {crewDetails.roles && crewDetails.roles.length > 0 && (
                        <div className='crew-profile__roles'>
                            {crewDetails.roles.map((role) => (
                                <span
                                    key={role}
                                    className='crew-profile__role-badge'
                                >
                                    {role}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Directed Movies Section */}
            {directedMovies.length > 0 && (
                <section className='crew-filmography'>
                    <h2 className='crew-filmography__title'>
                        Directed Movies
                        <span className='crew-filmography__count'>
                            {directedMovies.length}
                        </span>
                    </h2>
                    <div className='crew-filmography__grid'>
                        {directedMovies.map((movie, idx) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                priority={idx < 4}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* Acted Movies Section */}
            {actedMovies.length > 0 && (
                <section className='crew-filmography'>
                    <h2 className='crew-filmography__title'>
                        Acted Movies
                        <span className='crew-filmography__count'>
                            {actedMovies.length}
                        </span>
                    </h2>
                    <div className='crew-filmography__grid'>
                        {actedMovies.map((movie, idx) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                priority={idx < 4}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* Empty State */}
            {directedMovies.length === 0 && actedMovies.length === 0 && (
                <p className='crew-filmography__empty'>
                    No filmography records available for {crewDetails.name}.
                </p>
            )}
        </div>
    )
}
