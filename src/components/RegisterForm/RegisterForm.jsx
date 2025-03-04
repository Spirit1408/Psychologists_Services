import css from "./RegisterForm.module.css";
import eyeOff from "../../images/eye-off.svg";

export const RegisterForm = () => {
	return (
		<>
			<h2 className={css.title}>Registration</h2>

			<p className={css.text}>
				Thank you for your interest in our platform! In order to register, we
				need some information. Please provide us with the following information.
			</p>

			<form>
				<div className={css.inputsContainer}>
                    <input type="text" placeholder="Name" className={css.input} />

					<input type="text" placeholder="Email" className={css.input} />

					<div className={css.inputPassContainer}>
						<input
							type="password"
							placeholder="Password"
							className={css.input}
						/>

						<button type="button" className={css.showPassBtn}>
							<img
								src={eyeOff}
								alt="close eye icon"
								className={css.showPassIcon}
							/>
						</button>
					</div>
				</div>

				<button type="submit" className={css.submitBtn}>
					Sign Up
				</button>
			</form>
		</>
	);
};
