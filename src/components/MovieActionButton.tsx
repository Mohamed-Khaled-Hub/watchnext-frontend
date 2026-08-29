// Types
import { MovieActionButtonProps } from '@/src/types/props.types'
// Constants
import { ACTION_ICONS } from '@/src/constants/ui.constans'
// Icons
import { CgSpinner } from 'react-icons/cg'
// Style
import '@/src/styles/components/MovieActionButton.css'

export default function MovieActionButton({
    label,
    activeLabel,
    isActive,
    isLoading = false,
    onClick,
    variant,
}: MovieActionButtonProps) {
    const icons = ACTION_ICONS[variant]
    const IconComponent = isActive ? icons.active : icons.default
    const displayLabel = isActive ? activeLabel || label : label

    const buttonClasses = [
        'movie-action-btn',
        `movie-action-btn--${variant}`,
        isActive ? 'movie-action-btn--active' : '',
        isLoading ? 'movie-action-btn--loading' : '',
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <button
            type='button'
            onClick={onClick}
            disabled={isLoading}
            className={buttonClasses}
        >
            {isLoading ? (
                <CgSpinner className='movie-action-btn__icon animate-spin' />
            ) : (
                <IconComponent className='movie-action-btn__icon' />
            )}
            <span>{displayLabel}</span>
        </button>
    )
}
