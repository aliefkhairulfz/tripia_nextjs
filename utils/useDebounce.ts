import { useEffect, useState } from 'react'

export function useDebounce(incomingInput: string, secondInMs: number) {
    const [input, setInput] = useState<string>('')

    useEffect(() => {
        const t = setTimeout(() => {
            setInput(incomingInput)
        }, secondInMs)

        return () => {
            clearTimeout(t)
        }
    }, [incomingInput, secondInMs])

    return [input]
}
