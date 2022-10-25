
let preuzmi = () => {
    
}


let ErrorBackgroundColor="#FE7D7D";
let OkBackgroundColor="#DFF6D8";



let posalji = () => {

    let url = `https://restapiexample.wrd.app.fit.ba/Ispit20220924/Add`;
   
    let obj = new Object();
  
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    }).then(r => {
        if (r.status != 200) {
            alert("Server javlja gresku " + r.status);
            return;
        }
        r.json().then(x => {
            alert("Vasa rezervacija je poslana. Broj rezervacije: " + x.brojRezervacije);
        });
        
    }).catch(error => {
        alert("Greska u komunikaciji sa serverom " + error.status);
    })
}