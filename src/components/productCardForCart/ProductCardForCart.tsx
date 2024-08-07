import Image from 'next/image'
import { GoPlus } from 'react-icons/go'
import { FiMinus } from 'react-icons/fi'
import { CiCircleRemove } from 'react-icons/ci'

import { Product } from '../../app/types/Product'
import styles from './ProductCardForCart.module.scss'
import { addToCart } from '@/src/utils/api/addToCart'
import { removeFromCart } from '@/src/utils/api/removeFromCart'
import { deleteFromCart } from '@/src/utils/api/deleteFromCart'
import { useBasketContext } from '@/src/context/userContext'
import { useEffect, useRef, useState } from 'react'

type Props = {
	product: Product
	version: number
	setVersion: (version: number) => void
}
const ADD_CATEGORY = 'додаткові товари'

const STICKS = 'Палички для їжі'
const SAUCE = 'Соєвий соус'
const BAG = 'Пакет'
const WASABI = 'НАБІР ІМБИР ВАСАБІ 1 ПОРЦІЯ'
export default function ProductCardForCart({
	product,
	version,
	setVersion
}: Props) {
	const orderId = sessionStorage.getItem('orderId')
	const [addToCardContext, setAddToCardContext] = useBasketContext()

	const disabledItems =
		(product.product_name.toLocaleLowerCase().match(STICKS.toLowerCase()) &&
			product.pivot.product_quantity < 3) ||
		(product.product_name.toLocaleLowerCase().match(SAUCE.toLowerCase()) &&
			product.pivot.product_quantity < 3) ||
		(product.product_name.toLocaleLowerCase().match(WASABI.toLowerCase()) &&
			product.pivot.product_quantity < 3)

	const addToOrderHandler = async (productId: string) => {
		const res = await addToCart(orderId, productId)
		if (res.status === 200) {
			setAddToCardContext(addToCardContext + 1)
			setVersion(version + 1)
		}
	}
	const removeFromOrderHandler = async (productId: string) => {
		const res = await removeFromCart(productId, orderId)
		if (res.status === 200) {
			setAddToCardContext(addToCardContext - 1)
			setVersion(version + 1)
		}
	}
	const deleteFromOrderHandler = async (productId: string) => {
		const res = await deleteFromCart(productId, orderId)
		if (res.status === 200) {
			setVersion(version + 1)
			setAddToCardContext(0)
		}
	}

	return (
		<div className={styles.productCard}>
			<div className={styles.productInfo}>
				<div>
					<Image
						width={120}
						height={60}
						src={product.product_image}
						alt="product image"
					/>
				</div>
				<div className={styles.productNameContainer}>
					<p className={styles.productName}>{product.product_name}</p>
					<p>{product.product_weight}г</p>
				</div>
			</div>
			<div className={styles.productTotalPrice}>
				<div className={styles.productCount}>
					<FiMinus
						size={25}
						className={
							product.product_name !== 'ПАКЕТ'
								? styles.changeProductCount
								: styles.invisible
						}
						onClick={() => removeFromOrderHandler(product.id)}
					/>
					<p>{product.pivot.product_quantity}</p>

					<GoPlus
						size={25}
						className={
							product.product_name !== 'ПАКЕТ'
								? styles.changeProductCount
								: styles.invisible
						}
						onClick={() => addToOrderHandler(product.id)}
					/>
				</div>
				<div className={styles.productPriceContainer}>
					{disabledItems ? (
						<p className={styles.productFreePrice}>Безкоштовно</p>
					) : (
						<p className={styles.productPrice}>
							{product.category.category_name.toLowerCase() ===
								ADD_CATEGORY.toLowerCase() &&
							product.product_name.toLowerCase() !== BAG &&
							product.pivot.product_quantity > 2
								? (product.pivot.product_quantity - 2) * product.product_price
								: product.pivot.product_quantity * product.product_price}{' '}
							<span>грн.</span>
						</p>
					)}
					<CiCircleRemove
						size={25}
						className={styles.removeProduct}
						onClick={() => deleteFromOrderHandler(product.id)}
					/>
				</div>
			</div>
		</div>
	)
}
