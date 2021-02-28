// const axios = require('axios')
const cheerio = require('cheerio')
// var rp = require('request-promise')
const axios = require('axios')

const url="https://api.us.castlighthealth.com/vaccine-finder/v1/provider-locations/search?medicationGuids=779bfe52-0dd8-4023-a183-457eb100fccc,a84fb9ed-deb4-461c-b785-e17c782ef88b&lat=42.35&long=-71.1&radius=50"

const bostonZipCodes = ["02128", "02126", "02136", "02122", "02124", "02121", "02125", "02131", "02119", "02120", "02132", "02111", "02118", "02130", "02127", "02210", "02163", "02134", "02135", "02129", "02108", "02114", "02116", "02199", "02222", "02109", "02110", "02113", "02115", "02215"]


async function scrape() {
    const html = await axios.get(url)
    const providerData = html.data.providers
    console.log(providerData)
    const data = []

    providerData.forEach(provider => {
        data.push(provider)
    });
    return data;
}

function isBostonProvider(zip){ return (bostonZipCodes.includes(zip))}

let res = scrape()
    .then((pd) =>  {
        pd.forEach( (p) => {
            const bostonProvider = isBostonProvider(p.zip)
            console.log(bostonProvider)
            axios.post("http://localhost:5000/vaccineProvider", {
                location: p.name,
                address1: p.address1,
                address2: p.address2,
                city: p.city,
                state: p.state,
                zip: p.zip,
                phone: p.phone,
                inStock: p.in_stock,
                bostonProvider: bostonProvider,
                availabilityLink: "none",
                googleMapsLink: "none",
                providerWebpage: "none",
                vaccinesOffered: "none",
                firstDoseAvailability: false,
                secondDoseAvailability: false
            })
            .catch((err) => {
                console.log(err.message);
            });
        })
    })




