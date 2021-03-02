const mode = document.querySelector("#mode");
let selectCont = document.querySelector("#continente");
const inputCountry = document.querySelector("#pais");
let continent, uri;

window.addEventListener("load", () => {
    inputCountry.value = "";
    selectCont.selectedOptions = selectCont.options[0];
    send("https://restcountries.eu/rest/v2/all");
})

// light and dark mode
mode.addEventListener("click", (e) => {
    document.body.classList.toggle("dark");
    if ( mode.childNodes[0].className == "fas fa-moon" ) {
        mode.childNodes[0].className = "far fa-moon";
        localStorage.setItem('dark-mode', 'false');
    }else{
        mode.childNodes[0].className = "fas fa-moon";
        localStorage.setItem('dark-mode', 'true');
    }
});

if (localStorage.getItem('dark-mode') === "true") {
    document.body.classList.add("dark");
    mode.childNodes[0].className = "fas fa-moon";
}


const search = data => inputCountry.addEventListener("keyup", () => {

    cleanCountry();
    let pais = inputCountry.value.toLowerCase();
    let filtro = data.filter( item => {
        let comparar = item.name.toLowerCase();
        if( comparar.indexOf(pais) !== -1 ){
            return item;
        }
    })
    createCountry( filtro );
});



selectCont.addEventListener('change', e => {
    continent = e.target.value;
    if (continent == "all") {
        uri = `https://restcountries.eu/rest/v2/all`;
    } else {
        uri = `https://restcountries.eu/rest/v2/region/${continent}`;
    }
    send(uri);
});


async function send(uri) {
    try {
        const res = await fetch(uri);
        const countries = await res.json();
        cleanCountry();
        createCountry(countries);
        search(countries);
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
        atta.value = `country.html?name=${land.name.toLowerCase()}`;

        img.setAttributeNode(att);
        a.setAttributeNode(atta);
        div.appendChild(img);

        desc.className = "descripcion";
        desc.innerHTML = `
            <h3>${land.name}</h3>
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