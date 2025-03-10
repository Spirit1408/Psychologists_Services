import { Header } from "./Header/Header";
import { Home } from "../pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import { Psychologists } from "../pages/Psychologists/Psychologists";
import { Favorites } from "../pages/Favorites/Favorites";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";
import { ThemeSwitcher } from "./ThemeSwitcher/ThemeSwitcher";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing, selectToken } from "../redux/auth/selectors";
import { useEffect } from "react";
import { refreshUser } from "../redux/auth/operations";
import { PuffLoader } from "react-spinners";

export const App = () => {
	const dispatch = useDispatch();
	const isRefreshing = useSelector(selectIsRefreshing);
	const token = useSelector(selectToken);

	useEffect(() => {
		if (token) dispatch(refreshUser());
	}, [dispatch, token]);

	if (isRefreshing) {
		return (
			<PuffLoader
				color="var(--accent-color)"
				cssOverride={{ margin: "0 auto" }}
			/>
		);
	}

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
			<Toaster position="bottom-left" />{" "}
		</>
	);
};
