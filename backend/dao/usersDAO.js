import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

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
