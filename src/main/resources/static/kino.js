

/*Lager et array for å oppbevare kinobillett-registreringene*/
let kinoBilletterRegister = [];


/* Lager en funksjon som skal skrive ut billettinformasjonen. Lager en variabel 'ut', type string som skal inneholde tabell som viser billettinformasjonen.
Starter med å definere at tabellen skal ha en border så det blir enklere å se den. En tabellrad (<tr>) med alle attributtene som overskrifter (table headings (<th>)).
Lager en forløkke som iterer gjennom elementene i arrayet kinoBilletterRegister og legger informasjonen til 'ut'-strengen*/
function visBilletter() {
    /* Tabell med kantlinje så den er enklere å se */
    let ut = "<table border='1'><tr>" +
        "<th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnummer</th><th>E-post</th>"
        + "</tr>";
    /*Itererer gjennom hvert element i arrayet kinoBilletterRegister. Hvert element i arrayet er et objekt som representerer informasjonen om en billett,
    og har egenskapene, film, antall, fornavn, etternavn, telefonnummer og e-post. Variabelen 'b' inneholder hvert billettobjekt i løpet av hver iterasjon.
    b.film, b.antall osv refererer direkte til egenskapene til objektet b. Deretter legges dataene om hver billett til variabelen 'ut' for å lage
    en tabell over billetene. */

    /*Legger til informasjon til tabellen*/
    for (let b of kinoBilletterRegister) {
        ut += "<tr>"; /*Åpner en ny rad for å legge inn informasjonen i datacellene*/
        ut += "<td>" + b.film + "</td>" +
            "<td>" + b.antall + "</td>" +
            "<td>" + b.fornavn + "</td>" +
            "<td>" + b.etternavn + "</td>" +
            "<td>" + b.telefonnummer + "</td>" +
            "<td>" + b.epost + "</td>";
        ut += "</tr>"; /*Lukker raden når all informasjonen om billetten er lagt inn*/
    }
    document.getElementById("kjøpteBilletter").innerHTML = ut;
} /*Deretter oppdateres HTML innholdet til id=kjøpteBilletter ved hjelp av
document.getElementById. Bruker innerHTML for å erstatte innholdet med tabellen som nå er lagret i variabelen 'ut.' */

