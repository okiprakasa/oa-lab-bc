const form = document.querySelector("form"),
    pdfRead = document.getElementById("pdf-reader"),
    nextBtn = document.getElementById("nextBtn"),
    jumlahSampel = document.getElementById("jumlah-sampel"),
    noSampel = document.getElementById('nomor'),
    namaSampel = document.getElementById('nama'),
    backBtn = form.querySelector(".backBtn"),
    allInput = form.querySelectorAll(".first input");
let j = 0;

function addInput() {
    let i = 1, total=parseInt(jumlahSampel.value);
    if (total>0 && total!==j && total<151) {
        if (total-j>0) {
            while (total-j-i>=0) {
                const inputNo = document.createElement("input");
                inputNo.placeholder = (j+i).toString();
                inputNo.id = (j+i).toString();
                noSampel.appendChild(inputNo)
                const inputNama = document.createElement("input");
                inputNama.placeholder = "Sampel " + (j+i).toString();
                inputNama.id = "sampel"+(j+i).toString();
                namaSampel.appendChild(inputNama)
                i++;
            }
        } else {
            while (j-i-total>=0) {
                noSampel.removeChild(noSampel.lastChild);
                namaSampel.removeChild(namaSampel.lastChild);
                i++;
            }
        }
        j=total
    }
}

nextBtn.addEventListener("click", ()=> {
    const list = document.getElementById('listDokumen').options;
    let i=0, match=false, jenisDokumen = document.getElementById('jenis-dokumen').value;
    console.log("before changed = "+jenisDokumen);
    while (i<list.length) {
        console.log(list.item(i).value)
        if (jenisDokumen.toLowerCase() === list.item(i).value.toLowerCase()) {
            jenisDokumen = list.item(i).value;
            console.log("after changed = "+jenisDokumen);
            match=true;
            break
        }
        i++
    }
    if (!match) {
        jenisDokumen = "Lain-lain";
        console.log("no match = "+jenisDokumen);
    }
    allInput.forEach(input => {
        if(input.value !== ""){
            form.classList.add('secActive');
        }else{
            form.classList.remove('secActive');
        }
    })
})

backBtn.addEventListener("click",()=>{
    form.classList.remove('secActive');
});

pdfRead.addEventListener("click",()=>{
    jumlahSampel.value = "3";
    addInput();
})

jumlahSampel.addEventListener('input',addInput);