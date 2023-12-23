import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
const jsonwebtoken = require("jsonwebtoken");
const SECRET_KEY = "secretcode";

let users;

export default class UsersDAO {
	static async injectDB(conn) {
		if (users) {
			return;
		}
		try {
			users = await conn.db(process.env.RESTREVIEWS_NS).collection("users");
		} catch (e) {
			console.error(`Unable to establish a collection handle in userDAO: ${e}`);
		}
	}

	static async addUser(name, password) {
		try {
			const userData = {
				name: name,
				password: password,
			};
			return await users.insertOne(userData);
		} catch (e) {
			console.error(`unable to post user ${e}`);
			return { error: e };
		}
	}

	static async deleteUser(userId) {
		try {
			const deleteOneUser = await users.deleteOne({
				_id: new ObjectId(userId),
			});
			return deleteOneUser;
		} catch (e) {
			console.error(`unable to delete user ${e}`);
			return { error: e };
		}
	}
}
