'use client'

// Core
import Link from 'next/link'
import { useState, SubmitEvent } from 'react'
// Hooks
import { useAuth } from '@/src/providers/AuthProvider'
// Style
import '@/src/styles/app/(auth)/signup/page.css'

export default function SignupPage() {
    const { register } = useAuth()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.')
            setLoading(false)
            return
        }

        try {
            await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            })
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else if (typeof err === 'string') {
                setError(err)
            } else {
                setError('Failed to create account. Please try again.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className='signup-page'>
            <div className='signup-page__card'>
                {/* Header */}
                <header className='signup-page__header'>
                    <h1 className='signup-page__title'>Create an account</h1>
                    <p className='signup-page__subtitle'>
                        Enter your information to get started
                    </p>
                </header>

                {/* Error Banner */}
                {error && (
                    <div className='mb-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400 text-center'>
                        {error}
                    </div>
                )}

                {/* Main Form */}
                <form onSubmit={handleSubmit} className='signup-page__form'>
                    <div className='signup-page__field-group'>
                        <label htmlFor='name' className='signup-page__label'>
                            Full Name
                        </label>
                        <input
                            id='name'
                            type='text'
                            required
                            placeholder='John Doe'
                            className='signup-page__input'
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className='signup-page__field-group'>
                        <label htmlFor='email' className='signup-page__label'>
                            Email Address
                        </label>
                        <input
                            id='email'
                            type='email'
                            required
                            placeholder='name@example.com'
                            className='signup-page__input'
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className='signup-page__field-group'>
                        <label
                            htmlFor='password'
                            className='signup-page__label'
                        >
                            Password
                        </label>
                        <input
                            id='password'
                            type='password'
                            required
                            placeholder='••••••••'
                            className='signup-page__input'
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className='signup-page__field-group'>
                        <label
                            htmlFor='confirmPassword'
                            className='signup-page__label'
                        >
                            Confirm Password
                        </label>
                        <input
                            id='confirmPassword'
                            type='password'
                            required
                            placeholder='••••••••'
                            className='signup-page__input'
                            value={formData.confirmPassword}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    confirmPassword: e.target.value,
                                })
                            }
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='signup-page__submit-btn disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                {/* Footer Link */}
                <footer className='signup-page__footer'>
                    Already have an account?{' '}
                    <Link href='/login' className='signup-page__login-link'>
                        Sign in
                    </Link>
                </footer>
            </div>
        </main>
    )
}
