'use client'

import { FormEvent, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import AddProductForm from '../../../../components/addProductForm/AddProductForm'
import { Category } from '../../../types/Category'
import { getCategories } from '../../../../utils/api/getCategories'
import { Product } from '../../../types/Product'
import { addProduct } from '../../../../utils/api/addProduct'
import Toast from '../../../../components/UI/Toast.tsx/Toast'
import { ToastType } from '../../../types/ToastType'

export default function NewProduct() {
	const token = localStorage.getItem('token')
	const [product, setProduct] = useState<Product | undefined>({
		product_name: '',
		product_desc: '',
		product_price: 0,
		product_weight: 0,
		product_image: '',
		category_name: ''
	})
	const [categories, setCategories] = useState<Category[] | undefined>([])
	const [file, setFile] = useState(null)
	const [isToast, setIsToast] = useState<boolean | undefined>(false)
	const [toastType, setToastType] = useState<ToastType | undefined>(null)
	const [message, setMessage] = useState<string | undefined>('')

	useEffect(() => {
		const res = getCategories().then((data) =>
			setCategories(data.data.categories)
		)
	}, [])

	const onSubmitHandler = (e: FormEvent) => {
		e.preventDefault()

		const form = new FormData()
		const keys = Object.keys(product)

		keys.map((key: string, indx) => {
			form.append(key, Object.values(product)[indx].toString())
		})

		form.append('product_img', file)
		const res = addProduct(token, form).then((data) => {
			if (data.status === 200) {
				setIsToast(true)
				setToastType('access')
				setMessage('Додано успішно')
				resetToastData()
				setProduct({
					product_name: '',
					product_desc: '',
					product_price: 0,
					product_weight: 0,
					product_image: '',
					category_name: ''
				})
			} else {
				setIsToast(true)
				setToastType('error')
				setMessage('Помилка')
				resetToastData()
			}
		})
	}
	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === 'product_image') {
			setFile(e.target.files[0])
		}

		setProduct({ ...product, [e.target.name]: e.target.value })
	}
	const onChangeHandlers = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setProduct({ ...product, [e.target.name]: e.target.value })
	}
	const onResetHandler = () => {
		setProduct({
			product_name: '',
			product_desc: '',
			product_price: 0,
			product_weight: 0,
			product_image: '',
			category_name: ''
		})
	}
	const resetToastData = () => {
		setTimeout(() => {
			setIsToast(false)
			setToastType(null)
		}, 5000)
	}
	return (
		<section>
			<div>
				<Toast isToast={isToast} toastType={toastType} message={message} />
			</div>
			<div>
				<AddProductForm
					product={product}
					categoryOptions={categories}
					onSubmit={onSubmitHandler}
					onChangeInput={(e) => onChangeHandler(e)}
					onChangeTextArea={(e) => onChangeHandlers(e)}
					onReset={onResetHandler}
				/>
			</div>
		</section>
	)
}
