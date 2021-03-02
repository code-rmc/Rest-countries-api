// Paramatro enviado por URL
const query = new URLSearchParams(window.location.search);
console.log( query.get('name') );

if ( query.get('name') ) {
    let name = query.get('name');
    let url = `https://restcountries.eu/rest/v2/name/${name}`;
    envioCountry(url);
}

async function envioCountry(url) {
    const res = await fetch(url);
    const country = await res.json();
    countryName(country);
}

function countryName(land) {

    let section1 = `
        <section class="bandera">
            <img src="${land[0].flag}" alt="">
        </section>
    `;

    let info = document.createElement("section");
    info.classList.add("info");

    let info1 = `<div class="info-1">
                    <h3>${land[0].name}</h3>
        </div>`;

    let info2 = `<div class="info-2">
                    <p><b>Native Name:</b> ${land[0].nativeName}</p>
                    <p><b>Population:</b> ${new Intl.NumberFormat("de-DE").format(land[0].population)}</p>
                    <p><b>Region:</b> ${land[0].region}</p>
                    <p><b>Sub Region:</b> ${land[0].subregion}</p>
                    <p><b>Capital:</b> ${land[0].capital}</p>
                </div>`;

    let leng = document.createElement("p");

    for (const id in land[0].languages) {
        if(id != 0) leng.textContent += ", ";
        leng.textContent += land[0].languages[id].name;
    }

    let info3 = `<div class="info-3">
                    <p><b>Top Level Domain:</b> ${land[0].topLevelDomain}</p>
                    <p><b>Currencies:</b> ${land[0].currencies[0].name}</p>
                    <p><b>Lenguages:</b> ${leng.textContent}</p>
                </div>`;

    let listborder="";

    land[0].borders.forEach(id => listborder += `<span class="border">${id}</span>` );

    let info4 = `<div class="info-4">
                    <p><b>Border Countries:</b> </p>
                    <div class="cont-border">
                        ${listborder}
                    </div>
                </div>`;

    info.innerHTML = info1;
    info.innerHTML += info2;
    info.innerHTML += info3;
    info.innerHTML += info4;

    document.querySelector("#country").innerHTML = section1;
    document.querySelector("#country").append(info);
}