
let preuzmi = () => {
    let divDest = document.getElementById("destinacije");
    //brise ponude(destinacije) iz html-a
    divDest.innerHTML = "";
    ///...nastaviti
}

let resetOkvir= ()=>{
	//dodatak: ovo nije traženo u ispitnom zadatku
    document.querySelectorAll(".offer").forEach(a=>a.style.border="4px solid rgba(0,0,0,0)");   
}


let ErrorBackgroundColor="#FE7D7D";
let OkBackgroundColor="#DFF6D8";


let test_email = ()=>{
    let txt=document.getElementById("email");
    if (!/^[a-z]+(\.|\-|\_)?[a-z]*\@edu.fit.ba$/.test(txt.value)){
        txt.style.backgroundColor = ErrorBackgroundColor;
        return "Email nije u ispravnom formatu!\n";
    }
    else{
        txt.style.backgroundColor = OkBackgroundColor;
        return "";
    }
}
let test_phone = ()=>{
    let txt=document.getElementById("phone");
    if (!/\+\d{3}\-\d{2}\-\d{3}\-\d{3}$/.test(txt.value)){
        txt.style.backgroundColor = ErrorBackgroundColor;
        return "Telefon nije u ispravnom formatu!\n";
    }
    else{
        txt.style.backgroundColor = OkBackgroundColor;
        return "";
    }
}

let posalji = () => {

    let s="";

    s+= test_email();
    s+= test_phone();
    
    if (s !== "")
    {
        alert(s);
        return;
    }
    
}