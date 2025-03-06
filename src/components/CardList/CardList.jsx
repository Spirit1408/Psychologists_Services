import css from "./CardList.module.css";
import { Card } from "../Card/Card.jsx";
import { useState, useEffect } from "react";
import { specialistsRef } from "../../firebase";
import { onValue } from "firebase/database";

export const CardList = () => {
	const [specialists, setSpecialists] = useState([]);
	const [loading, setLoading] = useState(true);
	const [visibleCount, setVisibleCount] = useState(3);

	useEffect(() => {
		const specialistsListener = onValue(
			specialistsRef,
			(snapshot) => {
				if (snapshot.exists()) {
					const specialistsData = snapshot.val();
					const specialistsArray = Object.keys(specialistsData).map((key) => ({
						id: key,
						...specialistsData[key],
					}));
					setSpecialists(specialistsArray);
				} else {
					setSpecialists([]);
				}
				setLoading(false);
			},
			(error) => {
				console.error("Error listening to specialists:", error);
				setLoading(false);
			},
		);

		return () => {
			specialistsListener();
		};
	}, []);

	const loadMore = () => {
		setVisibleCount((prev) => prev + 3);
	};

	return (
		<div className={css.cardList}>
			{loading ? (
				<p>Loading specialists...</p>
			) : (
				<>
					<ul className={css.cardListContainer}>
						{specialists.length > 0 ? (
							specialists.slice(0, visibleCount).map((specialist) => (
								<li key={specialist.id}>
									<Card specialist={specialist} />
								</li>
							))
						) : (
							<p>No specialists found</p>
						)}
					</ul>

					{visibleCount < specialists.length && (
						<button type="button" className={css.loadMore} onClick={loadMore}>
							Load more
						</button>
					)}
				</>
			)}
		</div>
	);
};