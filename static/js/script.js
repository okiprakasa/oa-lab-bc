const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toggle = body.querySelector(".toggle"),
      searchBtn = body.querySelector(".search-box"),
      modeSwitch = body.querySelector(".toggle-switch"),
      searchText = document.getElementById("search-text"),
      modeText = body.querySelector(".mode-text");

toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
    if (searchText.placeholder === "") {
        searchText.placeholder = "Search...";
    } else {
        searchText.placeholder = "";
    }
})

searchBtn.addEventListener("click" , () =>{
    sidebar.classList.remove("close");
    if (searchText.placeholder === "") {
        searchText.placeholder.toggle("Search...");
    } else {
        searchText.placeholder.toggle("");
    }
})

modeSwitch.addEventListener("click" , () =>{
    body.classList.toggle("dark");
    
    if(body.classList.contains("dark")){
        modeText.innerText = "Night";
    }else{
        modeText.innerText = "Day";
    }
});