import css from "./CardList.module.css";
import { Card } from "../Card/Card.jsx";
import { PuffLoader } from "react-spinners";

export const CardList = ({items, loading, hasMore, error, onLoadMore }) => {
	return (
		<div className={css.cardList}>
			{error && <p>{error}</p>}

			{loading && items.length === 0 ? (
				<PuffLoader color="var(--accent-color)" cssOverride={{ margin: "0 auto" }} />
			) : (
				<>
					<ul className={css.cardListContainer}>
						{items.length > 0 ? (
							items.map((specialist) => (
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
						<button type="button" className={css.loadMore} onClick={onLoadMore}>
							Load more
						</button>
					)}
				</>
			)}
		</div>
	);
};
