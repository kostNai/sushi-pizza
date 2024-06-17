import Link from 'next/link'
import styles from './Footer.module.scss'

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<section className={styles.footerContainer}>
				<div className={styles.title}>
					<h2>
						<Link href={'/'}>ShoTamSushi</Link>
					</h2>
				</div>
				<div>
					<ul className={styles.footerLinks}>
						<li>
							<Link href={'/'}>Головна</Link>
						</li>
						<li>
							<Link href={'/menu'}>Меню</Link>
						</li>
						<li>
							<Link href={'/about'}>Про нас</Link>
						</li>
						<li>
							<Link href={'/feedBack'}>Поскажитись</Link>
						</li>
					</ul>
				</div>
				<div className={styles.footerFeedBack}>
					<h4>Зв&apos;язатися з нами</h4>
					<ul className={styles.footerPhpneNumbers}>
						<li>097-123-45-67</li>
						<li>093-123-45-67</li>
						<li>095-123-45-67</li>
					</ul>
				</div>
			</section>
		</footer>
	)
}
