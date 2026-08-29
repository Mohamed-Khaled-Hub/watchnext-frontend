'use client'

// Core
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
    HiHeart,
    HiEye,
    HiBookmark,
    HiKey,
    HiTrash,
    HiEnvelope,
} from 'react-icons/hi2'
import { CgSpinner } from 'react-icons/cg'
// Hooks
import { useMe } from '@/src/providers/MeProvider'
// Components
import MovieCard from '@/src/components/MovieCard'
import DeleteAccountModal from '@/src/components/DeleteAccountModal'
// Types
import { TabType } from '@/src/types/ui.types'
// Styles
import '@/src/styles/app/(root)/profile/page.css'

export default function ProfilePage() {
    const router = useRouter()
    const { me, loading, userLists, deleteMe } = useMe()

    // Hydration fix guard
    const [isMounted, setIsMounted] = useState(false)

    const [activeTab, setActiveTab] = useState<TabType>('liked')

    // Modal State for Delete Account
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isDeletingAccount, setIsDeletingAccount] = useState(false)

    useEffect(() => {
        Promise.resolve().then(() => {
            setIsMounted(true)
        })
    }, [])

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

    // Handle initial client mount and auth redirects
    useEffect(() => {
        if (isMounted && !loading && !me) {
            router.replace('/login')
        }
    }, [isMounted, loading, me, router])

    // Prevent hydration mismatch: render loading spinner until mounted on client
    if (!isMounted || loading || !me) {
        return (
            <div className='profile-page__loading'>
                <CgSpinner className='profile-page__loading-spinner animate-spin' />
            </div>
        )
    }

    // Handle Delete Account
    const handleDeleteAccount = async () => {
        try {
            setIsDeletingAccount(true)
            await deleteMe()
            router.replace('/')
        } catch (err) {
            console.error('Failed to delete account:', err)
            setIsDeletingAccount(false)
        }
    }

    // Tab items config
    const tabs = [
        {
            id: 'liked' as TabType,
            label: 'Liked Movies',
            icon: HiHeart,
            count: userLists.likedMovies.length,
            movies: userLists.likedMovies,
            activeColor: 'profile-page__tab--liked',
        },
        {
            id: 'watched' as TabType,
            label: 'Watched Movies',
            icon: HiEye,
            count: userLists.watchedMovies.length,
            movies: userLists.watchedMovies,
            activeColor: 'profile-page__tab--watched',
        },
        {
            id: 'watchlist' as TabType,
            label: 'Watchlist',
            icon: HiBookmark,
            count: userLists.watchlist.length,
            movies: userLists.watchlist,
            activeColor: 'profile-page__tab--watchlist',
        },
    ]

    const activeTabData = tabs.find((t) => t.id === activeTab)!
    return (
        <main className='profile-page'>
            <div className='profile-page__container'>
                {/* Header Section */}
                <section className='profile-page__header'>
                    <div className='profile-page__avatar-wrapper'>
                        <div className='profile-page__avatar'>
                            {getInitial()}
                        </div>
                    </div>

                    <div className='profile-page__user-details'>
                        <h1 className='profile-page__username'>{me.name}</h1>
                        <div className='profile-page__meta-list'>
                            <span className='profile-page__meta-item'>
                                <HiEnvelope className='profile-page__meta-icon' />
                                {me.email}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Tabs Section */}
                <section className='profile-page__content'>
                    <div className='profile-page__tabs'>
                        {tabs.map((tab) => {
                            const Icon = tab.icon
                            const isActive = activeTab === tab.id
                            return (
                                <button
                                    key={tab.id}
                                    type='button'
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`profile-page__tab ${
                                        isActive
                                            ? `profile-page__tab--active ${tab.activeColor}`
                                            : ''
                                    }`}
                                >
                                    <Icon className='profile-page__tab-icon' />
                                    <span>{tab.label}</span>
                                    <span className='profile-page__tab-count'>
                                        {tab.count}
                                    </span>
                                </button>
                            )
                        })}
                    </div>

                    {/* Movie Grid */}
                    {activeTabData.movies.length > 0 ? (
                        <div className='profile-page__grid'>
                            {activeTabData.movies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <div className='profile-page__empty-state'>
                            <p>
                                No movies added to your{' '}
                                {activeTabData.label.toLowerCase()} yet.
                            </p>
                        </div>
                    )}
                </section>

                {/* Account Actions Section */}
                <section className='profile-page__actions'>
                    <h2 className='profile-page__actions-title'>
                        Account Settings
                    </h2>
                    <div className='profile-page__actions-buttons'>
                        <Link
                            href='/change-password'
                            className='profile-page__btn profile-page__btn--password'
                        >
                            <HiKey className='profile-page__btn-icon' />
                            Change Password
                        </Link>
                        <button
                            type='button'
                            className='profile-page__btn profile-page__btn--delete'
                            onClick={() => setIsDeleteModalOpen(true)}
                        >
                            <HiTrash className='profile-page__btn-icon' />
                            Delete Account
                        </button>
                    </div>
                </section>
            </div>

            {/* Delete Account Confirmation Modal */}
            <DeleteAccountModal
                isOpen={isDeleteModalOpen}
                isDeleting={isDeletingAccount}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteAccount}
            />
        </main>
    )
}
