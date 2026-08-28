'use client'

// Core
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiLogIn, FiLogOut } from 'react-icons/fi'
// Hooks
import { useAuth } from '@/src/providers/AuthProvider'
import { useMe } from '@/src/providers/MeProvider'
import { useNavigation } from '@/src/providers/NavigationProvider'
// Style
import '@/src/styles/components/LayoutRelated/Navbar.css'

export default function Navbar() {
    const pathname = usePathname()
    const { me } = useMe()
    const { logout } = useAuth()
    const { navLinks } = useNavigation()

    // Helper functions for user's name formatting
    const getFirstName = () => {
        if (!me) return ''
        if (me.name) return me.name.trim().split(' ')[0]
        if (me.email) return me.email.split('@')[0]
        return 'User'
    }

    const getInitial = () => {
        const firstName = getFirstName()
        return firstName ? firstName.charAt(0).toUpperCase() : 'U'
    }

    return (
        <nav className='navbar'>
            {/* Top Bar: Logo & Auth Action */}
            <div className='navbar__top'>
                <Link href='/' className='navbar__logo'>
                    WatchNext
                </Link>

                <div className='navbar__user-section'>
                    {me ? (
                        <div className='navbar__logged-in-container'>
                            {/* Greeting & Logout Option */}
                            <div className='navbar__user-details'>
                                <span className='navbar__user-greeting'>
                                    Hello, {getFirstName()}
                                </span>
                                <button
                                    type='button'
                                    onClick={logout}
                                    className='navbar__logout-btn'
                                >
                                    <FiLogOut className='w-3 h-3' />
                                    Sign out
                                </button>
                            </div>

                            {/* Profile Avatar Circle */}
                            <Link
                                href='/profile'
                                className='navbar__avatar'
                                title='View Profile'
                            >
                                {getInitial()}
                            </Link>
                        </div>
                    ) : (
                        <Link href='/login' className='navbar__login-btn'>
                            <FiLogIn className='w-4 h-4' />
                            Sign in
                        </Link>
                    )}
                </div>
            </div>

            {/* Bottom Bar: Navigation Links */}
            <div className='navbar__bottom'>
                {navLinks.map((item) => {
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`navbar__nav-link ${
                                isActive ? 'navbar__nav-link--active' : ''
                            }`}
                        >
                            {item.label}
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
