// Components
import Navbar from '@/src/components/LayoutRelated/Navbar'
import MainContent from '@/src/components/LayoutRelated/MainContent'
import Footer from '@/src/components/LayoutRelated/Footer'
// Style
import '@/src/styles/app/(root)/layout.css'

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <div className='root-layout'>
            <Navbar />
            <MainContent>{children}</MainContent>
            <Footer />
        </div>
    )
}
