import css from "./Auth.module.css";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { LogInForm } from "../LogInForm/LogInForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";

export const Auth = () => {
	const [modalType, setModalType] = useState(null);
	const openModal = (type) => {
		setModalType(type);
	};

	const closeModal = () => {
		setModalType(null);
	};

	const handleSuccess = () => {
		closeModal();
	};

	return (
		<>
			<div className={css.authBtns}>
				<button
					type="button"
					className={css.login}
					onClick={() => openModal("login")}
				>
					Log In
				</button>
				<button
					type="button"
					className={css.register}
					onClick={() => openModal("register")}
				>
					Registration
				</button>
			</div>

			{modalType === "login" && (
				<Modal onClose={closeModal}>
					<LogInForm onSuccess={handleSuccess} />
				</Modal>
			)}

			{modalType === "register" && (
				<Modal onClose={closeModal}>
					<RegisterForm onSuccess={handleSuccess} />
				</Modal>
			)}
		</>
	);
};
