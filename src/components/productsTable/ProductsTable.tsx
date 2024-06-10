import { FormEvent, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { Product } from '../../app/types/Product'
import { deleteProduct } from '../../utils/api/deleteProduct'
import styles from './ProductsTable.module.scss'
import EditProductForm from '../editProductForm/EditProductForm'
import { editProduct } from '../../utils/api/editProduct'

type Props = {
	products: Product[]
	version: number
	setVersion: (version: number) => void
}

const ProductTable = ({ products, version, setVersion }: Props) => {
	const [isLoading, setIsLoading] = useState<boolean | undefined>(false)
	const [isEdit, setIsEdit] = useState<boolean | undefined>(false)
	const [newProduct, setNewProduct] = useState<Product | undefined>({
		product_name: '',
		product_desc: '',
		product_price: 0,
		product_weight: 0,
		product_image: ''
	})

	const [productId, setProductId] = useState<string | undefined>('')

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
	const editProductstart = (id: string) => {
		setProductId(id)
		setIsEdit(true)
	}

	const editProductHandler = (e: FormEvent, id: string) => {
		e.preventDefault()
		setIsLoading(true)
		const res = editProduct(token, id, newProduct).then((data) => {
			if (data.status === 200) {
				setVersion(version + 1)
				setIsLoading(false)
				setIsEdit(false)
			}
		})
	}
	const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
	}
	const onChangeTextAreaHandler = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
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
								<div className={styles.btns}>
									<button
										className={`${styles.btn} ${styles.deleteProductBtn}`}
										onClick={() => deleteProductHandler(product.id)}
										disabled={isLoading}
									>
										Видалити
									</button>
									<button
										className={`${styles.btn} ${styles.editProductBtn}`}
										onClick={() => editProductstart(product.id)}
									>
										Змінити
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{isEdit && (
				<EditProductForm
					product={newProduct}
					onClick={() => setIsEdit(false)}
					onSubmit={(e) => editProductHandler(e, productId)}
					onChangeInput={(e) => onChangeInputHandler(e)}
					onChangeTextArea={(e) => onChangeTextAreaHandler(e)}
				/>
			)}
		</div>
	)
}
export default ProductTable
