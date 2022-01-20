// Parametro enviado por URL
const query = new URLSearchParams(window.location.search);

const sendCountry = async (url) => {
    try {
        const res = await fetch(url);
        const country = await res.json();
        countryName(country);
    } catch (err) {
        console.error("Ha ocurrido un Error - Detalle: " + err.message);
    }
}

if (query.get('name')) {
    let name = query.get('name');
    let url = name.length > 3 ? `https://restcountries.com/v3.1/name/${name}` : `https://restcountries.com/v3.1/alpha/${name}`;
    sendCountry(url);
}

const countryName = async (landObj) => {

    const land = landObj.shift();

    const templ = document.querySelector('#countryDetails'),
        img = templ.content.querySelector(".bandera");

    // Imagen Bandera
    img.children[0].src = land.flags.png;

    // Nombre del Pais
    const info1 = templ.content.querySelector(".info-1");
    info1.children[0].textContent = land.name.common;

    // Informacion de Pais
    const oficialName = Object.entries(land.name.nativeName)[0][1].official;

    const info2 = templ.content.querySelector(".info-2");
    info2.children[0].innerHTML += oficialName
    info2.children[1].innerHTML += " " + new Intl.NumberFormat("de-DE").format(land.population);
    info2.children[2].innerHTML += " " + land.region || "unknown";
    info2.children[3].innerHTML += " " + land.subregion || "unknown";
    info2.children[4].innerHTML += " " + land.capital || "unknown";

    // Informacion Dominio de internet, moneda, lenguajes.
    const languages = document.createElement("p");

    languages.textContent = Object.values(land.languages).join(", ");

    const currenciesName = land.currencies ? Object.entries(land.currencies)[0][1].name : "unknown";

    const info3 = templ.content.querySelector(".info-3");
    info3.children[0].innerHTML += land.tld.join(" ") || "unknown";
    info3.children[1].innerHTML += currenciesName;
    info3.children[2].innerHTML += languages.textContent || "unknown";


    // Paises limitrofes
    let listborder = "";

    if (land.borders) {
        let bordersTotal = [...land.borders].join(",");
        const urlBorder = `https://restcountries.com/v3.1/alpha?codes=${bordersTotal}`;
        let listName = await listBorder(urlBorder);
        listName.forEach(name => listborder += `<a href="country.html?name=${name[1]}" class="border">${name[0]}</a>`);
    }

    const info4 = templ.content.querySelector(".info-4");
    info4.children[1].innerHTML = listborder;

    let clone = document.importNode(templ.content, true);
    document.querySelector("#country").appendChild(clone);
}

// Pedido de paises limitrofes
const listBorder = async (urlBorder) => {
    const res = await fetch(urlBorder);
    const country = await res.json();
    return country.map(nC => [nC.name.common, nC.fifa]);
}