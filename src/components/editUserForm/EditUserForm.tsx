import { FormEvent } from 'react'
import styles from './EditUserForm.module.scss'
import { User } from '../../app/types/User'

type Props = {
	onSubmit: (e: FormEvent) => Promise<void>
	onChange?: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void
	onClick: () => void
	value: string
}

export default function EditUserForm({
	onSubmit,
	onClick,
	onChange,
	value
}: Props) {
	return (
		<div className={styles.changeNameFormContainer}>
			<form className={styles.changeNameForm} onSubmit={onSubmit}>
				<div>
					<label htmlFor="name">Введіть дані</label>
					<input
						type="text"
						value={value}
						onChange={(e) => onChange(e, value)}
					/>
					<button type="submit">Змінити</button>
				</div>
				<button type="submit" onClick={onClick}>
					Відмінити
				</button>
			</form>
		</div>
	)
}
