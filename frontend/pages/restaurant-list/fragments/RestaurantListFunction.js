// RestaurantsListFunctions.js
import RestaurantDataService from "../../../src/services/restaurant";

export const onChangeSearchName = (e, setSearchName) => {
	const searchName = e.target.value;
	setSearchName(searchName);
};

export const onChangeSearchZip = (e, setSearchZip) => {
	const searchZip = e.target.value;
	setSearchZip(searchZip);
};

export const onChangeSearchCuisine = (e, setSearchCuisine) => {
	const searchCuisine = e.target.value;
	setSearchCuisine(searchCuisine);
};

export const retrieveRestaurants = (page, setRestaurants, setMaxPage) => {
	return RestaurantDataService.getAll(page)
		.then((response) => {
			console.log(response.data);
			console.log(response.data.total_results);

			setRestaurants(response.data.restaurants);
			setMaxPage(Math.ceil(response.data.total_results / 20));
			// return page; // Return the updated currentPage
		})
		.catch((e) => {
			console.log(e);
		});
};

export const nextPage = (currentPage, maxPage, setCurrentPage) => {
	if (maxPage === null) {
		setCurrentPage(currentPage + 1);
		// return currentPage + 1; // Return the updated currentPage
	} else if (currentPage <= maxPage - 2 && maxPage !== null) {
		setCurrentPage(currentPage + 1);
		// return currentPage + 1; // Return the updated currentPage
	}
	// return currentPage;
};

export const previousPage = (currentPage, minPage, setCurrentPage) => {
	if (currentPage > minPage) {
		setCurrentPage(currentPage - 1);
		return currentPage - 1; // Return the updated currentPage
	}
	// return currentPage;
};

export const retrieveCuisines = (setCuisines) => {
	return RestaurantDataService.getCuisines()
		.then((response) => {
			setCuisines(["All Cuisines"].concat(response.data));
		})
		.catch((e) => {
			console.log(e);
		});
};

export const refreshList = (retrieveRestaurants, currentPage) => {
	return retrieveRestaurants(currentPage);
};

export const find = (query, by, page, setRestaurants, setMaxPage) => {
	return RestaurantDataService.find(query, by, page)
		.then((response) => {
			console.log(response.data);
			setRestaurants(response.data.restaurants);
			setMaxPage(Math.ceil(response.data.total_results / 20));
			return page; // Return the updated currentPage
		})
		.catch((e) => {
			console.log(e);
		});
};

export const findByName = (
	searchName,
	find,
	currentPage,
	setRestaurants,
	setMaxPage
) => {
	return find(searchName, "name", currentPage, setRestaurants, setMaxPage);
};

export const findByZip = (
	searchZip,
	find,
	currentPage,
	setRestaurants,
	setMaxPage
) => {
	return find(searchZip, "zipcode", currentPage, setRestaurants, setMaxPage);
};

export const findByCuisine = (
	searchCuisine,
	refreshList,
	find,
	currentPage,
	setRestaurants,
	setMaxPage
) => {
	if (searchCuisine === "All Cuisines") {
		return refreshList(() => retrieveRestaurants(currentPage), currentPage);
	} else {
		return find(
			searchCuisine,
			"cuisine",
			currentPage,
			setRestaurants,
			setMaxPage
		);
	}
};
