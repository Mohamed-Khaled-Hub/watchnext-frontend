'use client'

// Core
import Link from 'next/link'
import { useState, SubmitEvent } from 'react'
// Hooks
import { useAuth } from '@/src/providers/AuthProvider'
// Style
import '@/src/styles/app/(auth)/login/page.css'

export default function LoginPage() {
    const { login } = useAuth()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            await login(formData)
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else if (typeof err === 'string') {
                setError(err)
            } else {
                setError('Failed to sign in. Please try again.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className='login-page'>
            <div className='login-page__card'>
                {/* Header */}
                <header className='login-page__header'>
                    <h1 className='login-page__title'>Welcome back</h1>
                    <p className='login-page__subtitle'>
                        Please enter your details to sign in
                    </p>
                </header>

                {/* Error Banner */}
                {error && (
                    <div className='mb-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400 text-center'>
                        {error}
                    </div>
                )}

                {/* Main Form */}
                <form onSubmit={handleSubmit} className='login-page__form'>
                    <div className='login-page__field-group'>
                        <label htmlFor='email' className='login-page__label'>
                            Email Address
                        </label>
                        <input
                            id='email'
                            type='email'
                            required
                            placeholder='name@example.com'
                            className='login-page__input'
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className='login-page__field-group'>
                        <label htmlFor='password' className='login-page__label'>
                            Password
                        </label>
                        <input
                            id='password'
                            type='password'
                            required
                            placeholder='••••••••'
                            className='login-page__input'
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='login-page__submit-btn disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                {/* Footer Link */}
                <footer className='login-page__footer'>
                    Don&#39;t have an account?{' '}
                    <Link href='/signup' className='login-page__signup-link'>
                        Sign up
                    </Link>
                </footer>
            </div>
        </main>
    )
}
