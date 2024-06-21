'use client'

import { createContext, useContext, useState } from 'react'

const UserContext = createContext<any>(undefined)
const BasketContext = createContext<any>(0)

export function AppWrapper({ children }: { children: React.ReactNode }) {
	const [loginContext, setLoginContext] = useState<string | undefined>('')
	const [addToCardContext, setAddToCardContext] = useState<number | undefined>(
		0
	)

	return (
		<UserContext.Provider value={[loginContext, setLoginContext]}>
			<BasketContext.Provider value={[addToCardContext, setAddToCardContext]}>
				{children}
			</BasketContext.Provider>
		</UserContext.Provider>
	)
}

export function useUserContext() {
	return useContext(UserContext)
}
export function useBasketContext() {
	return useContext(BasketContext)
}
