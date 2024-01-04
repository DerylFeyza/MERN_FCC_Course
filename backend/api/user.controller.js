import UsersDAO from "../dao/usersDAO.js";

export default class UserController {
	static async login(req, res, next) {
		try {
			const user = req.body.user;
			const password = req.body.password;

			const result = await UsersDAO.loginUser(user, password);
			if (result.success) {
				res.status(200).json({
					message: "Success Login",
					data: result.data,
				});
			} else {
				res.status(400).json({
					message: result.message,
				});
			}
		} catch (e) {
			res.status(500).json({ error: e.message });
		}
	}

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
			const userId = req.params.id;
			const deleteUserResponse = await UsersDAO.deleteUser(userId);
			res.json({ status: "user has been deleted" });
		} catch (e) {
			res.status(500).json({ error: e.message });
		}
	}
}
