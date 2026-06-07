'use client'

import { getSessionToken } from '@/utils/session'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function Sidebar() {
    const sp = useSearchParams()
    const q = sp.get('q')

    const { data } = useQuery({
        queryKey: ['test'],
        queryFn: async () => {
            const sessionToken = await getSessionToken()
            return sessionToken
        }
    })

    return (
        <ul className="p-6 flex flex-col divide-y divide-neutral-900">
            <div className="px-4 py-2">Query is: {q ? q : 'empty'}</div>
            <Link href={'me'} className="px-4 py-2">
                Me
            </Link>
            <Link href={'about'} className="px-4 py-2">
                About: {data && data.split('').slice(0, 10).join('')}
            </Link>
        </ul>
    )
}

export default Sidebar
