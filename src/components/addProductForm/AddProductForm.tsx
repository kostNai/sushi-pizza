import { FormEvent, useEffect, useState } from 'react'
import { Product } from '../../app/types/Product'
import styles from './AddProductForm.module.scss'
import { Category } from '../../app/types/Category'
import NewCategoryForm from '../newCategoryFForm/NewCategoryForm'
import { addNewCategory } from '../../utils/api/addNewCategory'
import Toast from '../UI/Toast.tsx/Toast'
import { ToastType } from '../../app/types/ToastType'
import { refresh } from '../../utils/api/refresh'

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
	const token = localStorage.getItem('token')
	const [isCategoryAdd, setIsCategoryAdd] = useState<boolean | undefined>(false)
	const [newCategoryName, setNewCategoryName] = useState<string | undefined>('')
	const [toastType, setToastType] = useState<ToastType | undefined>(null)
	const [isToast, setIsToast] = useState<boolean | undefined>(false)
	const [message, setMessage] = useState<string | undefined>('')
	const [version, setVersion] = useState<number | undefined>(0)
	const filteredOptions = categoryOptions.map((e) => e.category_name)
	const filteredCategories = filteredOptions.filter(
		(e, i) => filteredOptions.indexOf(e) === i
	)
	const resetToastData = () => {
		setTimeout(() => {
			setIsToast(false)
			setToastType(null)
		}, 5000)
	}
	useEffect(() => {
		// setVersion(0)
	}, [version])

	const addCategoryHandler = (e: FormEvent) => {
		e.preventDefault()
		const res = addNewCategory(token, newCategoryName)
			.then((data) => {
				if (data.status === 200) {
					setIsToast(true)
					setToastType('access')
					setMessage('Категорія додана успішно')
					setNewCategoryName('')
					refresh(token).then((data) =>
						localStorage.setItem('token', data.data.access_token)
					)
				}
				setVersion(version + 1)
			})
			.catch((err) => {
				setIsToast(true)
				setToastType('error')
				setMessage(err.response.data.message)
			})
		resetToastData()
	}
	return (
		<div className={styles.addProductContainer}>
			<Toast message={message} isToast={isToast} toastType={toastType} />
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
			<div className={styles.radioContainer}>
				<div>
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
			<div className={styles.newCategoryContainer}>
				<h3
					onClick={() => setIsCategoryAdd(!isCategoryAdd)}
					className={styles.newCategoryTitle}
				>
					Додати нову категорію
				</h3>
				<NewCategoryForm
					isCategoryAdd={isCategoryAdd}
					onSubmit={addCategoryHandler}
					onChange={(e) => setNewCategoryName(e.target.value)}
					value={newCategoryName}
				/>
			</div>
		</div>
	)
}

export default AddProductForm
