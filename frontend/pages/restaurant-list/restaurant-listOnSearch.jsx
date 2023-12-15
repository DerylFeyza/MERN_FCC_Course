// RestaurantsList.jsx
import React, { useState, useEffect } from "react";
import RestaurantsListDisplay from "./fragments/RestaurantListDisplay";
import * as RestaurantsListFunctions from "./fragments/RestaurantListFunction";

const RestaurantsList = (props) => {
	const [restaurants, setRestaurants] = useState([]);
	const [searchName, setSearchName] = useState("");
	const [searchZip, setSearchZip] = useState("");
	const [searchCuisine, setSearchCuisine] = useState("");
	const [searched, setSearched] = useState("");
	const [cuisines, setCuisines] = useState(["All Cuisines"]);
	const [currentPage, setCurrentPage] = useState(0);
	const [maxPage, setMaxPage] = useState(null);
	const minPage = 0;

	useEffect(() => {
		RestaurantsListFunctions.retrieveRestaurants(
			currentPage,
			setRestaurants,
			setMaxPage
		);
		RestaurantsListFunctions.retrieveCuisines(setCuisines);
	}, [currentPage]);

	const findByName = () => {
		RestaurantsListFunctions.findByName(
			setSearched,
			searchName,
			RestaurantsListFunctions.find,
			currentPage,
			setRestaurants,
			setMaxPage
		);
	};

	const findByZip = () => {
		RestaurantsListFunctions.findByZip(
			setSearched,
			searchZip,
			RestaurantsListFunctions.find,
			currentPage,
			setRestaurants,
			setMaxPage
		);
	};

	const findByCuisine = () => {
		RestaurantsListFunctions.findByCuisine(
			setSearched,
			searchCuisine,
			RestaurantsListFunctions.refreshList,
			RestaurantsListFunctions.find,
			currentPage,
			setRestaurants,
			setMaxPage
		);
	};

	const nextPage = () => {
		RestaurantsListFunctions.nextPageOnSearch(
			searched,
			currentPage,
			maxPage,
			setCurrentPage,
			RestaurantsListFunctions.find
		);
	};

	const previousPage = () => {
		RestaurantsListFunctions.previousPageOnSearch(
			searched,
			currentPage,
			minPage,
			setCurrentPage,
			RestaurantsListFunctions.find
		);
	};

	return (
		<RestaurantsListDisplay
			restaurants={restaurants}
			currentPage={currentPage}
			previousPage={previousPage}
			nextPage={nextPage}
			cuisines={cuisines}
			onChangeSearchName={(e) =>
				RestaurantsListFunctions.onChangeSearchName(e, setSearchName)
			}
			onChangeSearchZip={(e) =>
				RestaurantsListFunctions.onChangeSearchZip(e, setSearchZip)
			}
			onChangeSearchCuisine={(e) =>
				RestaurantsListFunctions.onChangeSearchCuisine(e, setSearchCuisine)
			}
			searchName={searchName}
			searchZip={searchZip}
			searchCuisine={searchCuisine}
			findByName={findByName}
			findByZip={findByZip}
			findByCuisine={findByCuisine}
		/>
	);
};

export default RestaurantsList;
