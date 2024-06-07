'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { IoAdd } from 'react-icons/io5'
import ProductTable from '../../../components/productsTable/ProductsTable'
import { to } from '../../../routes/products/to'
import styles from './styles.module.scss'
import { getProducts } from '../../../utils/api/getProducts'
import { Product } from '../../types/Product'
import { refresh } from '../../../utils/api/refresh'
import { deleteProduct } from '../../../utils/api/deleteProduct'

export default function RootProducts() {
	const [products, setProducts] = useState<Product[] | undefined>([])
	const [version, setVersion] = useState<number | undefined>(0)

	const token = localStorage.getItem('token')

	useEffect(() => {
		const res = getProducts().then((data) => {
			setProducts(data.data.products)
			refresh(token).then((data) =>
				localStorage.setItem('token', data.data.access_token)
			)
		})
	}, [token, version])
	const deleteProductHandler = async (id: string) => {
		const res = await deleteProduct(token, id)
	}
	const editProductHandler = () => {}

	return (
		<div>
			<section>
				<Link href={`/root/${to.newProduct}`} className={styles.newProductLink}>
					<IoAdd className={styles.newProductIcon} />
					Додати новий продукт
				</Link>
				<Suspense>
					<ProductTable
						products={products}
						editProduct={editProductHandler}
						version={version}
						setVersion={setVersion}
					/>
				</Suspense>
			</section>
		</div>
	)
}
