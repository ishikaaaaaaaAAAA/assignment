const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];


function initialize() {
    return new Promise((resolve, reject) => {
        try {
            sets = setData.map(set => {
                let theme = themeData.find(theme => theme.id === set.theme_id);
                return {
                    ...set,
                    theme: theme ? theme.name : "Unknown"
                };
            });
            resolve();
        } catch (error) {
            reject("Error initializing sets");
        }
    });
}

function getAllSets() {
    return new Promise((resolve, reject) => {
        try {
            resolve(sets);
        } catch (error) {
            reject("Error retrieving all sets");
        }
    });
}

function getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
        try {
            const set = sets.find(set => set.set_num === setNum);
            if (set) {
                resolve(set);
            } else {
                reject(`Set with number ${setNum} not found`);
            }
        } catch (error) {
            reject("Error retrieving set by number");
        }
    });
}

function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
        try {
            const matchingSets = sets.filter(set => set.theme.toLowerCase().includes(theme.toLowerCase()));
            if (matchingSets.length > 0) {
                resolve(matchingSets);
            } else {
                reject(`No sets found matching theme ${theme}`);
            }
        } catch (error) {
            reject("Error retrieving sets by theme");
        }
    });
}

initialize()
    .then(() => {
        return getAllSets();
    })
    .then(allSets => {
        console.log("All Sets:", allSets);
        return getSetByNum("001-1");
    })
    .then(set => {
        console.log("Set 001-1:", set);
        return getSetsByTheme("tech");
    })
    .then(setsByTheme => {
        console.log("Sets with theme 'tech':", setsByTheme);
    })
    .catch(error => {
        console.error(error);
    });

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };