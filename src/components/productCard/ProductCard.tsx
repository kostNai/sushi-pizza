import Image from 'next/image'
import { SlBasket } from 'react-icons/sl'
import { Suspense, useEffect, useState } from 'react'
import styles from './ProductCard.module.scss'
import { Product } from '@/app/types/Product'
import Loading from '@/app/loading'
import {
	isCartOpenContext,
	orderIdContext,
	useBasketContext,
	useProductContext
} from '@/context/userContext'
import { addNewOrder } from '@/src/utils/api/addNewOrder'
import { addToCart } from '@/src/utils/api/addToCart'

type Props = {
	product: Product
	onClick: () => void
}

export default function ProductCard({ product, onClick }: Props) {
	const token = localStorage.getItem('token')
	const [orderId, setOrderId] = orderIdContext()
	const [productContext, setProductContext] = useProductContext()
	const [addToCardContext, setAddToCardContext] = useBasketContext()
	const [isCartOpen, setIsCartOpen] = isCartOpenContext()
	useEffect(() => {}, [orderId])

	const addToCardHandler = async (product: Product) => {
		if (!isCartOpen) {
			const res = await addNewOrder(product.id.toString(), token)
			if (res.status === 200) {
				setOrderId(res.data.order.id.toString())
				setProductContext([...productContext, product])
				setAddToCardContext(addToCardContext + 1)
				setIsCartOpen(true)
			}
		} else {
			const res = await addToCart(orderId, product.id.toString())
			if (res.status === 200) {
				setProductContext([...productContext, product])
				setAddToCardContext(addToCardContext + 1)
				console.log(res)
			}
		}
	}
	return (
		<div className={styles.productCard}>
			<div>
				<Suspense fallback={<Loading />}>
					<Image
						src={
							product?.product_image
								? product.product_image
								: '/product-img.png'
						}
						width={350}
						height={200}
						alt="product image"
						className={styles.productImg}
						onClick={onClick}
					/>
				</Suspense>
			</div>
			<div className={styles.productInfo}>
				<h3 className={styles.productTitle}>{product.product_name}</h3>
				<p className={styles.productWeight}>{product.product_weight} гр.</p>
				<p className={styles.productDesc}>{product.product_desc}</p>

				<div className={styles.btnContainer}>
					<p className={styles.productPrice}>{product.product_price} грн.</p>
					<button
						className={styles.btn}
						onClick={() => addToCardHandler(product)}
					>
						Хочу!
						<SlBasket />
					</button>
				</div>
			</div>
		</div>
	)
}
