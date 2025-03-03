import css from './Auth.module.css';

export const Auth = () => {
	return (
		<div className={css.authBtns}>
			<button type="button" className={css.login}>Log In</button>
            <button type="button" className={css.register}>Registration</button>
		</div>
	);
};
