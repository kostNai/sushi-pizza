import Link from 'next/link'
import styles from './FormForOrderConfirm.module.scss'

export default function FormForOrderConfirm() {
	return (
		<form className={styles.orderForm}>
			<h2 className={styles.orderFormTitle}>Підтвердження замовлення</h2>
			<div className={styles.orderFormDataContainer}>
				<h4>Ім&apos;я та прізвище</h4>
				<div className={styles.orderFormData}>
					<label htmlFor="name">
						Ім&apos;я
						<input type="text" name="name" placeholder="Ім'я" />
					</label>
					<label htmlFor="surname">
						Прізвище
						<input type="text" name="surname" placeholder="Прізвище" />
					</label>
				</div>
			</div>
			<div className={styles.orderFormDataContainer}>
				<h4>Контактні дані</h4>
				<div className={styles.orderFormData}>
					<label htmlFor="phoneNumber">
						Номер телефону
						<input type="tel" name="phoneNumber" placeholder="+380991234567" />
					</label>
					<label htmlFor="email">
						Email
						<input type="email" placeholder="example@mail.com" />
					</label>
				</div>
			</div>
			<div className={styles.orderFormDataContainer}>
				<h4>Адреса</h4>
				<div className={styles.orderFormData}>
					<div>
						<label htmlFor="city">
							Місто
							<input type="text" name="city" placeholder="Місто" />
						</label>
						<label htmlFor="streetName">
							Вулиця
							<input type="text" name="streetName" placeholder="Вулиця" />
						</label>
					</div>
					<div>
						<label htmlFor="houseNumber">
							Номер будинку
							<input
								type="text"
								name="houseNumber"
								placeholder="Номер будинку"
							/>
						</label>
						<label htmlFor="flatNumber">
							Номер квартири
							<input
								type="text"
								name="flatNumber"
								placeholder="Номер квартири"
							/>
						</label>
					</div>
				</div>
			</div>
			<div className={styles.formOrderBtnContainer}>
				<button type="submit" className={styles.btn}>
					Підтвердити
				</button>
				<p>
					Або{' '}
					<Link href="/login" className={styles.orderFormLoginLink}>
						увійдіть
					</Link>{' '}
					щоб підтягнути дані
				</p>
			</div>
		</form>
	)
}
