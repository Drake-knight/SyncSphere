import api from "./axios";

export const authenticate = async (user) => {
    if (!user.password || user.password.length < 8) return false;
    try {
        const res = await api.post("/login", user);
        if (res.status === 200 && res.data.token) {
            return { token: res.data.token, name: res.data.user.name };
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const register = async (user) => {
    if (!user.password || user.password.length < 8) return false;
    try {
        const res = await api.post("/register", user);
		console.info(res);
        if (res.status === 200 && res.data.token) {
            return { token: res.data.token, user: res.data.user.name };
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const validate = async () => {
    try {
        const res = await api.post("/validate", {});
        console.info(res);
        return res.status === 200;
    } catch (error) {
        console.error(error);
        return false;
    }
};