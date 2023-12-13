import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const RestaurantsListDisplay = ({
	restaurants,
	currentPage,
	previousPage,
	nextPage,
	cuisines,
	onChangeSearchName,
	onChangeSearchZip,
	onChangeSearchCuisine,
	searchName,
	searchZip,
	searchCuisine,
	findByName,
	findByZip,
	findByCuisine,
}) => {
	return (
		<div>
			<div className="row pb-1" display="flex">
				<div className="col-md-4">
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							placeholder="Search by name"
							value={searchName}
							onChange={onChangeSearchName}
						/>
						<div className="input-group-append">
							<button
								className="btn btn-outline-secondary"
								type="button"
								onClick={findByName}
							>
								Search
							</button>
						</div>
					</div>
				</div>
				<div className="col-md-4">
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							placeholder="Search by zip"
							value={searchZip}
							onChange={onChangeSearchZip}
						/>
						<div className="input-group-append">
							<button
								className="btn btn-outline-secondary"
								type="button"
								onClick={findByZip}
							>
								Search
							</button>
						</div>
					</div>
				</div>
				<div className="col-md-4">
					<div className="input-group">
						<select onChange={onChangeSearchCuisine}>
							{cuisines.map((cuisine) => {
								return (
									<option key={cuisine} value={cuisine}>
										{" "}
										{cuisine.substr(0, 20)}{" "}
									</option>
								);
							})}
						</select>
						<div className="input-group-append">
							<button
								className="btn btn-outline-secondary"
								type="button"
								onClick={findByCuisine}
							>
								Search
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				{restaurants.map((restaurant) => {
					const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
					return (
						<div key={restaurant._id} className="col-lg-4 pb-1">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">{restaurant.name}</h5>
									<p className="card-text">
										<strong>Cuisine: </strong>
										{restaurant.cuisine}
										<br />
										<strong>Address: </strong>
										{address}
									</p>
									<div className="row">
										<Link
											to={"/restaurants/" + restaurant._id}
											className="btn btn-primary col-lg-5 mx-1 mb-1"
										>
											View Reviews
										</Link>
										<a
											target="_blank"
											rel="noreferrer"
											href={"https://www.google.com/maps/place/" + address}
											className="btn btn-primary col-lg-5 mx-1 mb-1"
										>
											View Map
										</a>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
			<nav aria-label="Page navigation example">
				<ul className="pagination">
					<li className="page-item">
						<a className="page-link" onClick={previousPage}>
							Previous
						</a>
					</li>
					<li className="page-item">
						<a className="page-link">{currentPage}</a>
					</li>
					<li className="page-item">
						<a className="page-link" onClick={nextPage}>
							Next
						</a>
					</li>
				</ul>
			</nav>
		</div>
	);
};

// Define PropTypes outside the component body
RestaurantsListDisplay.propTypes = {
	restaurants: PropTypes.array.isRequired,
	currentPage: PropTypes.number.isRequired,
	previousPage: PropTypes.func.isRequired,
	nextPage: PropTypes.func.isRequired,
	cuisines: PropTypes.array.isRequired,
	onChangeSearchName: PropTypes.func.isRequired,
	onChangeSearchZip: PropTypes.func.isRequired,
	onChangeSearchCuisine: PropTypes.func.isRequired,
	searchName: PropTypes.string.isRequired,
	searchZip: PropTypes.string.isRequired,
	searchCuisine: PropTypes.string.isRequired,
	findByName: PropTypes.func.isRequired,
	findByZip: PropTypes.func.isRequired,
	findByCuisine: PropTypes.func.isRequired,
};

export default RestaurantsListDisplay;
