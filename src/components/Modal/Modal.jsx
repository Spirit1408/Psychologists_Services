import css from "./Modal.module.css";
import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

export const Modal = ({ children, onClose }) => {
	const handleKeyDown = useCallback(
		(e) => {
			if (e.code === "Escape") {
				onClose();
			}
		},
		[onClose],
	);

	const handleBackdropClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		document.body.style.overflow = "hidden";

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "auto";
		};
	}, [handleKeyDown]);

	return createPortal(
		<div className={css.modalContainer} onClick={handleBackdropClick}>
			<div className={css.modal}>
				<button type="button" className={css.close} onClick={onClose}>
					<img src="/images/close.svg" alt="close icon" />
				</button>
				{children}
			</div>
		</div>,
		document.getElementById("root"),
	);
};
