import css from "./Header.module.css";
import { Auth } from "../Auth/Auth";
import { UserInfo } from "../UserInfo/UserInfo";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";

export const Header = () => {
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const user = useSelector(selectUser);

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
					{isLoggedIn && (
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
					)}
				</ul>
			</nav>

			{isLoggedIn ? <UserInfo user={user} /> : <Auth />}
		</header>
	);
};
