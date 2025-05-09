import css from "./Home.module.css";

export function Home() {
	return (
		<section className={css.hero}>
			<div className={css.heroDesc}>
				<h1 className={css.title}>
					The road to the <span className={css.accent}>depths</span> of the
					human soul
				</h1>

				<p className={css.text}>
					We help you to reveal your potential, overcome challenges and find a
					guide in your own life with the help of our experienced psychologists.
				</p>

				<a href="/psychologists" className={css.heroLink}>
					Get started <img src="./images/arrow.svg" alt="arrow icon" />
				</a>
			</div>

			<div className={css.heroImg}>
				<img src="./images/hero.jpg" alt="hero cover" className={css.heroImage} />

				<img src="./images/socials.svg" alt="socials icon" className={css.socialsIcon} />

				<div className={css.questionContainer}>?</div>

				<div className={css.totalContainer}>
					<div className={css.checkIconContainer}>
						<svg className={css.checkIcon}>
							<use href="images/sprite.svg#icon-check"></use>
						</svg>
					</div>

					<div className={css.totalInfo}>
						<p className={css.totalLabel}>Experienced psychologists</p>
						<p className={css.totalValue}>15,000</p>
					</div>
				</div>
			</div>
		</section>
	);
}
