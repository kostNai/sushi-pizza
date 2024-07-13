'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import ProductCardForCart from '@/components/productCardForCart/ProductCardForCart'
import {
	useBasketContext,
	useProductContext,
	errorsContext,
	isCartOpenContext
} from '@/context/userContext'
import { Product } from '../types/Product'
import styles from './styles.module.scss'
import { getProductFromOrder } from '@/src/utils/api/getProductsFromOrder'
import { updateOrder } from '@/src/utils/api/updateOrder'
import { deleteOrder } from '@/src/utils/api/deleteOrder'
import { useRouter, usePathname } from 'next/navigation'

const ADD_CATEGORY = 'додаткові товари'
const BAG = 'пакет'
export default function Cart() {
	const [productContext, setProductContext] = useProductContext()
	const [addToCardContext, setAddToCardContext] = useBasketContext()
	const [isCartOpen, setIsCartOpen] = isCartOpenContext()
	const [error, setError] = errorsContext()
	const [products, setProducts] = useState<Product[] | undefined>([])
	const [orderId, setOrderId] = useState<string | undefined>('')
	const [version, setVersion] = useState(0)
	const [totalPrice, setTotalPrice] = useState(0)
	const [token, setToken] = useState('')
	const router = useRouter()
	const pathName = usePathname()

	useEffect(() => {
		setOrderId(sessionStorage?.getItem('orderId'))
		setToken(localStorage.getItem('token'))
	}, [])

	useEffect(() => {
		if (orderId) {
			getProductFromOrder(orderId).then((data) => {
				setProducts(data.data.products)

				setTotalPrice(
					data.data.products
						.filter((product: Product) => {
							return (
								product.category.category_name.toLowerCase() !==
									ADD_CATEGORY.toLowerCase() ||
								product.product_name.toLowerCase() === BAG ||
								product.pivot.product_quantity > 2
							)
						})
						.map((product: Product) => {
							let sum: number = 0
							if (
								product.category.category_name.toLowerCase() ===
									ADD_CATEGORY.toLowerCase() &&
								product.product_name.toLowerCase() !== BAG &&
								product.pivot.product_quantity > 2
							) {
								sum +=
									product.product_price * (product.pivot.product_quantity - 2)
							} else
								sum += product.product_price * product.pivot.product_quantity
							return sum
						})
						.reduce((acc: number, currentValue: number) => acc + currentValue)
				)
			})
		}
	}, [version, orderId])

	const updateOrderHandler = async () => {
		try {
			const res = await updateOrder(orderId, token)
			if (res.status === 200) {
				return res.data
			}
		} catch (error) {
			setError(error.message)
		}
	}
	const deleteOrderHandler = async () => {
		const res = await deleteOrder(orderId)
		if (res.status === 200) {
			setOrderId(null)
			sessionStorage.removeItem('orderId')
			setProductContext([])
			setAddToCardContext(0)
			setVersion(version + 1)
			setIsCartOpen(false)
			return res
		}
	}

	const onSubmitHandler = (e: FormEvent) => {
		e.preventDefault()
		router.push(`${pathName}/confirm-order`)
	}
	return orderId ? (
		<section className={styles.cartConteiner}>
			<div className={styles.orderInfo}>
				<div className={styles.cartTitle}>
					<h2>Моє замовлення</h2>
					<h4 className={styles.clearCart} onClick={deleteOrderHandler}>
						Очистити кошик
					</h4>
				</div>

				<div className={styles.cartProducts}>
					{products.map((product: Product) => (
						<ProductCardForCart
							product={product}
							version={version}
							setVersion={setVersion}
							key={product.id}
						/>
					))}
				</div>
			</div>
			<div className={styles.orderTotal}>
				<form className={styles.cartForm} onSubmit={onSubmitHandler}>
					<input
						type="text"
						name="promo"
						placeholder="Є промокод?"
						className={styles.cartInput}
					/>
					<div className={styles.cartText}>
						<p>Товари</p>
						<p>{totalPrice} грн</p>
					</div>
					<h4 className={styles.cartTotalPrice}>{totalPrice} грн</h4>
					<button className={styles.cartBtn} type="submit">
						Оформити {totalPrice}грн
					</button>
				</form>
			</div>
		</section>
	) : (
		<div className={styles.emptyCartContainer}>
			<h2>Ваш кошик порожній.</h2>
			<div className={styles.emptyCartLinks}>
				<Link href={'/'}>На головну</Link>
				<Link href={'/menu'}>До меню</Link>
			</div>
		</div>
	)
}
