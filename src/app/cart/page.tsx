'use client'

import Link from 'next/link'
import ProductCardForCart from '../../components/productCardForCart/ProductCardForCart'
import { useBasketContext, useProductContext } from '../../context/userContext'
import { Product } from '../types/Product'
import styles from './styles.module.scss'

export default function Cart() {
	const [productContext, setProductContext] = useProductContext()
	const [addToCardContext, setAddToCardContext] = useBasketContext()

	const removeAllProductsHandler = () => {
		setProductContext([])
		setAddToCardContext(0)
	}

	return addToCardContext > 0 ? (
		<section className={styles.cartConteiner}>
			<div className={styles.orderInfo}>
				<div className={styles.cartTitle}>
					<h2>Моє замовлення</h2>
					<h4 className={styles.clearCart} onClick={removeAllProductsHandler}>
						Очистити кошик
					</h4>
				</div>
				<div className={styles.cartProducts}>
					{productContext.map((product: Product) => (
						<ProductCardForCart
							product={product}
							onClick={() => {}}
							key={product.id}
						/>
					))}
				</div>
			</div>
			<div className={styles.orderTotal}>
				<form className={styles.cartForm}>
					<input
						type="text"
						name="promo"
						placeholder="Є промокод?"
						className={styles.cartInput}
					/>
					<div className={styles.cartText}>
						<p>Товари</p>
						<p>Total price</p>
					</div>
					<h4 className={styles.cartTotalPrice}>Total price</h4>
					<button className={styles.cartBtn}>Замовити</button>
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
