import Link from 'next/link'
import styles from './style.module.scss'

export default function Register() {
	return (
		<section className={styles.registerContainer}>
			<h2>Реєстрація</h2>
			<div>
				<form action="register" className={styles.registerForm}>
					<label htmlFor="login">Логін</label>
					<input type="text" name="login" />
					<label htmlFor="password">Пароль</label>
					<input type="password" name="password" />
					<label htmlFor="rePassword">Повторіть пароль</label>
					<input type="password" name="rePassword" />
					<button className={styles.registerBtn}>Реєстрація</button>
				</form>
			</div>
			<p>Вже маєте профіль?</p>
			<Link href={'/register'} className={styles.loginLink}>
				{' '}
				Увійти
			</Link>
		</section>
	)
}
