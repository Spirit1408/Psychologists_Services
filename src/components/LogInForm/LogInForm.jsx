import css from "./LogInForm.module.css";
import eyeOff from "../../images/eye-off.svg";
import eye from "../../images/eye.svg";
import { useState } from "react";

export const LogInForm = () => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<>
			<h2 className={css.title}>Log In</h2>

			<p className={css.text}>
				Welcome back! Please enter your credentials to access your account and
				continue your search for a psychologist.
			</p>

			<form>
				<div className={css.inputsContainer}>
					<input type="text" placeholder="Email" className={css.input} />

					<div className={css.inputPassContainer}>
						<input
							type={showPassword ? "text" : "password"}
							placeholder="Password"
							className={css.input}
						/>

						<button
							type="button"
							className={css.showPassBtn}
							onClick={togglePasswordVisibility}
						>
							<img
								src={showPassword ? eye : eyeOff}
								alt={showPassword ? "eye icon" : "close eye icon"}	
								className={css.showPassIcon}
							/>
						</button>
					</div>
				</div>

				<button type="submit" className={css.submitBtn}>
					Log In
				</button>
			</form>
		</>
	);
};
