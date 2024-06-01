import { ChangeEventHandler, FormEvent, InputHTMLAttributes } from 'react'
import styles from './EditRoleRadio.module.scss'
import { Role } from '../../app/types/Role'

type Props = {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	onClickSuccess: () => void
	onClickCancel: (e: FormEvent) => void
	options: Role[]
}

export default function EditRoleRadio({
	onChange,
	onClickSuccess,
	onClickCancel,
	options
}: Props) {
	const filteredOptions = options.map((e) => e.role_name)

	const filteredRoles = filteredOptions.filter(
		(e, i) => filteredOptions.indexOf(e) === i
	)

	return (
		<div className={styles.mainContainer}>
			<div className={styles.container}>
				<h3>Оберіть роль</h3>
				<div className={styles.radioContainer}>
					{filteredRoles.map((option: string, indx) => (
						<label key={indx}>
							<input
								type="radio"
								name="role"
								id=""
								value={option}
								onChange={onChange}
							/>
							{option}
						</label>
					))}
				</div>
				<div className={styles.btns}>
					<button
						className={`${styles.btn} ${styles.btnSuccess}`}
						onClick={onClickSuccess}
					>
						Ок
					</button>
					<button
						className={`${styles.btn} ${styles.cancelBtn}`}
						onClick={onClickCancel}
					>
						Відмінити
					</button>
				</div>
			</div>
		</div>
	)
}

{
	/* 
					<label>
						<input
							type="radio"
							name="role"
							id=""
							value={'admin'}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange}
						/>
						Admin
					</label>

					<label>
						<input
							type="radio"
							name="role"
							id=""
							value={'user'}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange}
						/>
						User
					</label> */
}
