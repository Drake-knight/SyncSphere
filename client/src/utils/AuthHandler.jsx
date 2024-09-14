import axios from "axios";

export const authenticate = async (user) => {
	if (!user.password || user.password.length < 8) return false;
	try {
		const res = await axios.post("/login", user);
		if (res.status === 200) return true;
		return false;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const validate = async () => {
	try {
		const res = await axios.post("/validate", {});
		console.info(res);
		return res.status === 200;
	} catch (error) {
		console.error(error);
		return false;
	}
};
