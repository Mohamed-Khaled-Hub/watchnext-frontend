// Core
import { FaSearch } from 'react-icons/fa'
// Types
import { SearchBarProps } from '@/src/types/props.types'
// Style
import '@/src/styles/components/SearchBar.css'

export default function SearchBar({
    value,
    onChange,
    onSubmit,
    placeholder = 'Search...',
    ariaLabel = 'Search',
}: SearchBarProps) {
    return (
        <form onSubmit={onSubmit} className='search-bar'>
            <input
                type='text'
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className='search-bar__input'
            />
            <button
                type='submit'
                className='search-bar__button'
                aria-label={ariaLabel}
            >
                <FaSearch className='search-bar__icon' />
                <span>Search</span>
            </button>
        </form>
    )
}
