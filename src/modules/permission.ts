import redis from "./redis";

var lvl_six_users = [];

redis.get("lvl_six_users").then((value: string) => {
	if (value) {
		const lvl_six_users_array = value.split(",");
		lvl_six_users_array.forEach((user: string, index: string | number) => {
			lvl_six_users_array[index] = user.trim();
		});
		lvl_six_users = lvl_six_users_array;
	}
});

function userIsLvlSix(user_id: string) {
	if (lvl_six_users.includes(user_id)) {
		return true;
	} else {
		return false;
	}
}

export default { userIsLvlSix };
