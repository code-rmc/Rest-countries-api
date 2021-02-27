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
    //console.log(land[0].languages[0]);

    let section1 = `
        <section class="bandera">
            <img src="${land[0].flag}" alt="">
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
    let leng = document.createElement("p");
    leng.textContent = "Languages: ";
    for (let id of land[0].languages) {
        leng.textContent += id.name;
    }

    let info1 = `<div class="info-1">
                    <h3>${land[0].name}</h3>
                </div>`;
    let info2 = `<div class="info-2">
                    <p>Native Name: ${land[0].nativeName}</p>
                    <p>Population: ${new Intl.NumberFormat("de-DE").format(land[0].population)}</p>
                    <p>Region: ${land[0].region}</p>
                    <p>Sub Region: ${land[0].subregion}</p>
                    <p>Capital: ${land[0].capital}</p>
                </div>`;
    // let info3 = ``;
    // let info4 = ``;

    info.append(info1,info2);
    console.log("INFO",info.target  );
    document.querySelector("#country").innerHTML= section1;
    document.querySelector("#country").innerHTML+= info;
}
