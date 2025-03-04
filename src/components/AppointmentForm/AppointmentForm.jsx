import css from "./AppointmentForm.module.css";
import photo from "../../images/dummy/spec-photo.jpg";
import clock from "../../images/clock.svg";
import { useState, useRef, useEffect } from "react";

export const AppointmentForm = () => {
	const [showTimePicker, setShowTimePicker] = useState(false);
	const [selectedTime, setSelectedTime] = useState("00:00");
	const timePickerRef = useRef(null);

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

	const handleTimeSelect = (time) => {
		setSelectedTime(time.replace(/ : /g, ":"));
		setShowTimePicker(false);
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

			<form>
				<div className={css.inputsContainer}>
					<input type="text" placeholder="Name" className={css.input} />

					<input type="phone" placeholder="+380" className={css.input} />

					<div className={css.timePickerContainer} ref={timePickerRef}>
						<div
							className={css.timeInput}
							onClick={() => setShowTimePicker(!showTimePicker)}
						>
							<p className={css.selectedTime}>{selectedTime}</p>

                            <img src={clock} className={css.clockIcon} alt="clock icon" />
						</div>

						{showTimePicker && (
							<div className={css.timePickerDropdown}>
								<p className={css.dropdownTitle}>Meeting time</p>

								<div className={css.timeOptionsList}>
									{timeOptions.map((time) => (
										<div
											key={time}
											className={`${css.timeOption} ${selectedTime === time ? css.selectedTimeOption : ""}`}
											onClick={() => handleTimeSelect(time)}
										>
											{time}
										</div>
									))}
								</div>
							</div>
						)}
					</div>

					<input type="text" placeholder="Email" className={css.input} />

					<textarea
						placeholder="Comment"
						className={`${css.input} ${css.comment}`}
					/>
				</div>

				<button type="submit" className={css.submitBtn}>
					Send
				</button>
			</form>
		</>
	);
};
