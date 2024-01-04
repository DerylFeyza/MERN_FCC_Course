import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
import jsonwebtoken from "jsonwebtoken";
const SECRET_KEY = "deeztaurant";

let accounts;

export default class UsersDAO {
	static async injectDB(conn) {
		if (accounts) {
			console.log("woo");
			return;
		}
		try {
			accounts = await conn.db(process.env.RESTREVIEWS_NS).collection("users");
		} catch (e) {
			`error ${e}`;
		}
	}

	static async loginUser(user, password) {
		try {
			const userData = {
				user: user,
				password: password,
			};
			const findUser = await accounts.findOne(userData);
			if (findUser == null) {
				return {
					success: false,
					message: "email or password doesn't match",
				};
			}
			console.log(findUser);
			let tokenPayLoad = {
				user: findUser.user,
			};
			tokenPayLoad = JSON.stringify(tokenPayLoad);
			let token = await jsonwebtoken.sign(tokenPayLoad, SECRET_KEY);

			return {
				success: true,
				data: {
					token: token,
					user: findUser.user,
				},
			};
		} catch (e) {
			console.error(`unable to post user${e}`);
			return { success: false, error: e.message };
		}
	}

	static async addUser(user, password) {
		try {
			const userData = {
				user: user,
				password: password,
			};
			return await accounts.insertOne(userData);
		} catch (e) {
			console.error(`unable to post user${e}`);
			return { error: e };
		}
	}

	static async deleteUser(userId) {
		try {
			console.log(userId);
			const deleteOneUser = await accounts.deleteOne({
				_id: new ObjectId(userId),
			});
			return deleteOneUser;
		} catch (e) {
			console.error(`unable to delete user ${e}`);
			return { error: e };
		}
	}
}
