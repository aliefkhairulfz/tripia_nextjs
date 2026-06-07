'use server'

import { cookies } from 'next/headers'

export async function getSessionToken(): Promise<string | null> {
    const getCookies = await cookies()

    const sessionToken = getCookies.get('pickbluesession')
    if (!sessionToken || sessionToken === undefined) return null

    return sessionToken.value
}
