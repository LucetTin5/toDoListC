const img = document.querySelector("#bgImg");
const imgSelect = document.querySelector("#bgImg_selection");

const TAG = "tag";

function paintBg() {
    let bgTag = localStorage.getItem(TAG);
    if (!bgTag) {
        img.src = "https://images.unsplash.com/photo-1546874177-9e664107314e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
    } else {
        img.src = `https://source.unsplash.com/1920x1080/?${bgTag}`;
    }
}
function handleTag(event) {
    event.preventDefault();
    console.log(event.target.value);
    let searchTag = event.target.value;
    if (searchTag !== "") {
        localStorage.setItem(TAG, searchTag);
        paintBg();
    }
}
function init() {
    imgSelect.addEventListener("change", handleTag);
    paintBg();
}
init();


