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
        atta.value = `http://127.0.0.1:5500/country.html?name=${land.name.toLowerCase()}`;

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

function cleanCountry() {
    const coleccion = document.querySelector(".coleccion");
    coleccion.innerHTML = "";
}