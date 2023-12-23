import UsersDAO from "../dao/usersDAO.js";

export default class UserController {
	static async addUser(req, res, next) {
		try {
			const user = req.body.user;
			const password = req.body.password;
			const userData = await UsersDAO.addUser(user, password);
			res.json(200, { status: "success" });
		} catch (e) {
			res.status(500).json({ error: e.message });
		}
	}

	static async deleteUser(req, res, next) {
		try {
			const userId = req.query.userId;
			const deleteUserResponse = await UsersDAO.deleteUser(userId);
			res.json({ status: "user has been deleted" });
		} catch (e) {
			res.status(500).json({ error: e.message });
		}
	}
}
