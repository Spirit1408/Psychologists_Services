import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectIsRefreshing, selectToken } from "./../redux/auth/selectors";
import { Navigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { refreshUser } from "../redux/auth/operations";

export const PrivateRoute = ({ component: Component }) => {
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const isRefreshing = useSelector(selectIsRefreshing);
	const token = useSelector(selectToken);
	const dispatch = useDispatch();
	const [isCheckingAuth, setIsCheckingAuth] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			if (token && !isLoggedIn) {
				await dispatch(refreshUser());
			}
			setIsCheckingAuth(false);
		};

		checkAuth();
	}, [dispatch, token, isLoggedIn]);

	if (isRefreshing || isCheckingAuth) {
		return (
			<PuffLoader
				color="var(--accent-color)"
				cssOverride={{ margin: "0 auto" }}
			/>
		);
	}

	return isLoggedIn ? Component : <Navigate to="/" replace />;
};
