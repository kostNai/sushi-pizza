'use client'
import { useEffect, useState } from 'react'
import styles from './ConfirmOrder.module.scss'
import { User } from '@/src/app/types/User'
import { getUserFromOrder } from '@/src/utils/api/getUserFromOrder'
import FormForOrderConfirm from '../formForOrderConfirm/FormForOrderConfirm'

export default function ConfirmOrder() {
	const [orderId, setOrderId] = useState<string | undefined>()
	const [order, setOrder] = useState()
	const [user, setUser] = useState<User | undefined>()
	const [version, setVersion] = useState(0)

	useEffect(() => {
		setOrderId(sessionStorage.getItem('orderId'))
	}, [])
	useEffect(() => {
		if (orderId) {
			const res = getUserFromOrder(orderId).then((data) => {
				if (data.status === 200) setUser(data.data.user)
				console.log(data)
			})
			console.log(user)
		}
	}, [orderId])
	return (
		<section className={styles.confirmOrder}>
			<FormForOrderConfirm />
		</section>
	)
}
