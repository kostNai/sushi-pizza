'use client'

import { FormEvent, useEffect, useState } from 'react'
import AddProductForm from '../../../../components/addProductForm/AddProductForm'
import { Category } from '../../../types/Category'
import { getCategories } from '../../../../utils/api/getCategories'
import { Product } from '../../../types/Product'

export default function NewProduct() {
	const [product, setProduct] = useState<Product | undefined>({
		product_name: '',
		product_desc: '',
		product_price: 0,
		product_weight: 0,
		product_image: ''
	})
	const [categories, setCategories] = useState<Category[] | undefined>([])

	useEffect(() => {
		const res = getCategories().then((data) =>
			setCategories(data.data.categories)
		)
	}, [])

	const onSubmitHandler = (e: FormEvent) => {
		e.preventDefault()

		console.log({
			...product,
			product_price: +product.product_price,
			product_weight: +product.product_weight
		})
	}
	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProduct({ ...product, [e.target.name]: e.target.value })
	}
	const onChangeHandlers = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setProduct({ ...product, [e.target.name]: e.target.value })
	}
	return (
		<div>
			<AddProductForm
				product={product}
				categoryOptions={categories}
				onSubmit={onSubmitHandler}
				onChangeInput={(e) => onChangeHandler(e)}
				onChangeTextArea={(e) => onChangeHandlers(e)}
			/>
		</div>
	)
}
