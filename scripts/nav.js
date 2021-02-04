"use strict";
const folder = document.querySelectorAll(".nav__folders-folder");

const TODAY = "Today",
    THIS_WEEK = "This week",
    BUCKET = "Bucket list";

let tasks = [];
// let taskObj = {
//     foldername,
//     toDos: [],
// }

function paintFolder(whisky) {
    let folderTasks = localStorage.getItem(whisky);
    if (folderTasks) {
        folderTasks = JSON.parse(folderTasks);
    }
}

function loadFolder(event) {
    let folder = event.target;
    if (folder.tagName === "I") {
        folder = folder.parentNode;
    }
    let folderName = folder.innerText;
    paintFolder(folderName);
}

function init() {
    folder.forEach((folder) => folder.addEventListener("click", loadFolder));
}

init();