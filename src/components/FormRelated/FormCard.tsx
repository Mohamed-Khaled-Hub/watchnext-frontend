// Core
import Link from 'next/link'
// Types
import { FormCardProps } from '@/src/types/props.types'
// Style
import '@/src/styles/components/FormRelated/FormCard.css'

export default function FormCard({
    title,
    subtitle,
    children,
    footerText,
    footerLinkText,
    footerLinkHref,
    className = '',
}: FormCardProps) {
    return (
        <div className={`form-card ${className}`.trim()}>
            {/* Header */}
            <header className='form-card__header'>
                <h1 className='form-card__title'>{title}</h1>
                {subtitle && <p className='form-card__subtitle'>{subtitle}</p>}
            </header>

            {/* Form Content & Banners */}
            {children}

            {/* Footer Link */}
            {footerText && footerLinkText && footerLinkHref && (
                <footer className='form-card__footer'>
                    {footerText}{' '}
                    <Link
                        href={footerLinkHref}
                        className='form-card__footer-link'
                    >
                        {footerLinkText}
                    </Link>
                </footer>
            )}
        </div>
    )
}
