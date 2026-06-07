'use client'

import { getSessionToken } from '@/utils/session'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sidebarList = [
    { label: 'Me', val: '/dashboard/me' },
    { label: 'About', val: '/dashboard/about' }
]

function Sidebar() {
    const pathname = usePathname()

    useQuery({
        queryKey: ['test'],
        queryFn: async () => {
            const sessionToken = await getSessionToken()
            return sessionToken
        }
    })

    return (
        <ul className="p-6 flex flex-col divide-y divide-neutral-900">
            {sidebarList.map((sidebar, i) => (
                <Link key={i} href={sidebar.val} className={`px-4 py-2 ${sidebar.val === pathname ? 'bg-neutral-900' : ''}`}>
                    {sidebar.label}
                </Link>
            ))}
        </ul>
    )
}

export default Sidebar
