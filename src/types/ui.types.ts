export type NavigationLink = {
    label: string
    href: string
}

export type FooterSection = {
    title: string
    links: NavigationLink[]
}

export type TabType = 'liked' | 'watched' | 'watchlist'
