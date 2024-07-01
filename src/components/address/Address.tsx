import { AddressType } from '@/types/Address'
import styles from './Address.module.scss'
import { useEffect, useState } from 'react'
import AddressForm from '../addressForm/AddressForm'

type Props = {
	address: AddressType
}

export default function Address({ address }: Props) {
	const [isChangeAddress, setIschangeAddress] = useState(false)
	return (
		<div className={styles.container}>
			<div className={styles.addressInfo}>
				<h2 className={styles.addressTitle}>Адреса:</h2>
				<p className={styles.addressCityInfo}>
					Місто - <span className={styles.addressSpan}>{address.city}</span>
				</p>
				<p className={styles.addressStreetInfo}>
					Вулиця -{' '}
					<span className={styles.addressSpan}>{address.street_name}</span>
				</p>
				<p className={styles.addressHouseInfo}>
					Будинок №
					<span className={styles.addressSpan}>{address.house_number}</span>
				</p>
				<p className={styles.addressFlatInfo}>
					Квартира{' '}
					<span className={styles.addressSpan}>{address.flat_number}</span>
				</p>
			</div>
			<div className={styles.btnsContainer}>
				<button onClick={() => setIschangeAddress(!isChangeAddress)}>
					Змінити адресу
				</button>
				<button>Видалити адресу</button>
			</div>
			{isChangeAddress && <AddressForm currentAddress={address} />}
		</div>
	)
}
