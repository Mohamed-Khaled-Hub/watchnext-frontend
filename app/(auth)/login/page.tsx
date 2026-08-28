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
            <FormCard
                title='Welcome back'
                subtitle='Please enter your details to sign in'
                footerText="Don't have an account?"
                footerLinkText='Sign up'
                footerLinkHref='/signup'
            >
                {/* Error Banner */}
                <FormError message={error} />

                {/* Main Form */}
                <form onSubmit={handleSubmit} className='login-page__form'>
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

                    <FormButton loading={loading} loadingText='Signing in...'>
                        Sign in
                    </FormButton>
                </form>
            </FormCard>
        </main>
    )
}
