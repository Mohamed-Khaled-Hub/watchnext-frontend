'use client'

// Core
import { useState, SubmitEvent } from 'react'
// Hooks
import { useAuth } from '@/src/providers/AuthProvider'
// Components
import FormCard from '@/src/components/FormRelated/FormCard'
import FormInput from '@/src/components/FormRelated/FormInput'
import FormButton from '@/src/components/FormRelated/FormButton'
import FormError from '@/src/components/FormRelated/FormError'
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
            <FormCard
                title='Create an account'
                subtitle='Enter your information to get started'
                footerText='Already have an account?'
                footerLinkText='Sign in'
                footerLinkHref='/login'
            >
                {/* Error Banner */}
                <FormError message={error} />

                {/* Main Form */}
                <form onSubmit={handleSubmit} className='signup-page__form'>
                    <FormInput
                        id='name'
                        label='Full Name'
                        type='text'
                        required
                        placeholder='John Doe'
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            })
                        }
                    />

                    <FormInput
                        id='email'
                        label='Email Address'
                        type='email'
                        required
                        placeholder='name@example.com'
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                email: e.target.value,
                            })
                        }
                    />

                    <FormInput
                        id='password'
                        label='Password'
                        isPassword
                        required
                        placeholder='••••••••'
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                    />

                    <FormInput
                        id='confirmPassword'
                        label='Confirm Password'
                        isPassword
                        required
                        placeholder='••••••••'
                        value={formData.confirmPassword}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                confirmPassword: e.target.value,
                            })
                        }
                    />

                    <FormButton
                        loading={loading}
                        loadingText='Creating Account...'
                    >
                        Create Account
                    </FormButton>
                </form>
            </FormCard>
        </main>
    )
}
