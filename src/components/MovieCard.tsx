'use client'

// Core
import Link from 'next/link'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
// Types
import { MovieCardProps } from '@/src/types/props.types'
// Style
import '@/src/styles/components/MovieCard.css'

export default function MovieCard({ movie, priority = false }: MovieCardProps) {
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
            </div>
            <div className='movie-card__content'>
                <h3 className='movie-card__title'>{movie.title}</h3>
                <div className='movie-card__meta'>
                    <span>{movie.year}</span>
                    {movie.rating != null && (
                        <span className='movie-card__rating'>
                            <FaStar className='movie-card__rating-icon' />
                            {movie.rating.toFixed(1)}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    )
}
