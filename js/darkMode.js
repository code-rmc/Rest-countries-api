
if (localStorage.getItem('dark-mode') === "true") {
    document.body.classList.add("dark");
    mode.childNodes[0].className = "fas fa-moon";
}

// light and dark mode
mode.addEventListener("click", (e) => {
    document.body.classList.toggle("dark");
    if (mode.childNodes[0].className == "fas fa-moon") {
        mode.childNodes[0].className = "far fa-moon";
        localStorage.setItem('dark-mode', 'false');
    } else {
        mode.childNodes[0].className = "fas fa-moon";
        localStorage.setItem('dark-mode', 'true');
    }
});