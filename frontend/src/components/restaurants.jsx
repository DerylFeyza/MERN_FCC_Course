import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantDataService from "../services/restaurant";

const RestaurantReviews = () => {
	const { id } = useParams();
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const response = await RestaurantDataService.get(id);
				setReviews(response.data.reviews);
			} catch (error) {
				console.error("Error fetching reviews", error);
			}
		};

		fetchReviews();
	}, [id]);

	return (
		<div>
			<h2>Reviews for Restaurant ID: {id}</h2>
			<ul>
				{reviews.map((review) => (
					<li key={review._id}>
						<p>User: {review.name}</p>
						<p>Date: {review.date}</p>
						<p>{review.text}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default RestaurantReviews;
