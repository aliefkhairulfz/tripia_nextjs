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

function AboutPage() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <AboutPageContent />
            </Suspense>
        </div>
    )
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

async function AboutPageContent() {
    const data = await fetchAircraft()
    const sessionToken = await getSessionToken()
    console.log({ sessionToken })

    return (
        <>
            <div>this is about page</div>
            <ul>
                {data.map((ac, i) => (
                    <li key={i}>{ac.model}</li>
                ))}
            </ul>
        </>
    )
}

export default AboutPage
