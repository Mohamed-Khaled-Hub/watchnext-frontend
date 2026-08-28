// Types
import { FormErrorProps } from '@/src/types/props.types'
// Style
import '@/src/styles/components/FormRelated/FormError.css'

export default function FormError({ message, className = '' }: FormErrorProps) {
    if (!message) return null

    return <div className={`form-error ${className}`.trim()}>{message}</div>
}
