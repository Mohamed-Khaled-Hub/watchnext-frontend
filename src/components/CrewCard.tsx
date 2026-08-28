'use client'

// Core
import Link from 'next/link'
import Image from 'next/image'
// Types
import { CrewCardProps } from '@/src/types/props.types'
// Style
import '@/src/styles/components/CrewCard.css'

export default function CrewCard({ member }: CrewCardProps) {
    return (
        <Link href={`/crew/${member.id}`} className='crew-card'>
            <div className='crew-card__avatar-container'>
                {member.image ? (
                    <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes='96px'
                        className='crew-card__avatar'
                    />
                ) : (
                    <div className='crew-card__fallback'>{member.name[0]}</div>
                )}
            </div>
            <div className='crew-card__content'>
                <h3 className='crew-card__name'>{member.name}</h3>
                {member.roles && member.roles.length > 0 && (
                    <p className='crew-card__roles'>
                        {member.roles.join(', ')}
                    </p>
                )}
            </div>
        </Link>
    )
}
