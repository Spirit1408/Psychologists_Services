import css from "./CardList.module.css";
import { Card } from "../Card/Card.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
	selectIsLoading,
	selectHasMore,
	selectError,
	selectPsychologists,
} from "../../redux/psychologists/selectors.js";
import { useEffect } from "react";
import {
	getMorePsychologists,
	getPsychologists,
} from "../../redux/psychologists/operations.js";
import { PuffLoader } from "react-spinners";

export const CardList = () => {
	const dispatch = useDispatch();
	const specialists = useSelector(selectPsychologists);
	const loading = useSelector(selectIsLoading);
	const hasMore = useSelector(selectHasMore);
	const error = useSelector(selectError);

	useEffect(() => {
		dispatch(getPsychologists());
	}, [dispatch]);

	const loadMore = () => {
		if (!hasMore) return;
		dispatch(getMorePsychologists());
	};

	return (
		<div className={css.cardList}>
			{error && <p>{error}</p>}

			{loading && specialists.length === 0 ? (
				<PuffLoader color="var(--accent-color)" cssOverride={{ margin: "0 auto" }} />
			) : (
				<>
					<ul className={css.cardListContainer}>
						{specialists.length > 0 ? (
							specialists.map((specialist) => (
								<li key={specialist.id}>
									<Card specialist={specialist} />
								</li>
							))
						) : (
							<p>No specialists found</p>
						)}
					</ul>

					{loading && <PuffLoader color="var(--accent-color)" cssOverride={{ margin: "0 auto" }} />}

					{hasMore && !loading && (
						<button type="button" className={css.loadMore} onClick={loadMore}>
							Load more
						</button>
					)}
				</>
			)}
		</div>
	);
};
