import css from "./CardList.module.css";
import { Card } from "../Card/Card.jsx";

export const CardList = () => {
	return (
		<div className={css.cardList}>
			<ul className={css.cardListContainer}>
				<li>
					<Card />
				</li>
				<li>
					<Card />
				</li>
				<li>
					<Card />
				</li>
			</ul>

			<button type="button" className={css.loadMore}>
				Load more
			</button>
		</div>
	);
};
