import { FormEvent } from 'react'
import styles from './NewCategoryForm.module.scss'
import { Category } from '@/src/app/types/Category'

type Props = {
	isCategoryAdd: boolean
	onSubmit: (e: FormEvent) => void
	category: Category
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function NewCategoryForm({
	isCategoryAdd,
	onSubmit,
	category,
	onChange
}: Props) {
	return (
		isCategoryAdd && (
			<div className={styles.newCategoryContainer}>
				<h5 className={styles.newCategoryTitle}>Нова категорія:</h5>
				<form className={styles.newCategoryForm} onSubmit={onSubmit}>
					<label htmlFor="category_name">
						Введіть назву категорії
						<input
							type="text"
							name="category_name"
							placeholder="Нова категорія"
							value={category.category_name}
							onChange={onChange}
						/>
					</label>
					<label htmlFor="slug">
						Додайте "slug"
						<input
							type="text"
							name="slug"
							placeholder="slug"
							value={category.slug}
							onChange={onChange}
						/>
					</label>
					<div className={styles.btns}>
						<button className={`${styles.btn} ${styles.btnSuccess}`}>
							Додати
						</button>
						<button className={`${styles.btn} ${styles.btnReset}`}>
							Відмінити
						</button>
					</div>
				</form>
			</div>
		)
	)
}
