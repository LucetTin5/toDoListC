const googleInput = document.querySelector(".sidebar__google");
const searchInput = googleInput.querySelector("#sidebar__google-search");

function handleSearch(event) {
    event.preventDefault();
    let searchWord = searchInput.value;
    if (searchWord !== ""){
        const GOOGLE = `https://www.google.com/search?q=${searchWord}`;
        window.open(GOOGLE);
        searchInput.value = "";
    }
}

function init() {
    googleInput.addEventListener("submit", handleSearch);
}

init();