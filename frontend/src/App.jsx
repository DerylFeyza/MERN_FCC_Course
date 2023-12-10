import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Nav } from "react-bootstrap"; // Make sure to install 'react-bootstrap'

import AddReview from "./components/add-review";
import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
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
		<Router>
			<div>
				<nav className="navbar navbar-expand navbar-dark bg-dark">
					<a href="/restaurants" className="navbar-brand">
						Restaurant Reviews
					</a>
					<div className="navbar-nav mr-auto">
						<Nav.Item>
							<Link to={"/restaurants"} className="nav-link">
								Restaurants
							</Link>
						</Nav.Item>
						<Nav.Item>
							{user ? (
								<Link to={"/login"} className="nav-link" onClick={logout}>
									Logout {user.name}
								</Link>
							) : (
								<Link to={"/login"} className="nav-link">
									Login
								</Link>
							)}
						</Nav.Item>
					</div>
				</nav>

				<div className="container mt-3">
					<Routes>
						<Route exact path="/" element={<RestaurantsList />} />
						<Route
							path="/restaurants/:id/review"
							element={<AddReview user={user} />}
						/>
						<Route
							path="/restaurants/:id"
							element={<Restaurant user={user} />}
						/>
						<Route path="/login" element={<Login login={login} />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
