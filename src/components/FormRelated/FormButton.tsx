// Types
import { FormButtonProps } from '@/src/types/props.types'
// Style
import '@/src/styles/components/FormRelated/FormButton.css'

export default function FormButton({
    children,
    loading = false,
    loadingText,
    type = 'submit',
    disabled,
    className = '',
    ...props
}: FormButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={`form-button ${className}`.trim()}
            {...props}
        >
            {loading ? loadingText || children : children}
        </button>
    )
}
