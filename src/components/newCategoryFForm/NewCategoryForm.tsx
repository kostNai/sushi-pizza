import { FormEvent } from 'react'
import styles from './NewCategoryForm.module.scss'

type Props = {
	isCategoryAdd: boolean
	onSubmit: (e: FormEvent) => void
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function NewCategoryForm({
	isCategoryAdd,
	onSubmit,
	value,
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
							value={value}
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
