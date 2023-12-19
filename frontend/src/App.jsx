import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AddReview from "./components/add-review";
import Users from "./components/searchparamstest";
import RestaurantReviews from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import RestaurantsListOnSearch from "../pages/restaurant-list/restaurant-listOnSearch";
import Login from "./components/login";

function App() {
	const [user, setUser] = React.useState(null);
	async function login(user = null) {
		setUser(user);
	}

	async function logout() {
		setUser(null);
	}

	return (
		<div>
			{console.log(user)}
			<nav className="navbar navbar-expand navbar-dark bg-dark">
				<Link to={"/restaurants"} className="nav-brand">
					Restaurants Review
				</Link>
				<div className="navbar-nav mr-auto">
					<li className="nav-item">
						<Link to={"/restaurants"} className="nav-link">
							Restaurants
						</Link>
					</li>
					<li className="nav-item">
						{user ? (
							<a
								onClick={logout}
								className="nav-link"
								style={{ cursor: "pointer" }}
							>
								Logout {user.name}
							</a>
						) : (
							<Link to={"/login"} className="nav-link">
								Login
							</Link>
						)}
					</li>
				</div>
			</nav>

			<div className="container mt-3">
				<Routes>
					<Route exact path="/" element={<RestaurantsList user={user} />} />
					<Route
						exact
						path="/restaurants"
						element={<RestaurantsList user={user} />}
					/>
					<Route
						path="/restaurants/:id/review"
						element={<AddReview user={user} state={"aaa"} />} // Pass the user prop here
					/>
					<Route
						path="/restaurants/:id"
						element={<RestaurantReviews user={user} />}
					/>
					<Route
						path="/login"
						element={<Login login={login} />} // Pass the login prop here if needed
					/>
				</Routes>
			</div>
		</div>
	);
}

export default App;
