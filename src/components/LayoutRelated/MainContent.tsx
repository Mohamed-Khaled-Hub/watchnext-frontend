// Types
import { MainContentProps } from '@/src/types/props.types'
// Style
import '@/src/styles/components/LayoutRelated/MainContent.css'

export default function MainContent({
    children,
    className = '',
}: MainContentProps) {
    return (
        <main className={`main-content ${className}`.trim()}>{children}</main>
    )
}
