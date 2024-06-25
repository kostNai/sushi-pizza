'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { FaLongArrowAltDown, FaLongArrowAltUp } from 'react-icons/fa'
import { Product } from '../../app/types/Product'
import { deleteProduct } from '../../utils/api/deleteProduct'
import styles from './ProductsTable.module.scss'
import EditProductForm from '../editProductForm/EditProductForm'
import { editProduct } from '../../utils/api/editProduct'
import Toast from '../UI/Toast.tsx/Toast'
import { ToastType } from '../../app/types/ToastType'
import { refresh } from '../../utils/api/refresh'
import { OrderParam } from '../../app/types/OrderParamType'
import { getOrderedProducts } from '../../utils/api/getOrderedProducts'
import { OrderOption } from '../../app/types/OrderOption'
import { getProducts } from '../../utils/api/getProducts'

const ProductTable = () => {
	const [isLoading, setIsLoading] = useState<boolean | undefined>(false)
	const [isEdit, setIsEdit] = useState<boolean | undefined>(false)
	const [newProduct, setNewProduct] = useState<Product | undefined>({
		product_name: '',
		product_desc: '',
		product_price: 0,
		product_weight: 0,
		product_image: ''
	})
	const [orderOption, setOrderOption] = useState<OrderOption | undefined>('asc')
	const [message, setMessage] = useState('')
	const [toastType, setToastType] = useState<ToastType | undefined>(null)
	const [isToast, setIsToast] = useState(false)
	const [products, setProducts] = useState<Product[] | undefined>([])
	const [productId, setProductId] = useState<string | undefined>('')
	const [orderParam, setOrderParam] = useState<OrderParam | undefined>()
	const [version, setVersion] = useState(0)
	const token = localStorage.getItem('token')

	useEffect(() => {
		const res = getProducts().then((data) => {
			setProducts(data.data.products)
			refresh(token).then((data) =>
				localStorage.setItem('token', data.data.access_token)
			)
		})
	}, [version])

	const deleteProductHandler = (id: string) => {
		setIsLoading(true)
		const res = deleteProduct(token, id)
			.then((data) => {
				if (data.status === 200) {
					setIsToast(true)
					setToastType('access')
					setMessage('Видалено успішно')
					resetToastData()
					setIsLoading(false)
					setVersion(version + 1)
					refresh(token).then((data) =>
						localStorage.setItem('token', data.data.access_token)
					)
				}
			})
			.catch((err) => {
				setIsToast(true)
				setToastType('error')
				setMessage(err)
				resetToastData()
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
	const resetToastData = () => {
		setTimeout(() => {
			setIsToast(false)
			setToastType(null)
		}, 5000)
	}
	const orderPeoductsHandler = (
		orderParam: OrderParam,
		order_option: OrderOption
	) => {
		setOrderOption(orderOption === 'asc' ? 'desc' : 'asc')
		getOrderedProducts(orderParam, order_option).then((data) => {
			setProducts(data.data.products)
		})
	}
	return (
		<div className={styles.productsContainer}>
			<Toast message={message} isToast={isToast} toastType={toastType} />
			<table className={styles.productsTable}>
				<thead>
					<tr>
						<th
							onClick={() => {
								setOrderParam('id')
								orderPeoductsHandler(orderParam, orderOption)
							}}
							abbr="id"
						>
							id
							{orderOption === 'desc' ? (
								<FaLongArrowAltUp />
							) : (
								<FaLongArrowAltDown />
							)}
						</th>
						<th
							onClick={() => orderPeoductsHandler('product_name', orderOption)}
						>
							Назва
							{orderOption === 'desc' ? (
								<FaLongArrowAltUp />
							) : (
								<FaLongArrowAltDown />
							)}
						</th>
						<th
							onClick={() => orderPeoductsHandler('product_desc', orderOption)}
						>
							Опис
							{orderOption === 'desc' ? (
								<FaLongArrowAltUp />
							) : (
								<FaLongArrowAltDown />
							)}
						</th>
						<th
							onClick={() => orderPeoductsHandler('product_price', orderOption)}
						>
							Ціна
							{orderOption === 'desc' ? (
								<FaLongArrowAltUp />
							) : (
								<FaLongArrowAltDown />
							)}
						</th>
						<th
							onClick={() =>
								orderPeoductsHandler('product_weight', orderOption)
							}
						>
							Вага
							{orderOption === 'desc' ? (
								<FaLongArrowAltUp />
							) : (
								<FaLongArrowAltDown />
							)}
						</th>
						<th>Категорія </th>
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
