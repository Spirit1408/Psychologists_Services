import css from "./Auth.module.css";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { LogInForm } from "../LogInForm/LogInForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { UserInfo } from "../UserInfo/UserInfo";

export const Auth = () => {
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showRegisterModal, setShowRegisterModal] = useState(false);
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const user = useSelector(selectUser);

	const openLoginModal = () => {
		setShowLoginModal(true);
	};

	const closeLoginModal = () => {
		setShowLoginModal(false);
	};

	const openRegisterModal = () => {
		setShowRegisterModal(true);
	};

	const closeRegisterModal = () => {
		setShowRegisterModal(false);
	};

	const handleLoginSuccess = () => {
		closeLoginModal();
	};

	const handleRegisterSuccess = () => {
		closeRegisterModal();
	};

	if (isLoggedIn) {
		return <UserInfo user={user} />;
	}

	return (
		<>
			<div className={css.authBtns}>
				<button type="button" className={css.login} onClick={openLoginModal}>
					Log In
				</button>
				<button
					type="button"
					className={css.register}
					onClick={openRegisterModal}
				>
					Registration
				</button>
			</div>

			{showLoginModal && (
				<Modal onClose={closeLoginModal}>
					<LogInForm onSuccess={handleLoginSuccess} />
				</Modal>
			)}

			{showRegisterModal && (
				<Modal onClose={closeRegisterModal}>
					<RegisterForm onSuccess={handleRegisterSuccess} />
				</Modal>
			)}
		</>
	);
};
