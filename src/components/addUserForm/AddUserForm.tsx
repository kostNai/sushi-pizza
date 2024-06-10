import { FormEvent, useState } from 'react'
import { User } from '../../app/types/User'
import styles from './AddUserForm.module.scss'

type Props = {
	user: User
	onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
	onSubmit: (e: FormEvent) => void
	onCancelClick: (e: FormEvent) => void
	isAddingUser: boolean
	onClickTitle: () => void
}

export default function AddUserForm({
	user,
	onChangeHandler,
	onSubmit,
	onCancelClick,
	isAddingUser,
	onClickTitle
}: Props) {
	return (
		<div className={styles.addUserContainer}>
			<h3 className={styles.addNewUser} onClick={onClickTitle}>
				Додати нового користувача
			</h3>
			<form
				onSubmit={onSubmit}
				className={isAddingUser ? styles.newUserForm : styles.hiddenForm}
			>
				<label htmlFor="login">
					Логін
					<input
						name="login"
						value={user.login}
						onChange={onChangeHandler}
						className={styles.newUserInput}
					/>
				</label>
				<label htmlFor="email">
					Email
					<input
						name="email"
						value={user.email}
						onChange={onChangeHandler}
						className={styles.newUserInput}
					/>
				</label>
				<label htmlFor="password">
					Пароль
					<input
						type="password"
						name="password"
						value={user.password}
						onChange={onChangeHandler}
						className={styles.newUserInput}
					/>
				</label>
				<label htmlFor="name">
					Ім&apos;я
					<input
						name="name"
						value={user.name}
						onChange={onChangeHandler}
						className={styles.newUserInput}
					/>
				</label>
				<label htmlFor="phone_number">
					Номер телефону
					<input
						name="phone_number"
						value={user.phone_number}
						onChange={onChangeHandler}
						className={styles.newUserInput}
					/>
				</label>

				<div className={styles.btns}>
					<button
						type="submit"
						className={`${styles.btn} ${styles.newUserSuccessBtn} ${styles.newUserBtn}`}
					>
						Додати
					</button>
					<button
						type="reset"
						onClick={onCancelClick}
						className={`${styles.btn} ${styles.newUserCancelBtn} ${styles.newUserBtn}`}
					>
						Відмінити
					</button>
				</div>
			</form>
		</div>
	)
}
