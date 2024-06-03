import { Suspense } from 'react'
import Link from 'next/link'
import { IoAdd } from 'react-icons/io5'
import ProductTable from '../../../components/productsTable/ProductsTable'
import Loading from '../loading'
import { to } from '../../../routes/products/to'
import styles from './styles.module.scss'

export default function RootProducts() {
	return (
		<div>
			<section>
				<Link href={`/root/${to.newProduct}`} className={styles.newProductLink}>
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
