import Image from 'next/image'
import { SlBasket } from 'react-icons/sl'
import styles from './ProductCard.module.scss'
import { Product } from '../../app/types/Product'
import { Suspense } from 'react'
import Loading from '../../app/loading'
import { useBasketContext, useProductContext } from '../../context/userContext'

type Props = {
	product: Product
	onClick: () => void
}

export default function ProductCard({ product, onClick }: Props) {
	const [productContext, setProductContext] = useProductContext()
	const [addToCardContext, setAddToCardContext] = useBasketContext()
	const addToCardHandler = (product: Product) => {
		setProductContext([...productContext, product])
		setAddToCardContext(addToCardContext + 1)
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
