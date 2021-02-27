// const axios = require('axios')
const cheerio = require('cheerio')
// var rp = require('request-promise')
const axios = require('axios')

const url="https://api.us.castlighthealth.com/vaccine-finder/v1/provider-locations/search?medicationGuids=779bfe52-0dd8-4023-a183-457eb100fccc,a84fb9ed-deb4-461c-b785-e17c782ef88b&lat=42.35&long=-71.1&radius=50"


async function scrape() {
    const html = await axios.get(url)
    const providerData = html.data.providers
    // console.log(providerData)
    const data = []

    providerData.forEach(provider => {
        data.push(provider)
    });
    return data;
}


let res = scrape()
    .then((t) =>  {
        // const p = t
        t.forEach( d => {
            axios.post("http://localhost:5000/vaccineCenter", {
                location: d.name,
                address1: d.address1,
                address2: d.address2,
                city: d.city,
                state: d.state,
                zipCode: d.zip,
                phone: d.phone,
                inStock: d.in_stock
            })
        })
    })

