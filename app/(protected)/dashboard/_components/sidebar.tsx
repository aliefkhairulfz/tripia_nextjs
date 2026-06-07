'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function Sidebar() {
    const sp = useSearchParams()
    const q = sp.get('q')

    return (
        <ul className="p-6 flex flex-col divide-y divide-neutral-900">
            <div className="px-4 py-2">Query is: {q ? q : 'empty'}</div>
            <Link href={'me'} className="px-4 py-2">
                Me
            </Link>
            <Link href={'about'} className="px-4 py-2">
                About
            </Link>
        </ul>
    )
}

export default Sidebar
