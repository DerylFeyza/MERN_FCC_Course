import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import RestaurantDataService from "../services/restaurant";

const RestaurantReviews = (props) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const initialRestaurantState = {
		id: null,
		name: "",
		address: {},
		cuisine: "",
		reviews: [],
	};
	const [restaurant, setRestaurant] = useState(initialRestaurantState);

	useEffect(() => {
		getRestaurant(id);
	}, [id]);

	const getRestaurant = (id) => {
		RestaurantDataService.get(id)
			.then((response) => {
				setRestaurant(response.data);
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const deleteReview = (reviewId, index) => {
		RestaurantDataService.deleteReview(reviewId, props.user.id)
			.then((response) => {
				setRestaurant((prevState) => {
					prevState.reviews.splice(index, 1);
					return {
						...prevState,
					};
				});
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const handleEditReview = (review) => {
		navigate(`/restaurants/${id}/review`, { state: { currentReview: review } });
	};

	return (
		<>
			{console.log(props.user)}
			<h5>{restaurant.name}</h5>
			<p>
				<strong>Cuisine: </strong>
				{restaurant.cuisine}
				<br />
				<strong>Address: </strong>
				{restaurant.address.building} {restaurant.address.street},{" "}
				{restaurant.address.zipcode}
			</p>
			<Link to={"/restaurants/" + id + "/review"} className="btn btn-primary">
				Add Review
			</Link>
			<h4> Reviews </h4>
			<div className="row">
				{restaurant.reviews.length > 0 ? (
					restaurant.reviews.map((review, index) => {
						return (
							<div className="col-lg-4 pb-1" key={index}>
								<div className="card">
									<div className="card-body">
										<p className="card-text">
											{review.text}
											<br />
											<strong>User: </strong>
											{review.name}
											<br />
											<strong>Date: </strong>
											{review.date}
										</p>
										{props.user && props.user.id === review.user_id && (
											<div className="row">
												<a
													onClick={() => deleteReview(review._id, index)}
													className="btn btn-primary col-lg-5 mx-1 mb-1"
												>
													Delete
												</a>
												{/* <Link
													to={{
														pathname: "/restaurants/" + id + "/review",
														state: {
															currentReview: review,
														},
													}}
												>
													Edit
												</Link> */}
												<a
													onClick={() => handleEditReview(review)}
													className="btn btn-primary col-lg-5 mx-1 mb-1"
												>
													Edit
												</a>
											</div>
										)}
									</div>
								</div>
							</div>
						);
					})
				) : (
					<div className="col-sm-4">
						<p>No reviews yet.</p>
					</div>
				)}
			</div>
		</>
	);
};

export default RestaurantReviews;
