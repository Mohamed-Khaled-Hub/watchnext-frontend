// Types
import { CardSkeletonProps } from '@/src/types/props.types'
// Style
import '@/src/styles/components/CardSkeleton.css'

export default function CardSkeleton({ type = 'movie' }: CardSkeletonProps) {
    if (type === 'crew') {
        return (
            <div className='card-skeleton card-skeleton--crew'>
                <div className='card-skeleton__media' />
                <div className='card-skeleton__content'>
                    <div className='card-skeleton__title' />
                    <div className='card-skeleton__subtitle' />
                </div>
            </div>
        )
    }

    return (
        <div className='card-skeleton card-skeleton--movie'>
            <div className='card-skeleton__media' />
            <div className='card-skeleton__content'>
                <div className='card-skeleton__title' />
                <div className='card-skeleton__meta'>
                    <div className='card-skeleton__badge' />
                    <div className='card-skeleton__badge' />
                </div>
            </div>
        </div>
    )
}
