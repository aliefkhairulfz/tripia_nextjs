'use client'

import { getSessionToken } from '@/utils/session'
import { useDebounce } from '@/utils/useDebounce'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const sidebarList = [
    { label: 'Me', val: '/dashboard/me' },
    { label: 'About', val: '/dashboard/about' }
]

function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const [search, setSearch] = useState<string>('')
    const [debouncedSearch] = useDebounce(search, 500)

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams.toString())
        if (term !== '') params.set('query', term)
        else params.delete('query')

        router.push(`${pathname}?${params.toString()}`)
    }

    useQuery({
        queryKey: ['test'],
        queryFn: async () => {
            const sessionToken = await getSessionToken()
            return sessionToken
        }
    })

    useEffect(() => {
        handleSearch(debouncedSearch)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch])

    return (
        <ul className="p-6 flex flex-col divide-y divide-neutral-900">
            <input
                value={search}
                onChange={e => {
                    setSearch(e.target.value)
                }}
                type="text"
                placeholder="search with this"
                className="outline-none px-4 py-2 border-b mb-10"
            />
            {sidebarList.map((sidebar, i) => (
                <Link key={i} href={sidebar.val} className={`px-4 py-2 ${sidebar.val === pathname ? 'bg-neutral-900' : ''}`}>
                    {sidebar.label}
                </Link>
            ))}
        </ul>
    )
}

export default Sidebar
