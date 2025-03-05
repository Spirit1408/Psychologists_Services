import { Header } from "./Header/Header";
import { Home } from "../pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import { Psychologists } from "../pages/Psychologists/Psychologists";
import { Favorites } from "../pages/Favorites/Favorites";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";
import { ThemeSwitcher } from "./ThemeSwitcher/ThemeSwitcher";

export const App = () => {
	return (
		<>
			<Header />

			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/psychologists" element={<Psychologists />} />
					<Route path="/favorites" element={<Favorites />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</main>

			<ThemeSwitcher />
		</>
	);
};
