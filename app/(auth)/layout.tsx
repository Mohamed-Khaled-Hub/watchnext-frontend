// Style
import '@/src/styles/app/(auth)/layout.css'

export default function AuthLayout({ children }: LayoutProps<'/'>) {
    return <div className='auth-layout'>{children}</div>
}
