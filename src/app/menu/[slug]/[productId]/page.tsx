'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { getProducts } from '../../../../utils/api/getProducts'
import { Product } from '../../../types/Product'
import SingleProductCard from '../../../../components/singleProductCard/SingleProductCard'
import Loading from '../../../root/loading'
import { useBasketContext } from '../../../../context/userContext'

export default function Page({ params }: { params: { productId: string } }) {
	const productId = params.productId
	const [products, setProducts] = useState<Product[] | undefined>([])
	const [product, setProduct] = useState<Product | undefined>()
	const [count, setCount] = useBasketContext()

	useEffect(() => {
		const res = getProducts().then((data) => {
			setProducts(data.data.products)
		})
	}, [])

	useEffect(() => {
		setProduct(products?.find((product: Product) => product.id == productId))
	}, [products])

	return (
		product && (
			<div>
				<SingleProductCard
					product={product}
					onClick={() => {
						setCount(count + 1)
					}}
				/>
			</div>
		)
	)
}
