import styles from './styles.module.scss'
import ConfirmOrder from '@/src/components/confirmOrder/ConfirmOrder'
export default function Page() {
	return (
		<section className={styles.orderConfirm}>
			<ConfirmOrder />
		</section>
	)
}
