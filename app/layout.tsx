// Fonts
import { mainFont } from '@/src/fonts/fonts'
// Providers
import AllProviders from '@/src/providers/AllProviders'
// Style
import '@/src/styles/app/layout.css'

export default function AppLayout({ children }: LayoutProps<'/'>) {
    return (
        <html lang='en'>
            <body className={`${mainFont.className}`}>
                <AllProviders>{children}</AllProviders>
            </body>
        </html>
    )
}
