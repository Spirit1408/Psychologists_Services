import css from "./Psychologists.module.css";
import { Filter } from "../../components/Filter/Filter";
import { CardList } from "../../components/CardList/CardList";
import { useDispatch, useSelector } from "react-redux";
import {
	selectError,
	selectHasMore,
	selectIsLoading,
	selectPsychologists,
	selectSortType,
} from "../../redux/psychologists/selectors";
import { useEffect } from "react";
import {
	getMorePsychologists,
	getPsychologists,
} from "./../../redux/psychologists/operations";
import { clearPsychologists } from "../../redux/psychologists/slice";

export function Psychologists() {
	const dispatch = useDispatch();
	const specialists = useSelector(selectPsychologists);
	const loading = useSelector(selectIsLoading);
	const hasMore = useSelector(selectHasMore);
	const error = useSelector(selectError);
	const sortType = useSelector(selectSortType);

	useEffect(() => {
		// Clear the list and fetch new data when sort type changes
		dispatch(clearPsychologists());
		dispatch(getPsychologists());
	}, [dispatch, sortType]);

	const loadMore = () => {
		if (!hasMore) return;
		dispatch(getMorePsychologists());
	};

	return (
		<div className={css.container}>
			<Filter />

			<CardList
				items={specialists}
				loading={loading}
				hasMore={hasMore}
				error={error}
				onLoadMore={loadMore}
			/>
		</div>
	);
}
