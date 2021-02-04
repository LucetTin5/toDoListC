"use strict";
const nameInput = document.querySelector("#header__heading"),
    namePlace = document.querySelector(".header__heading");

const USER_NAME = "username";

function paintName() {
    let username = localStorage.getItem(USER_NAME);
    if (username) {
        nameInput.className = "header__heading-inv";
        namePlace.innerText = `${username.toUpperCase()}'s TO DO LIST`
    }
}
function getName(event) {
    event.preventDefault();
    let username = event.target.value;
    if (username !== "") {
        localStorage.setItem(USER_NAME, username);
        nameInput.className = "header__heading-inv";
        namePlace.innerText = `${username.toUpperCase()}'s TO DO LIST`
    }
}
function init() {
    paintName();
    nameInput.addEventListener("change", getName);
}
init();