const mode = document.querySelector("#mode");
let selectCont = document.querySelector("#continente");
const inputCountry = document.querySelector("#pais");
let continent, uri;


const createCountry = (countries) => {

    const coleccion = document.querySelector(".coleccion");

    if (countries) {
        countries.forEach(land => {
            let docFragment = document.createDocumentFragment();
            let country = document.createElement("article");

            let a = document.createElement("a")
            let div = document.createElement("div");
            let img = document.createElement("img");
            let desc = document.createElement("div");

            let att = document.createAttribute("src");
            let atta = document.createAttribute("href");

            att.value = land.flags.png;
            //atta.value = `country.html?name=${land.name.common.toLowerCase()}`;
            atta.value = `country.html?name=${land.altSpellings[0]}`;

            img.setAttributeNode(att);
            a.setAttributeNode(atta);
            div.appendChild(img);

            desc.className = "descripcion";
            desc.innerHTML = `
                <h3>${land.name.common}</h3>
                <p class="pop"><b>Population:</b> ${new Intl.NumberFormat("de-DE").format(land.population)}</p>
                <p class="reg"><b>Region:</b> ${land.region}</p>
                <p class="cap"><b>Capital:</b> ${land.capital}</p>
            `;

            country.className = "pais";
            country.append(div, desc);

            a.append(country);
            docFragment.append(a);
            coleccion.append(docFragment);
        });
    } else {
        coleccion.innerHTML = "ERROR: No hay Datos";
    }
}


const cleanCountry = () => {
    const coleccion = document.querySelector(".coleccion");
    coleccion.innerHTML = "";
}


const search = data => inputCountry.addEventListener("keyup", () => {

    cleanCountry();
    let pais = inputCountry.value.toLowerCase();
    let filtro = data.filter(item => {
        let comparar = item.name.common.toLowerCase();
        if (comparar.indexOf(pais) !== -1)
            return item;
    })
    createCountry(filtro);
});


const send = async (uri) => {
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


window.addEventListener("load", () => {
    inputCountry.value = "";
    selectCont.selectedOptions = selectCont.options[0];
    send("https://restcountries.com/v3.1/all");
})


selectCont.addEventListener('change', e => {
    continent = e.target.value;
    if (continent == "all") {
        uri = `https://restcountries.com/v3.1/all`;
    } else {
        uri = `https://restcountries.com/v3.1/region/${continent}`;
    }
    send(uri);
});
