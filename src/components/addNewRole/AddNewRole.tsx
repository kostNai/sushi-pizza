import { FormEvent } from 'react'
import styles from './AddNewRole.module.scss'

type Props = {
	isAddingRole: boolean
	onClickTitle: () => void
	onClickBtnSuccess: () => void
	onClickBtnReset: (e: FormEvent) => void
}

export default function AddNewRole({
	isAddingRole,
	onClickTitle,
	onClickBtnSuccess,
	onClickBtnReset
}: Props) {
	return (
		<div className={styles.newRoleContainer}>
			<h3 className={styles.addNewRole} onClick={onClickTitle}>
				Додати нову роль
			</h3>

			<form className={isAddingRole ? styles.newRoleForm : styles.hiddenForm}>
				<label htmlFor="role">
					Введіть назву ролі
					<input
						type="text"
						placeholder="Нова роль"
						name="role"
						className={styles.newRoleInput}
					/>
				</label>
				<div className={styles.btns}>
					<button
						className={`${styles.btn} ${styles.newRoleSuccessBtn} ${styles.newRoleBtn}`}
						type="submit"
						onClick={onClickBtnSuccess}
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
