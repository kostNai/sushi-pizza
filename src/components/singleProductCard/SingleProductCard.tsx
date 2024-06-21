import Image from 'next/image'
import { Product } from '../../app/types/Product'
import styles from './SingleProductCard.module.scss'

type Props = {
	product: Product
	onClick: () => void
}

export default function SingleProductCard({ product, onClick }: Props) {
	return (
		<section className={styles.singleProductCardContainer}>
			<div>
				<Image
					width={600}
					height={300}
					src={product.product_image}
					alt="product image"
					className={styles.productImage}
				/>
			</div>
			<div className={styles.productInfo}>
				<h2 className={styles.productTitle}>{product.product_name}</h2>
				<p className={styles.productWeight}>Вага: {product.product_weight}г.</p>
				<div className={styles.productPriceContainer}>
					<p className={styles.productPrice}>{product.product_price}грн.</p>
					<button className={styles.buyBtn} onClick={onClick}>
						В КОШИК
					</button>
				</div>
				<p className={styles.productDesc}>{product.product_desc}</p>
			</div>
		</section>
	)
}
