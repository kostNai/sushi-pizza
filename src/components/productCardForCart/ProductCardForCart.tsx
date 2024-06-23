import Image from 'next/image'
import { GoPlus } from 'react-icons/go'
import { FiMinus } from 'react-icons/fi'
import { CiCircleRemove } from 'react-icons/ci'

import { Product } from '../../app/types/Product'
import styles from './ProductCardForCart.module.scss'

type Props = {
	product: Product
	onClick: () => void
}

export default function ProductCardForCart({ product, onClick }: Props) {
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
					<GoPlus size={25} className={styles.changeProductCount} />
					<p>1шт</p>
					<FiMinus size={25} className={styles.changeProductCount} />
				</div>
				<p className={styles.productPrice}>{product.product_price}грн.</p>
				<CiCircleRemove size={25} className={styles.removeProduct} />
			</div>
		</div>
	)
}
