'use client'

// Components
import CardSkeleton from '@/src/components/CardSkeleton'
// Types
import { PageSkeletonProps } from '@/src/types/props.types'
// Style
import '@/src/styles/components/PageSkeleton.css'

export default function PageSkeleton({
    type = 'movie-details',
}: PageSkeletonProps) {
    if (type === 'crew-details') {
        return (
            <div className='page-skeleton page-skeleton--crew-details'>
                {/* Profile Hero Skeleton */}
                <div className='page-skeleton__profile'>
                    <div className='page-skeleton__avatar' />
                    <div className='page-skeleton__info'>
                        <div className='page-skeleton__title' />
                        <div className='page-skeleton__badges'>
                            <div className='page-skeleton__badge' />
                            <div className='page-skeleton__badge' />
                        </div>
                    </div>
                </div>

                {/* Filmography Section Skeleton */}
                <div className='page-skeleton__grid'>
                    {Array.from({ length: 5 }).map((_, idx) => (
                        <CardSkeleton key={idx} type='movie' />
                    ))}
                </div>
            </div>
        )
    }

    if (type === 'movie-details') {
        return (
            <div className='page-skeleton page-skeleton--movie-details'>
                {/* Hero Skeleton */}
                <div className='page-skeleton__hero'>
                    <div className='page-skeleton__poster' />
                    <div className='page-skeleton__info'>
                        <div className='page-skeleton__title' />
                        <div className='page-skeleton__subtext' />
                        <div className='page-skeleton__badges'>
                            <div className='page-skeleton__badge' />
                            <div className='page-skeleton__badge' />
                            <div className='page-skeleton__badge' />
                        </div>
                    </div>
                </div>

                {/* Cast / Directors Skeleton */}
                <div className='space-y-4'>
                    <div className='page-skeleton__subtext' />
                    <div className='page-skeleton__grid'>
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <CardSkeleton key={idx} type='crew' />
                        ))}
                    </div>
                </div>

                {/* Related Movies Skeleton */}
                <div className='space-y-4'>
                    <div className='page-skeleton__subtext' />
                    <div className='page-skeleton__grid'>
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <CardSkeleton key={idx} type='movie' />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}
