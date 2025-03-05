import css from "./RegisterForm.module.css";
import eye from "../../images/eye.svg";
import eyeOff from "../../images/eye-off.svg";
import { useState } from "react";

export const RegisterForm = () => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};


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
							type={showPassword ? "text" : "password"}
							placeholder="Password"
							className={css.input}
						/>

						<button type="button" className={css.showPassBtn} onClick={togglePasswordVisibility}>
							<img
								src={showPassword ? eye : eyeOff}
								alt={showPassword ? "eye" : "eye-off"}
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
