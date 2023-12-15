import { useSearchParams } from "react-router-dom";
import RestaurantDataService from "../services/restaurant";

const Users = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const handleSearch = () => {
		const query = searchParams.get("query") || "";
		const by = searchParams.get("by") || "name";
		const page = searchParams.get("page") || 0;
		RestaurantDataService.find(query, by, page).then((response) => {
			console.log(response.data);
			console.log(response.data.restaurants);
		});
		console.log(query);
		console.log(by);
		console.log(page);
	};

	return (
		<>
			elo
			<div>
				<button
					onClick={() =>
						setSearchParams({ query: "ball", by: "name", page: 0 })
					}
				>
					Search
				</button>
				<button
					onClick={() =>
						setSearchParams({ query: "10305", by: "zipcode", page: 0 })
					}
				>
					zippies
				</button>
				<button onClick={handleSearch}>Search</button>
				<button onClick={() => setSearchParams({})}>Reset Search</button>
				{console.log(searchParams)}
			</div>
		</>
	);
};

export default Users;
