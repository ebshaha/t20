var currentMode = localStorage.getItem("mode");
if (currentMode === "dark") {
    setDarkMode();
} else {
    setLightMode();
}

function toggleBackground() {
    var currentMode = localStorage.getItem("mode");

    if (currentMode === "dark") {
        setLightMode();
    } else {
        setDarkMode();
    }
}

function setDarkMode() {
    var body = document.querySelector("body");
    body.style.backgroundColor = "#0c0000";
    localStorage.setItem("mode", "dark");
}

function setLightMode() {
    var body = document.querySelector("body");
    body.style.backgroundColor = "whitesmoke";
    localStorage.setItem("mode", "light");
}
window.onscroll = function () {
    showButton();
};

function showButton() {
    var button = document.getElementById("backToTop");

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}