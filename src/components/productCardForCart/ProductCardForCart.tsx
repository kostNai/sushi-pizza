import Image from 'next/image'
import { GoPlus } from 'react-icons/go'
import { FiMinus } from 'react-icons/fi'
import { CiCircleRemove } from 'react-icons/ci'

import { Product } from '../../app/types/Product'
import styles from './ProductCardForCart.module.scss'
import { orderIdContext } from '@/src/context/userContext'
import { addToCart } from '@/src/utils/api/addToCart'
import { removeFromCart } from '@/src/utils/api/removeFromCart'

type Props = {
	product: Product
	version: number
	setVersion: (version: number) => void
}
export default function ProductCardForCart({
	product,
	version,
	setVersion
}: Props) {
	const [orderId, setOrderId] = orderIdContext()

	const addToOrderHandler = async (productId: string) => {
		const res = await addToCart(orderId, productId)
		if (res.status === 200) {
			console.log(res.data)
			setVersion(version + 1)
		}
	}
	const removeFromOrderHandler = async (productId: string) => {
		const res = await removeFromCart(productId, orderId)
		if (res.status === 200) {
			console.log(res.data)
			setVersion(version + 1)
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
						className={styles.changeProductCount}
						onClick={() => removeFromOrderHandler(product.id)}
					/>
					<p>{product.pivot.product_quantity}</p>
					<GoPlus
						size={25}
						className={styles.changeProductCount}
						onClick={() => addToOrderHandler(product.id)}
					/>
				</div>
				<div className={styles.productPriceContainer}>
					<p className={styles.productPrice}>
						{product.pivot.product_quantity * product.product_price}грн.
					</p>
					<CiCircleRemove size={25} className={styles.removeProduct} />
				</div>
			</div>
		</div>
	)
}
