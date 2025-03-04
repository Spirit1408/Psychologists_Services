import { Header } from "./Header/Header";
import { Home } from "../pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import { LogInForm } from "./LogInForm/LogInForm";
import { Modal } from "./Modal/Modal";

export const App = () => {
	return (
		<>
			<Header />

			<main>
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</main>

			{/* <Modal>
				<LogInForm />
			</Modal> */}
		</>
	);
};
