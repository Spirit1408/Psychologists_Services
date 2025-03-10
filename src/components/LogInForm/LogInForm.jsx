import css from "./LogInForm.module.css";
import eyeOff from "../../images/eye-off.svg";
import eye from "../../images/eye.svg";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectError, selectIsLoading } from "../../redux/auth/selectors";
import { clearError } from "../../redux/auth/slice";
import { login } from "../../redux/auth/operations";
import toast from "react-hot-toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object().shape({
	email: yup
		.string()
		.required("Email is required")
		.matches(
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			"Email must contain @ and domain with a dot (Latin characters only)",
		),
	password: yup
		.string()
		.required("Password is required")
		.min(6, "Password must be at least 6 characters")
		.matches(
			/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
			"Password must contain at least one uppercase letter, one number, and one special character",
		),
});

export const LogInForm = ({ onSuccess }) => {
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();
	const error = useSelector(selectError);
	const isLoading = useSelector(selectIsLoading);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	useEffect(() => {
		return () => {
			dispatch(clearError());
		};
	}, [dispatch]);

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	const onSubmit = async (data) => {
		try {
			await dispatch(login(data)).unwrap();

			reset();

			if (onSuccess) onSuccess();

			toast.success("Login successful");
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<>
			<h2 className={css.title}>Log In</h2>

			<p className={css.text}>
				Welcome back! Please enter your credentials to access your account and
				continue your search for a psychologist.
			</p>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={css.inputsContainer}>
					<div className={css.inputWrapper}>
						<input
							{...register("email")}
							type="text"
							placeholder="Email"
							className={`${css.input} ${errors.email ? css.inputError : ""}`}
						/>
						{errors.email && (
							<p className={css.errorMessage}>{errors.email.message}</p>
						)}
					</div>

					<div className={css.inputPassContainer}>
						<input
							{...register("password")}
							type={showPassword ? "text" : "password"}
							placeholder="Password"
							className={`${css.input} ${errors.password ? css.inputError : ""}`}
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
						{errors.password && (
							<p className={css.errorMessage}>{errors.password.message}</p>
						)}
					</div>
				</div>

				<button type="submit" className={css.submitBtn} disabled={isLoading}>
					Log In
				</button>
			</form>
		</>
	);
};
