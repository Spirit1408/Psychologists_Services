import css from "./AppointmentForm.module.css";
import photo from "../../images/dummy/spec-photo.jpg";
import clock from "../../images/clock.svg";
import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

export const AppointmentForm = () => {
	const [showTimePicker, setShowTimePicker] = useState(false);
	const timePickerRef = useRef(null);
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
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
		console.log(data); // Handle form submission with the data
		// Here you would typically dispatch an action to save the appointment
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
					<img src={photo} alt="" />
				</div>

				<div className={css.specInfoContainer}>
					<p className={css.specTitle}>Your psychologist</p>
					<p className={css.specName}>Dr. Sarah Davis</p>
				</div>
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={css.inputsContainer}>
					<div className={css.inputWrapper}>
						<input
							{...register("name", {
								required: "Name is required",
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
							{...register("phone", {
								required: "Phone number is required",
								pattern: {
									value: /^\+?[0-9\s\-()]+$/,
									message: "Invalid phone number format",
								},
							})}
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
									<img src={clock} className={css.clockIcon} alt="clock icon" />
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
