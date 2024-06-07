import { useState } from 'react'
import { Category } from '../../app/types/Category'
import { Product } from '../../app/types/Product'
import { deleteProduct } from '../../utils/api/deleteProduct'
import styles from './ProductsTable.module.scss'

type Props = {
	products: Product[]
	editProduct: () => void
	version: number
	setVersion: (version: number) => void
}

const ProductTable = ({
	products,
	editProduct,
	version,
	setVersion
}: Props) => {
	const [isLoading, setIsLoading] = useState<boolean | undefined>(false)
	const token = localStorage.getItem('token')
	const deleteProductHandler = (id: string) => {
		setIsLoading(true)
		const res = deleteProduct(token, id).then((data) => {
			if (data.status === 200) {
				setIsLoading(false)
				setVersion(version + 1)
			}
		})
	}
	return (
		<div className={styles.productsContainer}>
			<table className={styles.productsTable}>
				<thead>
					<tr>
						<th>id</th>
						<th>Назва</th>
						<th>Опис</th>
						<th>Ціна</th>
						<th>Вага</th>
						<th>Категорія</th>
						<th>Дії</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product: Product) => (
						<tr key={product.id}>
							<td>{product.id}</td>
							<td>{product.product_name}</td>
							<td>{product.product_desc}</td>
							<td>{`${product.product_price} грн`}</td>
							<td>{`${product.product_weight}гр`}</td>
							<td>{product.category?.category_name}</td>
							<td>
								<button
									className={`${styles.btn} ${styles.deleteProductBtn}`}
									onClick={() => deleteProductHandler(product.id)}
									disabled={isLoading}
								>
									Видалити
								</button>
								<button
									className={`${styles.btn} ${styles.editProductBtn}`}
									onClick={editProduct}
								>
									Змінити
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
export default ProductTable
