'use client'

// Core
import Link from 'next/link'
// Hooks
import { useNavigation } from '@/src/providers/NavigationProvider'
// Style
import '@/src/styles/components/LayoutRelated/Footer.css'

export default function Footer() {
    const { footerSections } = useNavigation()

    return (
        <footer className='footer'>
            <div className='footer__container'>
                {/* Brand Column */}
                <div className='footer__brand'>
                    <Link href='/public' className='footer__logo'>
                        WatchNext
                    </Link>
                    <p className='footer__description'>
                        Discover what to watch next with personalized
                        recommendations and curated lists.
                    </p>
                </div>

                {/* Dynamic Navigation Sections */}
                {footerSections.map((section) => (
                    <div key={section.title} className='footer__section'>
                        <h2 className='footer__heading'>{section.title}</h2>
                        <div className='footer__links'>
                            {section.links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className='footer__link'
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Section */}
            <div className='footer__bottom'>
                <div className='footer__bottom-container'>
                    <p>
                        &copy; {new Date().getFullYear()} WatchNext. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
