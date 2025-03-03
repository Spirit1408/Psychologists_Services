import css from "./Header.module.css";
import { Auth } from "../Auth/Auth";

export const Header = () => {
	return (
		<header className={css.header}>
			<p className={css.logo}><span className={css.accent}>psychologists.</span>services</p>

			<nav>
				<ul className={css.menu}>
					<li><a href="#" className={css.navlink}>Home</a></li>
					<li><a href="#" className={css.navlink}>Psychologists</a></li>
					<li><a href="#" className={css.navlink}>Favorites</a></li>
				</ul>
			</nav>

			<Auth />
		</header>
	);
};
