const fs = require("node:fs");
const data = require("./data.json");

module.exports = {
	data: data,
	save: function () {
		fs.writeFileSync("./data.json", JSON.stringify(data, null, 4), (err) => {
			if (err) console.log(err);
		});
	},
	initUser: function (id) {
		if (!data[id]) {
			data[id] = {
				balance: 10,
			};
		}
	}
};
