export default function Loading() {
    return (
        <div className="min-h-screen p-8">
            <div className="mb-8 h-6 w-32 bg-zinc-800 rounded animate-pulse" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SectionSkeleton rows={4} />
                <SectionSkeleton rows={3} />
            </div>
        </div>
    )
}

function SectionSkeleton({ rows }: { rows: number }) {
    return (
        <div className="p-6 ring-1 ring-zinc-800 animate-pulse">
            <div className="h-5 w-32 bg-zinc-800 rounded mb-4 pb-2 border-b border-zinc-800" />
            <div className="space-y-3">
                {Array.from({ length: rows }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <div className="h-4 bg-zinc-800 rounded w-3/4" />
                        <div className="h-3 bg-zinc-900 rounded w-1/2" />
                    </div>
                ))}
            </div>
        </div>
    )
}
