const clockContainer = document.querySelector("#clock");

function clockFn() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const spanAmPm = clockContainer.querySelector("#clock__ampm"),
        spanHour = clockContainer.querySelector("#clock__hour"),
        spanMin = clockContainer.querySelector("#clock__minutes");
    if (hours < 12) {
        spanAmPm.innerText = "AM";
        spanHour.innerText = `${hours < 10 ? `0${hours}`: hours}`;
    } else {
        spanAmPm.innerText = "PM";
        spanHour.innerText = `${(hours - 12) < 10 ? `0${hours - 12}`: hours - 12}`;
    }
    spanMin.innerText = `${minutes < 10 ? `0${minutes}`: minutes}`;
}

function init() {
    clockFn();
    setInterval(clockFn, 60000);
}

init();