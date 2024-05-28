'use client'

import { SessionProvider } from 'next-auth/react'
import React from 'react'

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return <SessionProvider refetchInterval={60 * 60}>{children}</SessionProvider>
}
