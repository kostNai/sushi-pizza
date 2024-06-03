import styles from './AddProductForm.module.scss'

const AddProductForm = async () => {
	return (
		<div className={styles.addProductContainer}>
			<h3>Додати новий продукт</h3>
			<form className={styles.addProductForm}>
				<div className={styles.addProductInputs}>
					<label htmlFor="productName">
						Назва продукту
						<input type="text" name="productName" />
					</label>

					<label htmlFor="productDesc">
						Опис продукту
						<textarea name="productDesc" />
					</label>

					<label htmlFor="productPrice">
						Ціна <input type="text" name="productPrice" />
					</label>
					<label htmlFor="productWeight">
						Вага
						<input type="text" name="productWeight" />
					</label>
					<label htmlFor="productImage">
						Оберіть картинку
						<input
							type="file"
							name="productImage"
							className={styles.fileINput}
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
		</div>
	)
}

export default AddProductForm
