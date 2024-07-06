import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { IoAdd } from 'react-icons/io5'
import ProductTable from '../../../components/productsTable/ProductsTable'
import { to } from '../../../routes/products/to'
import styles from './styles.module.scss'
import Loading from '@/app/loading'

export default async function AdminProducts() {
	return (
		<div>
			<section>
				<Link
					href={`/admin/${to.newProduct}`}
					className={styles.newProductLink}
				>
					<IoAdd className={styles.newProductIcon} />
					Додати новий продукт
				</Link>
				<Suspense fallback={<Loading />}>
					<ProductTable />
				</Suspense>
			</section>
		</div>
	)
}
