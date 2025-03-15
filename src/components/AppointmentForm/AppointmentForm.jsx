import css from "./AppointmentForm.module.css";
import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

const validationSchema = yup.object().shape({
	name: yup
		.string()
		.required("Name is required")
		.min(2, "Name must have at least 2 characters")
		.matches(
			/^[a-zA-Z]+$/,
			"Name must contain only Latin characters without special symbols",
		),
	phone: yup
		.string()
		.required("Phone number is required")
		.matches(/^\+?[0-9\s\-()]+$/, "Invalid phone number format"),
	time: yup.string(),
	email: yup
		.string()
		.required("Email is required")
		.matches(
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			"Email must contain @ and domain with a dot (Latin characters only)",
		),
	comment: yup.string().optional(),
});

export const AppointmentForm = ({ specialist }) => {
	const [showTimePicker, setShowTimePicker] = useState(false);
	const timePickerRef = useRef(null);
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: {
			name: "",
			phone: "",
			time: "09:00",
			email: "",
			comment: "",
		},
	});

	const timeOptions = [
		"09 : 00",
		"09 : 30",
		"10 : 00",
		"10 : 30",
		"11 : 00",
		"11 : 30",
		"12 : 00",
		"12 : 30",
		"13 : 00",
		"13 : 30",
		"14 : 00",
		"14 : 30",
		"15 : 00",
		"15 : 30",
		"16 : 00",
		"16 : 30",
		"17 : 00",
		"17 : 30",
		"18 : 00",
	];

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				timePickerRef.current &&
				!timePickerRef.current.contains(event.target)
			) {
				setShowTimePicker(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleTimeSelect = (time, onChange) => {
		const formattedTime = time.replace(/ : /g, ":");
		onChange(formattedTime);
		setShowTimePicker(false);
	};

	const onSubmit = (data) => {
		toast.success(`${data.name}, your appointment with ${specialist.name} at ${data.time} has been scheduled successfully!`);
	};

	return (
		<>
			<h2 className={css.title}>Make an appointment with a psychologists</h2>

			<p className={css.text}>
				You are on the verge of changing your life for the better. Fill out the
				short form below to book your personal appointment with a professional
				psychologist. We guarantee confidentiality and respect for your privacy.
			</p>

			<div className={css.specInfo}>
				<div className={css.specImageContainer}>
					<img src={specialist.avatar_url} alt="specialist face" />
				</div>

				<div className={css.specInfoContainer}>
					<p className={css.specTitle}>Your psychologist</p>
					<p className={css.specName}>{specialist.name}</p>
				</div>
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={css.inputsContainer}>
					<div className={css.inputWrapper}>
						<input
							{...register("name")}
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
							{...register("phone")}
							type="tel"
							placeholder="+380"
							className={`${css.input} ${errors.phone ? css.inputError : ""}`}
						/>
						{errors.phone && (
							<p className={css.errorMessage}>{errors.phone.message}</p>
						)}
					</div>

					<Controller
						name="time"
						control={control}
						rules={{ required: "Please select a time" }}
						render={({ field: { onChange, value } }) => (
							<div className={css.timePickerContainer} ref={timePickerRef}>
								<div
									className={`${css.timeInput} ${errors.time ? css.inputError : ""}`}
									onClick={() => setShowTimePicker(!showTimePicker)}
								>
									<p className={css.selectedTime}>{value}</p>
									<img src="./images/clock.svg" className={css.clockIcon} alt="clock icon" />
								</div>

								{showTimePicker && (
									<div className={css.timePickerDropdown}>
										<p className={css.dropdownTitle}>Meeting time</p>

										<div className={css.timeOptionsList}>
											{timeOptions.map((time) => (
												<div
													key={time}
													className={`${css.timeOption} ${value === time.replace(/ : /g, ":") ? css.selectedTimeOption : ""}`}
													onClick={() => handleTimeSelect(time, onChange)}
												>
													{time}
												</div>
											))}
										</div>
									</div>
								)}
								{errors.time && (
									<p className={css.errorMessage}>{errors.time.message}</p>
								)}
							</div>
						)}
					/>

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

					<div className={css.inputWrapper}>
						<textarea
							{...register("comment")}
							placeholder="Comment"
							className={`${css.input} ${css.comment}`}
						/>
					</div>
				</div>

				<button type="submit" className={css.submitBtn}>
					Send
				</button>
			</form>
		</>
	);
};
