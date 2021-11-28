const axios = require('axios');
const attributes = require('./attributes.js');
  

const catalog_ads_attributes = async (index) => {
    // Search keyword URL
    let url = `https://www.alibaba.com/trade/search?SearchText=${config.search}`

    // Set URL index
    url += `&page=${index}`
    
    // Request page
    let html = await axios.get(url, config.options)  
        .then(response => {
            return response.data
        })

    // Scrape
    return await attributes.catalog_ads(html)
        .then(result_set => { 
            return result_set
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

