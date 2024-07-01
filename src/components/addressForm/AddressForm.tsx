import { AddressType } from '@/src/app/types/Address'
import styles from './AddressForm.module.scss'
import { FormEvent, useState } from 'react'
import { editAddress } from '@/src/utils/api/editAddress'

type Props = {
	currentAddress: AddressType
}

export default function AddressForm({ currentAddress }: Props) {
	const token = localStorage.getItem('token')
	const [address, setAddress] = useState<AddressType | undefined>({
		city: '',
		street_name: '',
		house_number: '',
		flat_number: ''
	})

	const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAddress({ ...address, [e.target.name]: e.target.value })
	}
	const onSubmitHandler = async (e: FormEvent) => {
		e.preventDefault()
		try {
			await editAddress(token, currentAddress.id, address)
		} catch (error) {}
	}
	return (
		<div>
			<form className={styles.addressForm} onSubmit={onSubmitHandler}>
				<label htmlFor="city" className={styles.addressLabel}>
					Місто:
					<input
						type="text"
						name="city"
						placeholder={currentAddress.city}
						onChange={onChangeInputHandler}
					/>
				</label>
				<label htmlFor="street_name" className={styles.addressLabel}>
					Вулиця:
					<input
						type="text"
						name="street_name"
						placeholder={currentAddress.street_name}
						onChange={onChangeInputHandler}
					/>
				</label>
				<label htmlFor="house_number" className={styles.addressLabel}>
					Номер будинку:
					<input
						type="text"
						name="house_number"
						placeholder={currentAddress.house_number}
						onChange={onChangeInputHandler}
					/>
				</label>
				<label htmlFor="flat_number" className={styles.addressLabel}>
					Номер квартири:
					<input
						type="text"
						name="flat_number"
						placeholder={currentAddress.flat_number}
						onChange={onChangeInputHandler}
					/>
				</label>
				<div className={styles.btnsContainer}>
					<button type="submit" className={styles.btn}>
						Змінити
					</button>
					<button type="reset" className={styles.btn}>
						Відмінити
					</button>
				</div>
			</form>
		</div>
	)
}
