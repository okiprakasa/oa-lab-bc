const body = document.querySelector('body'),
    sidebar = body.querySelector('nav'),
    toggle = body.querySelector(".toggle"),
    modeSwitch = body.querySelector(".toggle-switch"),
    searchText = document.getElementById("search-text"),
    modeText = body.querySelector(".mode-text");
console.log(localStorage.getItem("oa-blbc-sidebar"))
toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
    if (sidebar.classList.contains("close")) {
        localStorage.setItem("oa-blbc-sidebar","close")
        console.log(localStorage.getItem("oa-blbc-sidebar"))
    } else {
        localStorage.setItem("oa-blbc-sidebar","open")
        console.log(localStorage.getItem("oa-blbc-sidebar"))
    }
    if (searchText.placeholder === "") {
        searchText.placeholder = "Search...";
    } else {
        searchText.placeholder = "";
    }
})
modeSwitch.addEventListener("click" , () =>{
    body.classList.toggle("dark");
    if(body.classList.contains("dark")){
        localStorage.setItem("oa-blbc-mode", "dark");
        modeText.innerText = "Night";
    }else{
        localStorage.setItem("oa-blbc-mode", "");
        modeText.innerText = "Day";
    }
});

if (typeof(Storage) !== "undefined") {
    if (localStorage.getItem("oa-blbc-mode") === "dark") {
        if (!body.classList.contains("dark")) {
            body.classList.add("dark");
            body.querySelector(".switch").setAttribute("left", "1.25em");
            modeText.innerText = "Night";
        }
    } else {
        if (body.classList.contains("dark")) {
            body.classList.remove("dark");
            body.querySelector(".switch").setAttribute("left", "0.3125em");
            modeText.innerText = "Day";
        }
    }
    if (localStorage.getItem("oa-blbc-sidebar")) {
        if (localStorage.getItem("oa-blbc-sidebar") === "open") {
            if (sidebar.classList.contains("close")) {
                sidebar.classList.remove("close")
            }
        } else {
            if (!sidebar.classList.contains("close")) {
                sidebar.classList.add("close")
            }
        }
    }
}