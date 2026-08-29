// Core
import { HiXMark } from 'react-icons/hi2'
import { CgSpinner } from 'react-icons/cg'
// Types
import { DeleteAccountModalProps } from '@/src/types/props.types'
// Style
import '@/src/styles/components/DeleteAccountModal.css'

export default function DeleteAccountModal({
    isOpen,
    isDeleting,
    onClose,
    onConfirm,
}: DeleteAccountModalProps) {
    if (!isOpen) return null

    return (
        <div className='delete-account-modal__overlay'>
            <div className='delete-account-modal'>
                <div className='delete-account-modal__header'>
                    <h3 className='text-rose-500'>Delete Account</h3>
                    <button
                        type='button'
                        className='delete-account-modal__close'
                        onClick={onClose}
                    >
                        <HiXMark />
                    </button>
                </div>
                <div className='delete-account-modal__body'>
                    <p>
                        Are you sure you want to delete your account? This
                        action is permanent and will remove all your saved
                        lists.
                    </p>
                </div>
                <div className='delete-account-modal__actions'>
                    <button
                        type='button'
                        className='delete-account-modal__btn delete-account-modal__btn--cancel'
                        onClick={onClose}
                        disabled={isDeleting}
                    >
                        Cancel
                    </button>
                    <button
                        type='button'
                        className='delete-account-modal__btn delete-account-modal__btn--danger'
                        onClick={onConfirm}
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <CgSpinner className='animate-spin' />
                        ) : (
                            'Yes, Delete My Account'
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
