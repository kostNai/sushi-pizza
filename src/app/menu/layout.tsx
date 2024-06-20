'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getCategories } from '../../utils/api/getCategories'
import { Category } from '../types/Category'
import styles from './styles.module.scss'
import { usePathname } from 'next/navigation'

export default function MenuLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const [categories, setCategories] = useState<Category[] | undefined>([])
	const path = usePathname()
	useEffect(() => {
		getCategories().then((data) => {
			setCategories(data.data.categories)
		})
	}, [])

	const filteredOptions = categories.map((e) => e.category_name)
	const filteredCategories = categories.filter(
		(e, i) => filteredOptions.indexOf(e.category_name) === i
	)
	return (
		<section>
			<div className={styles.categoriesContainer}>
				<nav>
					{filteredCategories.map((category, indx) => (
						<Link
							href={`${path}/${category.slug}`}
							key={indx}
							className={styles.categoryLink}
						>
							{category.category_name}
						</Link>
					))}
				</nav>
			</div>
			{children}
		</section>
	)
}
