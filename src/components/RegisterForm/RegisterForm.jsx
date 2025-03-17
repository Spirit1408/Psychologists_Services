import css from "./RegisterForm.module.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectError, selectIsLoading } from "../../redux/auth/selectors";
import { registerUser } from "../../redux/auth/operations";
import toast from "react-hot-toast";
import { clearError } from "../../redux/auth/slice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object().shape({
	name: yup
		.string()
		.required("Name is required")
		.min(2, "Name must have at least 2 characters")
		.matches(
			/^[a-zA-Z\s]+$/,
			"Name must contain only Latin characters and spaces, without special symbols",
		),
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

export const RegisterForm = ({ onSuccess }) => {
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
			await dispatch(registerUser(data)).unwrap();

			reset();

			if (onSuccess) onSuccess();

			toast.success("Registration successful");
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<>
			<h2 className={css.title}>Registration</h2>

			<p className={css.text}>
				Thank you for your interest in our platform! In order to register, we
				need some information. Please provide us with the following information.
			</p>

			{error && <p className={css.errorMessage}>{error}</p>}

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={css.inputsContainer}>
					<div className={css.inputWrapper}>
						<input
							{...register("name", {
								required: "Name is required",
								minLength: {
									value: 2,
									message: "Name must be at least 2 characters",
								},
							})}
							type="text"
							placeholder="Name"
							className={`${css.input} ${errors.name ? css.inputError : ""}`}
						/>
						{errors.name && (
							<p className={css.errorMessage}>{errors.name.message}</p>
						)}
					</div>

					<div className={css.inputWrapper}>
						<input
							{...register("email", {
								required: "Email is required",
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: "Invalid email address",
								},
							})}
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
							{...register("password", {
								required: "Password is required",
								minLength: {
									value: 6,
									message: "Password must be at least 6 characters",
								},
							})}
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
								src={showPassword ? "/images/eye.svg" : "/images/eye-off.svg"}
								alt={showPassword ? "eye" : "eye-off"}
								className={css.showPassIcon}
							/>
						</button>
						{errors.password && (
							<p className={css.errorMessage}>{errors.password.message}</p>
						)}
					</div>
				</div>

				<button type="submit" className={css.submitBtn} disabled={isLoading}>
					Sign Up
				</button>
			</form>
		</>
	);
};
