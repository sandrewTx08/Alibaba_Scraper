const axios = require('axios');
const attributes = require('./attributes.js');
const cheerio = require('cheerio');


const catalog_ads_attributes = async (index) => {
    let url = `https://www.alibaba.com/trade/search`
    url += '?'
        
    // URL parameters: 
    url += `SearchText=${config.search}` // Search keyword URL
    url += `&page=${index}` // Set URL index
    url += '&CatId='
    url += '&fsb=y&'
    url += '&selectedTab=product_en'
    url += '&IndexArea=product_en'
    url += '&viewtype=L' // Default view type

    // Request page
    await axios.get(url, config.options)      
        .then(response => {
            return response.data
        })
            
        .then(html => {
            if (! html.includes('captcha')) {
                return cheerio.load(html) 
            
            } else {
                throw Error('Alibaba is blocking network traffic, please resolve the reCAPTCHA')
            }

        })

        // Scrape
        .then($ => {
            if (! $(this).find('.captcha-tips').length > 0 ) { 
                attributes.catalog_ads($)
            
            } else {
                throw Error('Alibaba is blocking network traffic, please resolve the reCAPTCHA')
            }
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

