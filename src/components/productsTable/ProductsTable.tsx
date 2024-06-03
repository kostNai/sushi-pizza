import styles from './ProductsTable.module.scss'

const ProductTable = async () => {
	return (
		<div className={styles.productsContainer}>
			<table className={styles.productsTable}>
				<thead>
					<tr>
						<th>id</th>
						<th>Назва</th>
						<th>Опис</th>
						<th>Ціна</th>
						<th>Вага</th>
						<th>Дії</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>Каліфорнія</td>
						<td>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
							qui eveniet ullam necessitatibus fugit soluta nostrum iusto
							praesentium incidunt commodi magnam, optio error neque maxime ab
							nemo, sint, quia suscipit.
						</td>
						<td>635грн</td>
						<td>1020гр</td>
						<td>
							<button className={`${styles.btn} ${styles.deleteProductBtn}`}>
								Видалити
							</button>
							<button className={`${styles.btn} ${styles.editProductBtn}`}>
								Змінити
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}
export default ProductTable
