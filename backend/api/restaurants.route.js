import express from "express";
import RestaurantsCtrl from "./restaurants.controller.js";
import ReviewsCtrl from "./reviews.controller.js";
import UserCtrl from "./user.controller.js";
const router = express.Router();
router.route("/").get(RestaurantsCtrl.apiGetRestaurants);
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById);
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines);

router
	.route("/review")
	.post(ReviewsCtrl.apiPostReview)
	.put(ReviewsCtrl.apiUpdateReview)
	.delete(ReviewsCtrl.apiDeleteReview);

router.route("/user").post(UserCtrl.addUser);
router.route("/user/login").post(UserCtrl.login);
router.route("/user/:id").delete(UserCtrl.deleteUser);

export default router;