/*Lager en funksjon som skal registrere inputene. Lager en konstant variabel og bruker document.getElementById, en metode som brukes til å hente
et HTML-element ved hjelp av Id-tagen. På siden skriver brukeren inn sitt svar i inputboks. Denne informasjonen hentes via document.getElementById og vi setter variabelens
verdi lik den input-verdi vi får fra HTML-elementet.
*/
function registrer() {
    const film = document.getElementById("velgFilm").value;
    const antall = document.getElementById("antall").value;
    const fornavn = document.getElementById("fornavn").value;
    const etternavn = document.getElementById("etternavn").value;
    const telefonnummer = document.getElementById("telefonnummer").value;
    const epost = document.getElementById("epost").value;


    /*Valideringer og feilmeldinger*/

    /*Lager array for feilmeldinger, dette er for at feilmeldingene skal komme opp samtidig. */
    let errorMeldinger = [];

    /*Feilmelding-scenarioer*/

    /*Kun bokstaver: Fornavn må matche og begynne på bokstaver fra A til Z, enten i små eller store bokstaver.Dette mønsteret er fra /^=start til $=slutt av strengen.
    Dersom det ikke matcher skal en feilmelding pushes inn i feilmeldingsarrayet*/

    if(!fornavn.match(/^[A-Za-zæøå]*$/)){
        errorMeldinger.push("Skriv inn bokstaver")
    }

    /*Sikrer at navnet ikke er på en bokstav*/
    if(fornavn.length<=1){
        errorMeldinger.push("Vennligst skriv inn gyldig fornavn")
    }

    /*Kun bokstaver: Etternavn må matche og begynne på bokstaver fra A til Z, enten i små eller store bokstaver.Dette mønsteret er fra /^=start til $=slutt av strengen.
Dersom det ikke matcher skal en feilmelding pushes inn i feilmeldingsarrayet*/
    if(!etternavn.match(/^[A-Za-zæøå]*$/)){
        errorMeldinger.push("Skriv inn bokstaver")
    }

    /*Sikrer at navnet ikke er på en bokstav*/
    if(etternavn.length<=1){
        errorMeldinger.push("Vennligst skriv inn gyldig etternavn")
    }

    /*  /^= starten
    \w+ = kun bokstaver, tall eller understrek,
    ([.-]?\w+)* = for punktum etterfulgt av enten bokstaver, tall eller understrek.
    @ = alfakrøll etterfulgt av domenenavn \w+ som kan være bokstaver, tall eller understrek.
    ([._]?\w+)* = tillatter punktum eller understrek, bokstaver og tall i domenenavnet.
    (\.\w{2,3})+$/) = Matcher et punktum etterfulgt av 2 eller 3 alfanumeriske tegn for domene
    $ =slutten av en streng.

Dersom det ikke matcher skal en feilmelding pushes inn i feilmeldingsarrayet*/
    if(!epost.match(/^\w+([._]?\w+)*@\w+([._]?\w+)*(\.\w{2,3})+$/)){
        errorMeldinger.push("Skriv inn gyldig E-post")
    }

    /*Hvis film option er lik første valg på lista, altså --Velg film--, legges det inn feilmelding*/
    if (film === "--Velg film--") {
        errorMeldinger.push("Velg en film");
    }

    /*Hvis ingenting er valgt fra option, eller andre felt = feilmelding inn i feilmeldings-array om at alle felter må fylles*/
    if (!antall || !fornavn || !etternavn || !telefonnummer ||
        !epost) {
        errorMeldinger.push("Alle felter må fylles ut");
    }

    /* Hvis antall ikke er et tall (isNotANumber), feilmelding inn i feilmeldings-array*/
    if (isNaN(antall)) {
        errorMeldinger.push("Antall må være et tall");
    }

    /* Hvis telefonnummer ikke er et tall, feilmelding inn i feilmeldings-array*/
    if (isNaN(telefonnummer)) {
        errorMeldinger.push("Telefonnummer må være et tall");
    }

    if(telefonnummer.length<8){
        errorMeldinger.push("Dette er ikke gyldig norsk telefonnummer. Minst 8 siffer");
    }


    /*Feilmeldinger og handlinger
    Hvis arrayet errorMeldinger inneholder en feilmelding som heter "Velg en film" så vil det endres på HTML-siden i tagen "errorFilm" ved
    hjelp av document.getElementById. Ved hjelp av textContent bestemmer vi at id-tagen nå skal vise tekst = "Velg en film".
    Dersom betingelsen for feilmeldingen ikke er tilstede, vil id-tagens feilmeldingstekst viskes ut.
    Gjentar det samme med de andre feilmeldingene.*/

    if (errorMeldinger.includes("Velg en film")) {
        document.getElementById("errorFilm").textContent = "Velg en film";
    } else {
        document.getElementById("errorFilm").textContent = "";
    }

    /*Antall må være et tall. Feilmeldingen forsvinner dersom dette rettes opp*/
    if (errorMeldinger.includes("Antall må være et tall")) {
        document.getElementById("errorAntall").textContent = "Antall må være et tall";
    } else {
        document.getElementById("errorAntall").textContent = "";
    }

    /*Fornavn må være bokstaver, og mer enn 1 bokstav. Feilmeldingen forsvinner dersom dette rettes opp*/
    if (errorMeldinger.includes("Skriv inn bokstaver")) {
        document.getElementById("errorFornavn").textContent = "Skriv inn bokstaver";
    } else if(errorMeldinger.includes("Vennligst skriv inn gyldig fornavn")){
        document.getElementById("errorFornavn").textContent = "Vennligst skriv inn gyldig fornavn";
    }
    else {
        document.getElementById("errorFornavn").textContent = "";
    }

    /*Etternavn må være bokstaver, og mer enn 1 bokstav. Feilmeldingen forsvinner dersom dette rettes opp*/
    if (errorMeldinger.includes("Skriv inn bokstaver")) {
        document.getElementById("errorEtternavn").textContent = "Skriv inn bokstaver";
    } else if(errorMeldinger.includes("Vennligst skriv inn gyldig etternavn")){
        document.getElementById("errorEtternavn").textContent = "Vennligst skriv inn gyldig etternavn";
    }
    else {
        document.getElementById("errorEtternavn").textContent = "";
    }

    /*E-post må være alfanumeriske tall, der punktum og understrek er tillatt og domenenavn er på 2-3 tegn. Feilmeldingen forsvinner når betingelsen
    ikke lengre er oppfylt*/
    if(errorMeldinger.includes("Skriv inn gyldig E-post")){
        document.getElementById("errorEpost").textContent ="Skriv inn gyldig E-post";
    }
    else{
        document.getElementById("errorEpost").textContent = "";
    }

    /*Telefonnummer må være et tall. Hvis det rettes opp forsvinner feilmeldingen*/
    if (errorMeldinger.includes("Telefonnummer må være et tall")) {
        document.getElementById("errorTlf").textContent = "Telefonnummer må være et tall";
    } else if(errorMeldinger.includes("Dette er ikke gyldig norsk telefonnummer. Minst 8 siffer")) {
        document.getElementById("errorTlf").textContent = "Dette er ikke gyldig norsk telefonnummer. Minst 8 siffer";
    } else{
        document.getElementById("errorTlf").textContent = "";
    }


    /*Dersom alle felt ikke er fylt ut, vis feilmelding om at alle felter skal fylles ut. Istede for å bruke document.getElementById
    på alle attributtene, én og én som jeg har gjort tidligere putter jeg dem i et array og lar en forløkke iterere gjennom hele arrayet når feilmeldingen
    "Alle felter må fylles ut" detekteres. Dette er for at koden ikke skal være så lang og fordi jeg da får opp feilmeldingen på alle feltene samtidig.
     Bruker getElementById-tagen og skriver som parameter inn arrayet felt for å endre feilmeldingsfeltene i HTML og deretter oppdateres
     innholdet til "Alle felter må fylles ut".*/

    if (errorMeldinger.includes("Alle felter må fylles ut")) {
        const felt = ["errorAntall", "errorFornavn", "errorEtternavn", "errorTlf", "errorEpost"];
        felt.forEach(felt => {
            document.getElementById(felt).textContent = "Alle felter må fylles ut";}
        )
    }


    /*Feilmelding respons. Gjennom valideringene har det blitt pushet inn feilmeldinger i feilmeldingsarrayet. Dersom den er større enn 0 skal
    feilmeldingene vises*/
    if (errorMeldinger.length > 0) {
        return;
    }

    /*Lager en variabel kunde som inneholder et objekt som har en rekke egenskaper. Egenskapene film settes lik verdien av variabelen film fra
   registreringen, fornavn lik fornavn, osv nedover listen.*/

    const kunde = {
        film: film,
        antall: antall,
        fornavn: fornavn,
        etternavn: etternavn,
        epost: epost,
        telefonnummer: telefonnummer
    };

    /*Objektet legges til i arrayet kinoBilletterRegister*/
    kinoBilletterRegister.push(kunde);

    /* Nullstiller alle inputbokser. Bruker getElementById for å viske ut verdiene direkte på HTML-siden.*/
    document.getElementById("velgFilm").value = "--Velg film--";
    document.getElementById("antall").value = "";
    document.getElementById("fornavn").value = "";
    document.getElementById("etternavn").value = "";
    document.getElementById("telefonnummer").value = "";
    document.getElementById("epost").value = "";

    visBilletter();
    /*Etter at alt er visket ut kalles visBilletterfunksjonen som viser tabellen igjen nå oppdatert, tom for billettinformasjon*/
}

/*Funksjon sletter billetter. Dersom man trykker på den uten å ha bestilt noen billetter (når array-lengden er under null)
dukker en alert opp som varsler om dette. Andre alternative scenario er når man har kjøpt billetter og
trykker på slett-funksjonen som vil da sette arrayet til 0,  slette alt. Deretter utløses visBilletter funksjonen
som oppdaterer tabellen igjen og viser en tom tabell. */
function slett() {
    if (kinoBilletterRegister.length <= 0) {
        alert("Du har ikke kjøpt billetter ennå. Velg en film og fyll ut alle feltene og kjøp billett!");
    } else {
        kinoBilletterRegister.length = 0;
        visBilletter();
    }
}
