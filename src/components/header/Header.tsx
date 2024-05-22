import Image from 'next/image'
import Link from 'next/link'

import styles from './Header.module.scss'

export default function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.headerContainer}>
				<div>
					<Image src={'/logo.png'} width={50} height={50} alt="logo" />
				</div>
				<nav className={styles.menu}>
					<Link href={'/'}>Головна</Link>
					<Link href={'/menu'}>Меню</Link>
					<Link href={'/about'}>Про нас</Link>
					<Link href={'/contacts'}>Зв&apos;язатися з нами</Link>
				</nav>
				<div className={styles.login}>
					<Link href={'login'}>Вхід</Link>
					<Link href={'register'}>Реєстрація</Link>
				</div>
			</div>
		</header>
	)
}
