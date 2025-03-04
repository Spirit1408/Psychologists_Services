import css from "./UserInfo.module.css";

export const UserInfo = () => {
	return (
		<div className={css.userInfoContainer}>
			<div className={css.userInfo}>
			    <div className={css.iconContainer}>
    				<svg className={css.icon}>
    					<use href="src/images/sprite.svg#icon-user" />
    				</svg>
    			</div>
    
                <p className={css.userName}>User</p>
			</div>

            <button type="button" className={css.logout}>Log out</button>
		</div>
	);
};
