import css from "./Filter.module.css";
import arrow from "../../images/select-arrow.svg";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSortType } from "./../../redux/psychologists/selectors";
import { setSortType } from "./../../redux/psychologists/slice";

export const Filter = () => {
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const selectedOption = useSelector(selectSortType);
	const dropdownRef = useRef(null);

	const options = [
		{ value: "desc", label: "A to Z" },
		{ value: "asc", label: "Z to A" },
		{ value: "less", label: "Less than 10$" },
		{ value: "more", label: "Greater than 10$" },
		{ value: "pop", label: "Popular" },
		{ value: "nopop", label: "Not popular" },
		{ value: "all", label: "Show all" },
	];

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleOptionClick = (value) => {
		dispatch(setSortType(value));
		setIsOpen(false);
	};

	const getSelectedLabel = () => {
		return (
			options.find((option) => option.value === selectedOption).label
		);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div>
			<p className={css.label}>Filters</p>

			<div className={css.customSelect} ref={dropdownRef}>
				<div className={css.selectTrigger} onClick={toggleDropdown}>
					<span>{getSelectedLabel()}</span>

					<img
						className={`${css.arrow} ${isOpen ? css.active : ""}`}
						src={arrow}
						alt="arrow icon"
					/>
				</div>

				{isOpen && (
					<div className={css.optionsContainer}>
						<ul className={css.options}>
							{options.map((option) => (
								<li
									key={option.value}
									className={`${css.option} ${selectedOption === option.value ? css.selected : ""}`}
									onClick={() => handleOptionClick(option.value)}
								>
									{option.label}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};
