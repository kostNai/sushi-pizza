'use client'

import { createContext, useContext, useState } from 'react'
import { Product } from '../app/types/Product'

const LoginContext = createContext<any>(undefined)
const BasketContext = createContext<any>(0)
const ProductContext = createContext<any>(undefined)
const SearchProductContext = createContext<any>(undefined)

export function AppWrapper({ children }: { children: React.ReactNode }) {
	const [loginContext, setLoginContext] = useState<string | undefined>('')
	const [addToCardContext, setAddToCardContext] = useState<number | undefined>(
		0
	)
	const [productContext, setProductContext] = useState<Product[] | undefined>(
		[]
	)
	const [searchProductContext, setSearchProductContext] = useState<
		boolean | undefined
	>(false)

	return (
		<LoginContext.Provider value={[loginContext, setLoginContext]}>
			<BasketContext.Provider value={[addToCardContext, setAddToCardContext]}>
				<ProductContext.Provider value={[productContext, setProductContext]}>
					<SearchProductContext.Provider
						value={[searchProductContext, setSearchProductContext]}
					>
						{children}
					</SearchProductContext.Provider>
				</ProductContext.Provider>
			</BasketContext.Provider>
		</LoginContext.Provider>
	)
}

export function useLoginContext() {
	return useContext(LoginContext)
}
export function useBasketContext() {
	return useContext(BasketContext)
}
export function useProductContext() {
	return useContext(ProductContext)
}
export function useSearchContext() {
	return useContext(SearchProductContext)
}
