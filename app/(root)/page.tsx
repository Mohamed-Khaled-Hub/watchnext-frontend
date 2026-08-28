'use client'

// Core
import { useEffect } from 'react'
// Hooks
import { useMovies } from '@/src/providers/MoviesProvider'

export default function Home() {
    const { getAllMovies } = useMovies()

    useEffect(() => {
        let isMounted = true

        getAllMovies()
            .then((movies) => {
                if (isMounted) {
                    console.log('Movies fetched:', movies)
                }
            })
            .catch((error) => {
                console.error('Failed to fetch movies:', error)
            })

        return () => {
            isMounted = false
        }
    }, [getAllMovies])

    return <div>Hello</div>
}
