"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const data_json_1 = __importDefault(require("../data/data.json"));
const defaultUserData_json_1 = __importDefault(require("../data/defaultUserData.json"));
const prodFlag = false; // Set to true if you want a minimized data.json file (no whitespace)
function stringify(data) {
    if (prodFlag) {
        return JSON.stringify(data);
    }
    else {
        return JSON.stringify(data, null, 4);
    }
}
function initializeUser(id) {
    if (!data_json_1.default[id]) {
        data_json_1.default[id] = defaultUserData_json_1.default;
    }
}
// GDPR compliance despite being a private bot :)
function purgeUser(id) {
    delete data_json_1.default[id];
}
// This function adds new keys to the user's data if they don't exist
// This is useful for adding new features to the bot without breaking old data
// This also prevents the need to manually set values for new keys in random places
function addNewKeys(id, keys) {
    initializeUser(id); // Make sure the user exists
    for (const key of keys) {
        if (!data_json_1.default[id][key]) {
            data_json_1.default[id][key] = defaultUserData_json_1.default[key];
        }
    }
}
function saveAll() {
    node_fs_1.default.writeFileSync("./data.json", stringify(data_json_1.default));
}
// As opposed to saving the file every time a change is made, this function
// saves the file every 5 minutes. This is to prevent the bot from crashing
// and losing all data if the bot crashes.
let autoSaveStarted = false;
function startAutoSave() {
    if (autoSaveStarted) {
        console.warn("Autosave was triggered despite already being started!");
        return;
    }
    ;
    autoSaveStarted = true;
    setInterval(() => {
        saveAll();
    }, 300000);
}
