import css from "./Psychologists.module.css";
import { Filter } from "../../components/Filter/Filter";
import { CardList } from "../../components/CardList/CardList";

export function Psychologists() {
	return (
		<div className={css.container}>
			<Filter />

			<CardList />
		</div>
	);
}
