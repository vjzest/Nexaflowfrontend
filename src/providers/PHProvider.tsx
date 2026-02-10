'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

const phKey = process.env.NEXT_PUBLIC_POSTHOG_KEY || '';

if (typeof window !== 'undefined' && phKey && phKey !== 'ph_placeholder') {
    posthog.init(phKey, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
        person_profiles: 'always',
    })
}

export function PHProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Optional: Track initial page view or identification
    }, []);

    return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
