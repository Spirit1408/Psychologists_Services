export const selectFavorites = (state) => state.favorites.items;
export const selectIsLoading = (state) => state.favorites.isLoading;
export const selectError = (state) => state.favorites.error;
export const selectLastKey = (state) => state.favorites.lastKey;
export const selectHasMore = (state) => state.favorites.hasMore;
export const selectSortType = (state) => state.favorites.sortType;
export const selectIsFavorite = (state, id) => state.favorites.items.some(item => item.id === id);
export const selectPageSize = (state) => state.favorites.pageSize;
