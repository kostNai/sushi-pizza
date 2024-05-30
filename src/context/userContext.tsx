'use client'

import { createContext, useContext, useState } from 'react'

const UserContext = createContext<any>(undefined)

export function AppWrapper({ children }: { children: React.ReactNode }) {
	let [loginContext, setLoginContext] = useState<string | undefined>('')

	return (
		<UserContext.Provider value={[loginContext, setLoginContext]}>
			{children}
		</UserContext.Provider>
	)
}

export function useUserContext() {
	return useContext(UserContext)
}
