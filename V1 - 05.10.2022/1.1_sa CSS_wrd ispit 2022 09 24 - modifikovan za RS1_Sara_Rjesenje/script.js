
let preuzmi = () => {
    // Zadatak 2 a) obrisati sve sto je bilo
    let divDest = document.getElementById("destinacije"); //uzima html el sa ovim id
    divDest.innerHTML = "";//brise ponude(destinacije), gore uzetog html el. iz html-a tako sto je stavljen prazan string""

    ///...nastaviti
    // Zadatak 2 b) dodati nove ponude sa web servisa
    //Koraci:
    //1. fetch
    //2. novi html code ugraditi u gore obrisani divDest: -> divDest.innerHTML=stariCode + noviCode;

    //4. prilagoditi url link da preuzima sve ponude za svaku firmu pojedinacno  
    let nazivFirme = document.getElementById("firma").value;
    let url = `https://restapiexample.wrd.app.fit.ba/Ispit20220924/GetPonuda?travelfirma=${nazivFirme}`;


    //3. srediti prikaz preuzetih ponuda sa web servisa kopirajuci zakomentirani html code, koji je prilagođen unutar <div> unutar js fetch dijela
    //4. izvuci sve opcije za Cmb 
    fetch(url)
        .then(
            r => {
                if (r.status !== 200) {
                    alert("Server javlja grešku: " + r.status);
                    return;
                }

                r.json().then(x => {

                    let satnica = x.datumPonude;

                    for (const p of x.podaci) {

                        /*let drzava=p.mjestoDrzava;
                        let cijena=p.cijenaDolar;*/

                        let opcijeZaCmd = "";
                        for (const o of p.opcije) {
                            opcijeZaCmd += `<option>${o}</option>`;
                        }

                        let novihtmlCode =
                            `
       
        <article class="offer">
        <div class="akcija">${p.akcijaPoruka}</div>
        <div  class="offer-image" style="background-image: url('${p.imageUrl}');" ></div>
        <div class="offer-details">
        <div class="offer-destination">${p.mjestoDrzava}</div>
        <div class="offer-price">$${p.cijenaDolar}</div>
        <div class="offer-description">${p.opisPonude}</div>
        <div class="offer-firma">${p.travelfirma}</div>
        <select class="offer-option">${opcijeZaCmd}</select>
        </div>
        <div class="ponuda-dugme-1" onclick='destinacija1("${p.mjestoDrzava}", ${p.cijenaDolar}, this)'>Odaberi za destinaciju 1</div>
        <div class="ponuda-dugme-2" onclick="destinacija2('${p.mjestoDrzava}', ${p.cijenaDolar}, this)">Odaberi za destinaciju 2</div>
        
        </article>
        
        `;

                        divDest.innerHTML += novihtmlCode;
                    }
                });
            })
        .catch(
            err => {
                alert("Greška u komunikaciji sa serverom: " + err);
            });
}

//Zadatak 3. a)klikom na dugme preuzeti u txtBox destinaciju drzvau + korak 3.
//1. kreiranje funkcija onClick iz html-a kojima se salju vrijednosti
let destinacija1 = (destinacija, cijena, dugme) => {
    //3. preuzimanje ponude iz comboBox-a - najlakši način proslijediti dugme tj. event "this" kao paramtear unutar funkcije

    let odabranaCombooxOpcija = dugme.parentElement.querySelector(".offer-option").value;

    document.getElementById("destinacija-1").value = destinacija + " " + odabranaCombooxOpcija;
    document.getElementById("cijena-1").value = cijena;

    //2. suma cijena 2 aranžmana:
    document.getElementById("cijena-ukupno").value = cijena + Number(document.getElementById("cijena-2").value);
}

let destinacija2 = (destinacija, cijena, dugme) => {
    let odabranaCombooxOpcija = dugme.parentElement.querySelector(".offer-option").value;

    document.getElementById("destinacija-2").value = destinacija + " " + odabranaCombooxOpcija;
    document.getElementById("cijena-2").value = cijena;

    document.getElementById("cijena-ukupno").value = cijena + Number(document.getElementById("cijena-1").value);

}




let resetOkvir = () => {
    //dodatak: ovo nije traženo u ispitnom zadatku
    document.querySelectorAll(".offer").forEach(a => a.style.border = "4px solid rgba(0,0,0,0)");
}


let ErrorBackgroundColor = "#FE7D7D";
let OkBackgroundColor = "#DFF6D8";

//Validacija:
let test_email = () => {
    let txt = document.getElementById("email"); //uzima txtBox gdje je upisana email adresa
    if (!/^[a-z]+(\.|\-|\_)?[a-z]*\@edu.fit.ba$/.test(txt.value)) { //njegov value testira sa ovim ovdje napisanim regexom
        txt.style.backgroundColor = ErrorBackgroundColor; //ako nije uspješan test označi ga ovom bojom
        return "Email nije u ispravnom formatu!\n"; //vrati poruku za korisnika
    }
    else { //ako je ispravan test; ispravna emial adresa korisnika
        txt.style.backgroundColor = OkBackgroundColor;
        return "";
    }
}
let test_phone = () => {
    let txt = document.getElementById("phone");
    if (!/\+\d{3}\-\d{2}\-\d{3}\-\d{3}$/.test(txt.value)) {
        txt.style.backgroundColor = ErrorBackgroundColor;
        return "Telefon nije u ispravnom formatu!\n";
    }
    else {
        txt.style.backgroundColor = OkBackgroundColor;
        return "";
    }
}
//poziv obje funkcije za Validaciju se radi klikom na button Pošalji
let posalji = () => {

    let s = "";

    s += test_email(); //provjere se oba txtBoxa
    s += test_phone();

    if (s !== "") //ako su obje vrijednosti ispavne (return dio u funkcijama gdje se vraca prazan string "")
    {
        alert(s); //ako je prazan string, nema ove vrijednosti, upozorenja, idemo dalje
        return;
    }
    //i onda nam treba:
    //-- code za slanje rezervacije na server

    //Zadatak 3. b) Klikom na dugme Send - slanje podataka na web servis
    //1. koristeći fetch POST (Fetch za slanje)
    let url = "https://restapiexample.wrd.app.fit.ba/Ispit20220924/Add";
    var z = new Object();
    z.destinacija1Soba = document.getElementById("destinacija-1").value;
    z.destinacija2Soba = document.getElementById("destinacija-2").value;
    z.imeGosta = document.getElementById("first-name").value;
    z.prezimeGosta = document.getElementById("last-name").value;
    z.poruka = document.getElementById("messagetxt").value;
    z.email = document.getElementById("email").value;
    z.telefon = document.getElementById("phone").value;
    var strJson = JSON.stringify(z);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: strJson,
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success: ', data);
            //dio da korisnik dobio potvrdu o broju rezervacije; kojeg "izvalačimo" iz response dijela: network - preview
            alert('Poruka: ' + data.poruka + '\n' + 'Broj rezrevacije: ' + data.brojRezervacije + '\n' + data.vrijeme);
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
}


//Nazivi firmi unutar padajućeg izbornika
fetch("https://restapiexample.wrd.app.fit.ba/Ispit20220924/GetTravelFirme")
    .then(
        r => {
            if (r.status !== 200) {
                alert("Server javlja grešku: " + r.status);
                return;
            }

            r.json().then(x => {
                for (const p of x) {
                    let novihtmlCode =
                        `<option>${p.naziv}</option>
                `;
                    document.getElementById("firma").innerHTML += novihtmlCode;
                }
            });
        }
    )

    .catch(
        err => {
            alert("Greška u komunikaciji sa serverom: " + err);
        }
    );
