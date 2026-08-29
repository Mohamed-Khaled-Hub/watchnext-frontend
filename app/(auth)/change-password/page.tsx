'use client'

// Core
import { useState, SubmitEvent } from 'react'
import { useRouter } from 'next/navigation'
// Hooks
import { useAuth } from '@/src/providers/AuthProvider'
// Components
import FormCard from '@/src/components/FormRelated/FormCard'
import FormInput from '@/src/components/FormRelated/FormInput'
import FormButton from '@/src/components/FormRelated/FormButton'
import FormError from '@/src/components/FormRelated/FormError'
// Style
import '@/src/styles/app/(auth)/change-password/page.css'

export default function ChangePasswordPage() {
    const router = useRouter()
    const { changePassword } = useAuth()

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setSuccessMessage(null)

        // Basic front-end validation
        if (formData.newPassword !== formData.confirmPassword) {
            setError('New passwords do not match.')
            return
        }

        setLoading(true)

        try {
            await changePassword({
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
            })
            setSuccessMessage('Password changed successfully!')

            // Redirect back to profile page after brief confirmation
            setTimeout(() => {
                router.push('/profile')
            }, 1500)
        } catch (err) {
            if (err instanceof Error) {
                console.error(err)
                setError(err.message)
            } else if (typeof err === 'string') {
                setError(err)
            } else {
                setError('Failed to change password. Please try again.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className='change-password-page'>
            <FormCard
                title='Change Password'
                subtitle='Update your account security credentials'
                footerText='Back to account?'
                footerLinkText='Profile'
                footerLinkHref='/profile'
            >
                {/* Error Banner */}
                <FormError message={error} />

                {/* Success Banner */}
                {successMessage && (
                    <div className='change-password-page__success'>
                        {successMessage}
                    </div>
                )}

                {/* Main Form */}
                <form
                    onSubmit={handleSubmit}
                    className='change-password-page__form'
                >
                    <FormInput
                        id='currentPassword'
                        label='Current Password'
                        isPassword
                        required
                        placeholder='••••••••'
                        value={formData.currentPassword}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                currentPassword: e.target.value,
                            })
                        }
                    />

                    <FormInput
                        id='newPassword'
                        label='New Password'
                        isPassword
                        required
                        placeholder='••••••••'
                        value={formData.newPassword}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                newPassword: e.target.value,
                            })
                        }
                    />

                    <FormInput
                        id='confirmPassword'
                        label='Confirm New Password'
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
                        loadingText='Updating password...'
                    >
                        Update Password
                    </FormButton>
                </form>
            </FormCard>
        </main>
    )
}
