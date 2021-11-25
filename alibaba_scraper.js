const axios = require('axios');
const cheerio = require('cheerio');
const argv = process.argv.slice(2);


const request = (index) => {
    return new Promise( async (resolve, reject ) => {
        try {
            resolve( await axios.get(`https://www.alibaba.com/trade/search?SearchText=${argv[0]}&page=${index}`))
        } catch (err) {
            reject(err.message)
        }
    })
}

const alibaba_scraper = async (range) => {
    let root = {
        result: { 
            name: argv[0],
            catalog: []
        }
    }
    
    let promises = []
    for (let index=0; index < range; index++) {
        promises.push(            
            // Request page
            request(index)
            .then(response => {
                return response.data
            })
            
            // Parse HTML from page
            .then(html => {
                let $ = cheerio.load(html)
                let catalog_box = $('.app-organic-search__list')
                let catalog_box_item = catalog_box.find('.list-no-v2-outter')
                
                // Return catalog details if found
                if (catalog_box_item.length > 0) {
                    catalog_box_item.each((i, el) => { 
                        let catalog = {
                            /* Return all details on page */
            
                            // Unique ID related ad post
                            id: $(el).find('.J-img-switcher-item').attr('data-search-gt-img')
                                || $(el).find('.elements-title-normal.one-line').attr('data-p4plog'),
            
                            // Title
                            title: $(el).find('.elements-title-normal.one-line').attr('title') 
                                || $(el).find('.elements-title-normal__outter').text(),
                            
                            // Price
                            price: $(el).find('.elements-offer-price-normal.medium').attr('title') 
                                || $(el).find('elements-offer-price-normal__price').text(),
                            
                            // Price discount
                            price_discount: $(el).find('.element-promotion-shipping-price__price').text(),
                            
                            // Discount percentage
                            price_discount_percentage: $(el).find('.elements-offer-slashprice-normal__discount').text(),
                            
                            // Avaliable pieces to buy
                            pieces_stock: $(el).find('.element-offer-minorder-normal__value').text(),
                            
                            // Review title
                            review_title: $(el).find('.seb-supplier-review__reviews.has-score').text(),
                            
                            // Review count
                            review_count: $(el).find('.seb-supplier-review__review-count').text(),
                                            
                            // Link related to ad post
                            link: $(el).find('.elements-title-normal.one-line').attr('href')
                        }
                        root.result.catalog.push(catalog)
                    }) 
                } else { 
                    // throw `Catalog total found: ${catalog_box_item.length}` 
                }
            })
        )       
    }

    // Return list of promises resolved
    return Promise.all(promises)
    .then(() => {
        return root
    })
}

// Usage example
alibaba_scraper(argv[1])

.then(result => {
    // Print JSON string
    console.log(JSON.stringify(result)) 
})

