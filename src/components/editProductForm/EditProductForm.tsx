import { FormEvent } from 'react'
import { Product } from '../../app/types/Product'
import styles from './EditProductForm.module.scss'

type Props = {
	product: Product
	onClick: () => void
	onSubmit: (e: FormEvent) => void
	onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void
	onChangeTextArea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function EditProductForm({
	product,
	onClick,
	onSubmit,
	onChangeInput,
	onChangeTextArea
}: Props) {
	return (
		<div className={styles.editProductContainer}>
			<form className={styles.editProductForm} onSubmit={onSubmit}>
				<h3>Редагування продукту</h3>
				<label htmlFor="product_name">
					Назва
					<input
						type="text"
						name="product_name"
						value={product?.product_name}
						onChange={onChangeInput}
					/>
				</label>
				<label htmlFor="product_desc">
					Опис
					<textarea
						name="product_desc"
						value={product.product_desc}
						onChange={onChangeTextArea}
					/>
				</label>
				<label htmlFor="product_weight">
					Маса
					<input
						type="text"
						name="product_weight"
						value={product?.product_weight}
						onChange={onChangeInput}
					/>
				</label>
				<label htmlFor="product_price">
					Ціна
					<input
						type="text"
						name="product_price"
						value={product?.product_price}
						onChange={onChangeInput}
					/>
				</label>
				<div className={styles.btns}>
					<button type="submit">Ок</button>
					<button type="reset" onClick={onClick}>
						Відмінити
					</button>
				</div>
			</form>
		</div>
	)
}
