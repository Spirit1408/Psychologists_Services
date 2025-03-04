import { Header } from "./Header/Header";
import { Home } from "../pages/Home/Home";
import { Route, Routes } from "react-router-dom";

export const App = () => {
	return (
		<>
			<Header />

			<main>
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</main>
		</>
	);
};
