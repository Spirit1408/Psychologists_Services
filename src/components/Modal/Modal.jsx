import css from "./Modal.module.css";
import close from "../../images/close.svg";

export const Modal = ({ children }) => {
	return (
		<div className={css.modalContainer}>
			<div className={css.modal}>
				<button type="button" className={css.close}>
					<img src={close} alt="close icon" />
				</button>
				{children}
			</div>
		</div>
	);
};
