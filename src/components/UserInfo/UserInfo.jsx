import toast from "react-hot-toast";
import css from "./UserInfo.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/operations";

export const UserInfo = ({ user }) => {
	const dispatch = useDispatch();

	const handleLogout = async () => {
		try {
			dispatch(logout());
			toast.success("You have successfully logged out");
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<div className={css.userInfoContainer}>
			<div className={css.userInfo}>
				<div className={css.iconContainer}>
					<svg className={css.icon}>
						<use href="src/images/sprite.svg#icon-user" />
					</svg>
				</div>

				<p className={css.userName}>{user.name}</p>
			</div>

			<button type="button" className={css.logout} onClick={handleLogout}>
				Log out
			</button>
		</div>
	);
};
