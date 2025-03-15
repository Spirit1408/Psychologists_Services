import { useDispatch } from "react-redux";
import { CardList } from "../../components/CardList/CardList";
import { Filter } from "../../components/Filter/Filter";
import css from "./Favorites.module.css";
import { useSelector } from "react-redux";
import { selectFavorites, selectIsLoading, selectError, selectSortType, selectPageSize } from "../../redux/favorites/selectors";
import { useEffect, useState } from "react";
import { setSortType } from "../../redux/favorites/slice";
import { getFavorites } from "../../redux/favorites/operations";

export function Favorites() {
	const dispatch = useDispatch();
	const favorites = useSelector(selectFavorites);
	const isLoading = useSelector(selectIsLoading);
	const error = useSelector(selectError);
	const sortType = useSelector(selectSortType);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = useSelector(selectPageSize);
	const [displayedFavorites, setDisplayedFavorites] = useState([]);
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		dispatch(getFavorites());
	}, [dispatch]);
	
	useEffect(() => {
		let sortedFavorites = [...favorites];

		switch(sortType) {
			case "desc":
				sortedFavorites.sort((a, b) => a.name.localeCompare(b.name));
				break;
			case "asc":
				sortedFavorites.sort((a, b) => b.name.localeCompare(a.name));
				break;
			case "less":
				sortedFavorites.sort((a, b) => a.price_per_hour - b.price_per_hour);
				break;
			case "more":
				sortedFavorites.sort((a, b) => b.price_per_hour - a.price_per_hour);
				break;
			case "pop":
				sortedFavorites.sort((a, b) => b.rating - a.rating);
				break;
			case "nopop":
				sortedFavorites.sort((a, b) => a.rating - b.rating);
				break;
			default:
				sortedFavorites = [...favorites];
				break;
		}

		const endIndex = currentPage * itemsPerPage;
		const paginatedFavorites = sortedFavorites.slice(0, endIndex);
		setDisplayedFavorites(paginatedFavorites);
		setHasMore(endIndex < sortedFavorites.length);
	}, [favorites, sortType, currentPage, itemsPerPage]);

	const loadMore = () => {
		setCurrentPage(prev => prev + 1);
	};

	const handleSortChange = (sortType) => {
		dispatch(setSortType(sortType));
		setCurrentPage(1);
	};

	return (
		<div className={css.container}>
			<Filter onSortChange={handleSortChange} currentSort={sortType} />

			{favorites.length > 0 ? (
				<CardList
					items={displayedFavorites}
					loading={isLoading}
					hasMore={hasMore}
					error={error}
					onLoadMore={loadMore}
				/>
			) : (
				<h2 className={css.title}>No items in favorites yet...</h2>
			)}
		</div>
	);
}
