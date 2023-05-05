import fs from "node:fs";
import data from "../../data.json";
import defaultUserData from "../../defaultUserData.json";

const prodFlag = false; // Set to true if you want a minimized data.json file (no whitespace)

function stringify(data: Object) {
	if (prodFlag) {
		return JSON.stringify(data);
	} else {
		return JSON.stringify(data, null, 4);
	}
}



function initializeUser(id: number) {
	if (!data[id]) {
		data[id] = defaultUserData;
	}
}

// GDPR compliance despite being a private bot :)
function purgeUser(id: number) {
	delete data[id];
}

// This function adds new keys to the user's data if they don't exist
// This is useful for adding new features to the bot without breaking old data
// This also prevents the need to manually set values for new keys in random places
function addNewKeys(id: number, keys: string[]) {
	initializeUser(id); // Make sure the user exists
	for (const key of keys) {
		if (!data[id][key]) {
			data[id][key] = defaultUserData[key];
		}
	}
}

function saveAll() {
	fs.writeFileSync("./data.json", stringify(data));
}

// As opposed to saving the file every time a change is made, this function
// saves the file every 5 minutes. This is to prevent the bot from crashing
// and losing all data if the bot crashes.
let autoSaveStarted = false;
function startAutoSave() {
	if (autoSaveStarted) {
		console.warn("Autosave was triggered despite already being started!")
		return;
	};
	autoSaveStarted = true;

	setInterval(() => {
		saveAll();
	}, 300000);
}
