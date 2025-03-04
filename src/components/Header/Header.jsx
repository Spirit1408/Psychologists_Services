import css from "./Header.module.css";
import { Auth } from "../Auth/Auth";
import { UserInfo } from "../UserInfo/UserInfo";
import { NavLink } from "react-router-dom";

export const Header = () => {
	return (
		<header className={css.header}>
			<p className={css.logo}>
				<span className={css.accent}>psychologists.</span>services
			</p>

			<nav>
				<ul className={css.menu}>
					<li>
						<NavLink
							to="/"
							className={({ isActive }) =>
								isActive ? `${css.navlink} ${css.active}` : `${css.navlink}`
							}
						>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/psychologists"
							className={({ isActive }) =>
								isActive ? `${css.navlink} ${css.active}` : `${css.navlink}`
							}
						>
							Psychologists
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/favorites"
							className={({ isActive }) =>
								isActive ? `${css.navlink} ${css.active}` : `${css.navlink}`
							}
						>
							Favorites
						</NavLink>
					</li>
				</ul>
			</nav>

			<Auth />

			{/* <UserInfo /> */}
		</header>
	);
};
