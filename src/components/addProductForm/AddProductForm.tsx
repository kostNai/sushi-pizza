import { FormEvent } from 'react'
import { Product } from '../../app/types/Product'
import styles from './AddProductForm.module.scss'
import { Category } from '../../app/types/Category'

type Props = {
	product: Product
	onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void
	onChangeTextArea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
	onSubmit: (e: FormEvent) => void
	categoryOptions: Category[]
	onReset: () => void
}

const AddProductForm = ({
	product,
	onChangeInput,
	onSubmit,
	onChangeTextArea,
	categoryOptions,
	onReset
}: Props) => {
	const filteredOptions = categoryOptions.map((e) => e.category_name)

	const filteredCategories = filteredOptions.filter(
		(e, i) => filteredOptions.indexOf(e) === i
	)
	return (
		<div className={styles.addProductContainer}>
			<h3>Додати новий продукт</h3>
			<form
				className={styles.addProductForm}
				onSubmit={onSubmit}
				onReset={onReset}
			>
				<div className={styles.addProductInputs}>
					<label htmlFor="product_name">
						Назва продукту
						<input
							type="text"
							name="product_name"
							className={styles.input}
							value={product?.product_name}
							onChange={onChangeInput}
						/>
					</label>

					<label htmlFor="product_desc">
						Опис продукту
						<textarea
							name="product_desc"
							className={styles.textArea}
							value={product?.product_desc}
							onChange={onChangeTextArea}
						/>
					</label>

					<label htmlFor="product_price">
						Ціна{' '}
						<input
							type="text"
							name="product_price"
							className={styles.input}
							value={product?.product_price}
							onChange={onChangeInput}
						/>
					</label>
					<label
						htmlFor="product_weight
					"
					>
						Вага
						<input
							type="text"
							name="product_weight"
							className={styles.input}
							value={product.product_weight}
							onChange={onChangeInput}
						/>
					</label>
					<label
						htmlFor="product_image
					"
						className={styles.fileLabel}
					>
						Оберіть картинку
						<input
							type="file"
							name="product_image"
							onChange={onChangeInput}
							className={`${styles.fileINput} ${styles.input}`}
						/>
					</label>
					<div className={styles.radioContainer}>
						<h4>Оберіть категорію</h4>
						{filteredCategories.map((category: string, indx) => (
							<label htmlFor="category_name" key={indx}>
								<input
									type="radio"
									name="category_name"
									onChange={onChangeInput}
									value={category}
								/>
								{category}
							</label>
						))}
					</div>
				</div>
				<div className={styles.addProductBtns}>
					<button
						type="submit"
						className={`${styles.btn} ${styles.btnSuccess}`}
					>
						Додати
					</button>
					<button type="reset" className={`${styles.btn} ${styles.btnReset}`}>
						Очистити
					</button>
				</div>
			</form>
		</div>
	)
}

export default AddProductForm
