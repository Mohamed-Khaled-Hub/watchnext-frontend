'use client'

// Core
import { useEffect, useState, SubmitEvent, useCallback } from 'react'
// Components
import CrewCard from '@/src/components/CrewCard'
import CardSkeleton from '@/src/components/CardSkeleton'
import SearchBar from '@/src/components/SearchBar'
// Hooks
import { useCrew } from '@/src/providers/CrewProvider'
// Types
import { CrewResponse } from '@/src/types/api-responses.types'
// Style
import '@/src/styles/app/(root)/crew/page.css'

export default function CrewPage() {
    const { getAllCrew } = useCrew()

    const [crew, setCrew] = useState<CrewResponse[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [activeQuery, setActiveQuery] = useState('')
    const [loading, setLoading] = useState(true)

    // Fetch crew handler for explicit searches
    const fetchCrew = useCallback(
        async (query?: string) => {
            setLoading(true)
            try {
                const data = await getAllCrew(query)
                setCrew(data)
            } catch (error) {
                console.error('Failed to fetch crew members:', error)
            } finally {
                setLoading(false)
            }
        },
        [getAllCrew]
    )

    // Initial fetch on page mount
    useEffect(() => {
        let isMounted = true

        const loadInitialData = async () => {
            try {
                const data = await getAllCrew()
                if (isMounted) {
                    setCrew(data)
                }
            } catch (error) {
                console.error('Failed to fetch crew members:', error)
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
    }, [getAllCrew])

    // Handle form submit (pressing enter or clicking search button)
    const handleSearchSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const trimmedQuery = searchQuery.trim()
        setActiveQuery(trimmedQuery)
        fetchCrew(trimmedQuery || undefined).then()
    }

    return (
        <div className='crew-page'>
            {/* Header & Search Bar */}
            <div className='crew-header'>
                <div>
                    <h1 className='crew-header__title'>All Crew</h1>
                    <p className='crew-header__subtitle'>
                        Browse through directors, writers, actors, and creators
                    </p>
                </div>

                <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onSubmit={handleSearchSubmit}
                    placeholder='Search crew by name...'
                    ariaLabel='Search crew'
                />
            </div>

            {/* Crew Grid */}
            <div className='crew-grid'>
                {loading ? (
                    Array.from({ length: 10 }).map((_, idx) => (
                        <CardSkeleton key={idx} type='crew' />
                    ))
                ) : crew.length > 0 ? (
                    crew.map((member) => (
                        <CrewCard key={member.id} member={member} />
                    ))
                ) : (
                    <p className='crew-grid__empty'>
                        {activeQuery
                            ? `No crew members found matching "${activeQuery}".`
                            : 'No crew members available.'}
                    </p>
                )}
            </div>
        </div>
    )
}
