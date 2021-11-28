const axios = require('axios');
const attributes = require('./attributes.js');
  

const catalog_ads_attributes = async (index) => {
    // Search keyword URL
    let url = `https://www.alibaba.com/trade/search?SearchText=${config.search}`

    // URL parameters: 
        url += '&viewtype=L' // Try to fix price attribute not found
        url += `&page=${index}` // Set URL index
    
    // Request page
    await axios.get(url, config.options)  
        .then(response => {
            return response.data
        })
        
        // Scrape
        .then(html => {
            attributes.catalog_ads(html)
        })
    
    
}


const range_catalog_ads_attributes = (range) => {
    promises = []

    // Scrape the total of pages set by the range
    for (let index=0; index < range; index++) {
        promises.push(catalog_ads_attributes(index))
    }

    return Promise.all(promises)

}

module.exports = { 
    catalog_ads_attributes, 
    range_catalog_ads_attributes,
}

