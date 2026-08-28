// Fonts
import { mainFont } from '@/src/fonts/fonts'
// Style
import '@/src/styles/app/layout.css'

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html lang='en'>
            <body className={`${mainFont.className}`}>{children}</body>
        </html>
    )
}
