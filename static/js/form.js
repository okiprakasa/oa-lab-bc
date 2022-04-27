const form = document.querySelector("form"),
    pdfRead = document.getElementById("pdf-reader"),
    nextBtn = document.getElementById("nextBtn"),
    backBtn = form.querySelector(".backBtn"),
    allInput = form.querySelectorAll(".first input");

nextBtn.addEventListener("click", ()=> {
    allInput.forEach(input => {
        if(input.value !== ""){
            form.classList.add('secActive');
        }else{
            form.classList.remove('secActive');
        }
    })
})

backBtn.addEventListener("click", () => {
    form.classList.remove('secActive')
});

pdfRead.addEventListener("click", ()=> {
    console.log("tested")
})