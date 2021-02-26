const mode = document.querySelector("#mode");
let selectCont = document.querySelector("#continente");
const inputCountry = document.querySelector("#pais");
let continent, uri;

mode.addEventListener("click", (e) => {
    console.log(e.currentTarget);
    document.body.classList.toggle("dark");
    if (mode.childNodes[0].className == "fas fa-moon") {
        mode.childNodes[0].className = "far fa-moon";
    }else{
        mode.childNodes[0].className = "fas fa-moon";
    }
})

inputCountry.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        uri = `https://restcountries.eu/rest/v2/name/${inputCountry.value}`;
        envio(uri)
    }
})

selectCont.addEventListener('change', e => {
    continent = e.target.value;
    uri = `https://restcountries.eu/rest/v2/region/${continent}`;
    envio(uri);
});


async function envio(uri) {

    try {
        const res = await fetch(uri);
        const countries = await res.json();
        cleanCountry();
        createCountry(countries);
    } catch (err) {
        console.error(err.message);
    }

    /*
    fetch(uri)
    .then( res => res.ok ? res.json() : console.log("error") )
    .then( (res) => {
        let countries = res;
        cleanCountry();
        createCountry(countries);
    })
    .catch( error =>
        console.error(error);
    );
    */
}

function createCountry(countries) {

    for(land of countries)
    {

        const coleccion = document.querySelector(".coleccion");
        let country = document.createElement("article");

        let a = document.createElement("a")
        let div = document.createElement("div");
        let img = document.createElement("img");
        let desc = document.createElement("div");

        let att = document.createAttribute("src");
        let atta = document.createAttribute("href");

        att.value = land.flag;
        atta.value = `http://127.0.0.1:5500/country.html`; // ${land.name}

        img.setAttributeNode(att);
        a.setAttributeNode(atta);
        div.appendChild(img);

        desc.className = "descripcion";
        desc.innerHTML = `
            <h3><b>${land.name}</b></h3>
            <p class="pop">Population: ${new Intl.NumberFormat("de-DE").format(land.population)}</p>
            <p class="reg">Region: ${land.region}</p>
            <p class="cap">Capital: ${land.capital}</p>
        `;

        country.className = "pais";
        country.append(div, desc);

        a.append(country);
        coleccion.append(a);
    };
}

function countryName(land) {
    let section1 = `
        <section class="bandera">
            <img src="${land.flag}" alt="">
        </section>
    `;

    let info = document.createElement("section");
    info.classList.add("info");
    /* `
            <div class="info-3">
                <p>Top Level Domain: ${land.topLevelDomain}</p>
                <p>Currencies: ${land.currencies[1]}</p>
                <p>Languages: ${land.languages[]}</p>
            </div>

            <div class="info-4">
                <p>Border Countries: ${land.borders}</p>
            </div>
    `; */
    let leng = document.createElement(p);
    leng.textContent = "Languages: ";
    land.languages.forEach(idioma => {
        leng.textContent += idioma;
    });

    console.log(lend);

    let info1 = `<div class="info-1">
                    <h3>${land.name}</h3>
                </div>`;
    let info2 = `<div class="info-2">
                    <p>Native Name: ${land.nativeName}</p>
                    <p>Population: ${new Intl.NumberFormat("de-DE").format(land.population)}</p>
                    <p>Region: ${land.region}</p>
                    <p>Sub Region: ${land.subregion}</p>
                    <p>Capital: ${land.capital}</p>
                </div>`;
    let info3 = ``;
    let info4 = ``;

    info.append(info1,info2,info3,info4);
    document.querySelector("country").append(section1,info);
}

function cleanCountry() {
    const coleccion = document.querySelector(".coleccion");
    coleccion.innerHTML = "";
}