import { CardList } from "../../components/CardList/CardList";
import { Filter } from "../../components/Filter/Filter";
import css from "./Favorites.module.css";

export function Favorites() {
	return (
		<div className={css.container}>
			<Filter />

			{/* <CardList /> */}

			<h2 className={css.title}>No items in favorites yet...</h2>
		</div>
	);
}
