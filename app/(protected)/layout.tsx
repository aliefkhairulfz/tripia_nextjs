import { ReactNode, Suspense } from 'react'
import Sidebar from './dashboard/_components/sidebar'

interface DashboardLayoutProps {
    children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="w-full h-screen grid grid-cols-[300px_1fr] divide-x divide-neutral-900">
            <Suspense fallback={<div>Loading...</div>}>
                <Sidebar />
            </Suspense>

            <div className="p-6">{children}</div>
        </div>
    )
}
