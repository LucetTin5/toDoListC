const adviceContainer = document.querySelector("#advice_container");

const API_URL = "https://api.adviceslip.com/advice"

function advice(whisky) {
    let text = whisky.slip.advice;
    adviceContainer.innerText = text;
}
function init() {
    fetch(API_URL).then((response) => response.json()).then((json) => advice(json));
}

init();