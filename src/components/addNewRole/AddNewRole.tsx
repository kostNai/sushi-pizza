import { FormEvent } from 'react'
import styles from './AddNewRole.module.scss'

type Props = {
	isAddingRole: boolean
	onClickTitle: () => void
	onSubmit: (e: FormEvent) => void
	onClickBtnReset: (e: FormEvent) => void
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function AddNewRole({
	isAddingRole,
	onClickTitle,
	onSubmit,
	onClickBtnReset,
	value,
	onChange
}: Props) {
	return (
		<div className={styles.newRoleContainer}>
			<h3 className={styles.addNewRole} onClick={onClickTitle}>
				Додати нову роль
			</h3>

			<form
				className={isAddingRole ? styles.newRoleForm : styles.hiddenForm}
				onSubmit={onSubmit}
			>
				<label htmlFor="role">
					Введіть назву ролі
					<input
						type="text"
						placeholder="Нова роль"
						name="role"
						className={styles.newRoleInput}
						value={value}
						onChange={onChange}
					/>
				</label>
				<div className={styles.btns}>
					<button
						className={`${styles.btn} ${styles.newRoleSuccessBtn} ${styles.newRoleBtn}`}
						type="submit"
					>
						Підтвердити
					</button>
					<button
						className={`${styles.btn} ${styles.newRoleCancelBtn} ${styles.newRoleBtn}`}
						type="reset"
						onClick={onClickBtnReset}
					>
						Відмінити
					</button>
				</div>
			</form>
		</div>
	)
}
// setIsAddingRole(true) cancelAddingRoleHandler
