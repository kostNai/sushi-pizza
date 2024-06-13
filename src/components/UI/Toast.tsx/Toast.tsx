import { ReactNode } from 'react'
import styles from './Toast.module.scss'
import { IoCheckmarkDone } from 'react-icons/io5'
import { MdErrorOutline } from 'react-icons/md'
import { ToastType } from '../../../app/types/ToastType'

type Props = {
	message: string
	isToast: boolean
	toastType: ToastType
}

export default function Toast({ message, isToast, toastType }: Props) {
	const className = toastType
	return (
		<div
			className={
				isToast
					? `${className} ${styles.toastContainer} ${styles[className]}`
					: `${styles.invisible}`
			}
		>
			<div className={styles.toastIcon}>
				{toastType === 'access' ? <IoCheckmarkDone /> : <MdErrorOutline />}
			</div>
			<p className={styles.toastText}>{message}</p>
		</div>
	)
}
