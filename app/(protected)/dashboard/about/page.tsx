import { getSessionToken } from '@/utils/session'
import { Suspense } from 'react'

type Aircraft = {
    manufacturer: string
    model: string
    engine_type: string
    engine_thrust_lb_ft: string
    max_speed_knots: string
    cruise_speed_knots: string
    ceiling_ft: string
    takeoff_ground_run_ft: string
    landing_ground_roll_ft: string
    gross_weight_lbs: string
    empty_weight_lbs: string
    length_ft: string
    height_ft: string
    wing_span_ft: string
    range_nautical_miles: string
}

type Productlike = {
    product_id: string
    user_id: string
}

type Productpreviewimage = {
    id: string
    created_at: string
    updated_at: string
    product_id: string
    media_url: string
}

type Creator = {
    id: string
    name: string
    email: string
    image: null | string
    verified_at: string
    deleted_at: null
    created_at: string
    updated_at: string
}

type Products = {
    id: string
    name: string
    created_at: string
    updated_at: string
    creator_id: string
    categories: string[]
    description: string
    details: string
    slug: string
    price: number
    likes_count: number
    downloads_count: number
    tags: string[]
    creator: Creator
    product_preview_images: Productpreviewimage[]
    product_likes: Productlike[]
}

type SuccessResponse = {
    ok: true
    status_code: number
    message: string
    data: Products[]
    meta: Record<string, string>
}

type ErrorResponse = {
    ok: false
    status_code: number
    message: string
    data: Record<string, string>
}

async function fetchAircraft() {
    const response = await fetch('https://api.api-ninjas.com/v1/aircraft?manufacturer=Gulfstream&model=G550', {
        method: 'GET',
        headers: {
            'X-Api-Key': process.env.NEXT_PUBLIC_RECIPE_NINJA_API_KEY!,
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    })

    const data: Aircraft[] = await response.json()
    return data
}

async function fetchProducts() {
    const createPath = 'products?category=all&min_price=0&max_price=0&sort_by=created_at'
    await new Promise(res => setTimeout(res, 5000))
    const response = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_URL}/${createPath}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    })

    const products: SuccessResponse | ErrorResponse = await response.json()
    return products
}

function AboutPage() {
    return (
        <div className="min-h-screen p-8 text-zinc-100">
            <div className="mb-8 font-bold text-lg tracking-wider">About Page</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Suspense fallback={<SectionSkeleton title="Aircraft List" rows={4} />}>
                    <AircraftSection />
                </Suspense>

                <Suspense fallback={<SectionSkeleton title="Product List" rows={3} />}>
                    <ProductsSection />
                </Suspense>
            </div>
        </div>
    )
}

function SectionSkeleton({ title, rows }: { title: string; rows: number }) {
    return (
        <div className="p-6 ring-1 ring-zinc-800 animate-pulse">
            <h2 className="text-xl font-bold mb-4 tracking-wide border-b border-zinc-800 pb-2 text-zinc-600">{title}</h2>
            <div className="space-y-3">
                {Array.from({ length: rows }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <div className="h-4 bg-zinc-800 w-3/4" />
                        <div className="h-3 bg-zinc-900 w-1/2" />
                    </div>
                ))}
            </div>
        </div>
    )
}

async function AircraftSection() {
    const aircraftData = await fetchAircraft()
    const session = await getSessionToken()
    console.log({ session })

    return (
        <div className="p-6 rounded-none ring-1 ring-zinc-800 h-fit">
            <h2 className="text-xl font-bold mb-4 tracking-wide border-b border-zinc-800 pb-2">Aircraft List</h2>
            <ul className="space-y-2">
                {aircraftData.map((ac, i) => (
                    <li key={i} className="font-semibold text-zinc-300">
                        {ac.manufacturer} — {ac.model}
                    </li>
                ))}
            </ul>
        </div>
    )
}

async function ProductsSection() {
    const productsResponse = await fetchProducts()
    const session = await getSessionToken()
    console.log({ session })

    return (
        <div className="p-6 rounded-none ring-1 ring-zinc-800">
            <h2 className="text-xl font-bold mb-4 tracking-wide border-b border-zinc-800 pb-2">Product List</h2>
            {productsResponse.ok ? (
                <div className="space-y-4">
                    {productsResponse.data.map(product => (
                        <div key={product.id} className="border-b border-zinc-900 pb-4 last:border-0 last:pb-0">
                            <h3 className="font-bold text-white text-lg">{product.name}</h3>
                            <p className="text-sm text-zinc-400 mt-1 line-clamp-2 font-normal">{product.description}</p>
                            <div className="mt-3 flex items-center justify-between text-xs">
                                <span className="font-bold text-zinc-200 bg-zinc-900 px-2 py-1 ring-1 ring-zinc-800">PRICE: ${product.price}</span>
                                <span className="text-zinc-500">
                                    By: <span className="text-blue-400 hover:underline cursor-pointer font-semibold">{product.creator.name}</span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-red-400 font-semibold text-sm tracking-wider">Failed to load products: {productsResponse.message}</p>
            )}
        </div>
    )
}

export default AboutPage
