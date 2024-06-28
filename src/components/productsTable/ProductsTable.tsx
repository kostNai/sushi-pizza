'use client'

import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { FaLongArrowAltDown, FaLongArrowAltUp } from 'react-icons/fa'
import styles from './ProductsTable.module.scss'
import { Product } from '@/types/Product'
import { ToastType } from '@/types/ToastType'
import { OrderParam } from '@/types/OrderParamType'
import { OrderOption } from '@/types/OrderOption'
import { deleteProduct } from '@/utils/api/deleteProduct'
import { editProduct } from '@/utils/api/editProduct'
import { refresh } from '@/utils/api/refresh'
import { getOrderedProducts } from '@/utils/api/getOrderedProducts'
import { getProducts } from '@/utils/api/getProducts'
import EditProductForm from '@/components/editProductForm/EditProductForm'
import Toast from '../UI/Toast.tsx/Toast'

const TABLE_ITEMS = [
	{ name: 'id', abbr: 'id' },
	{ name: 'Назва', abbr: 'product_name' },
	{ name: 'Опис', abbr: 'product_desc' },
	{ name: 'Ціна', abbr: 'product_price' },
	{ name: 'Вага', abbr: 'product_weight' },
	{ name: 'Категорія', abbr: 'category_name' },
	{ name: 'Дії', abbr: 'actions' }
]

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
	const [orderParam, setOrderParam] = useState<OrderParam | undefined>()
	const [message, setMessage] = useState('')
	const [toastType, setToastType] = useState<ToastType | undefined>(null)
	const [isToast, setIsToast] = useState(false)
	const [products, setProducts] = useState<Product[] | undefined>([])
	const [productId, setProductId] = useState<string | undefined>('')
	const [version, setVersion] = useState(0)
	const refs = useRef<HTMLTableCellElement[]>([])
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
	const orderProductsHandler = async (
		orderParam: OrderParam,
		order_option: OrderOption,
		indx: number
	) => {
		orderParam = refs.current[indx].abbr
		setOrderParam(orderParam)
		setOrderOption(orderOption === 'asc' ? 'desc' : 'asc')
		await getOrderedProducts(orderParam, order_option).then((data) => {
			setProducts(data.data.products)
		})
	}
	return (
		<div className={styles.productsContainer}>
			<Toast message={message} isToast={isToast} toastType={toastType} />
			<table className={styles.productsTable}>
				<thead>
					<tr>
						{TABLE_ITEMS.map((item, indx) => (
							<th
								key={indx}
								ref={(el) => (refs.current[indx] = el)}
								onClick={() =>
									orderProductsHandler(orderParam, orderOption, indx)
								}
								abbr={item.abbr}
							>
								{item.name}

								{refs.current[indx]?.abbr == orderParam ? (
									orderOption === 'desc' ? (
										<FaLongArrowAltUp />
									) : (
										<FaLongArrowAltDown />
									)
								) : (
									''
								)}
							</th>
						))}
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
