const axios = require('axios');
const cheerio = require('cheerio');
const argv = process.argv.slice(2);


const catalog_ads_attributes = async (html) => {
    let catalog_ads = []
    let $ = cheerio.load(html)
                
    // Check reCAPTCHA
    if (! $(html).find('.captcha-tips').length > 0 && ! html.includes('captcha')) { 
        let catalog_box = $('.app-organic-search__list')
        let catalog_box_item = catalog_box.find('.list-no-v2-outter')
    
        // Return catalog details if found
        if (catalog_box_item.length > 0) {
            
            /* Return all details on page */
            await catalog_box_item.each(async (i, el) => { 
                catalog_ads.push({

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
                })
            })
            
            return catalog_ads
        }  
    }
    
    else {
        throw Error('Alibaba is blocking network traffic, please resolve the reCAPTCHA')
    }
}


const request_catalog_ads_attributes = async (index) => {
    // Request page
    let html = await axios.get(`https://www.alibaba.com/trade/search?SearchText=${argv[0]}&page=${index}`)
        .then(response => {
            return response.data
        })
    
    return await catalog_ads_attributes(html)
    .then(attributes => { 
        return attributes
    })
}


const request_range_catalog_ads_attributes = async (range) => {
    promises = []
    
    // Scrape the total of pages set by the range
    for (let index=0; index < range; index++) {
        promises.push(request_catalog_ads_attributes(index))
    }
    
    return await Promise.all(promises)
}


// Usage example
request_range_catalog_ads_attributes(argv[1])
.then(result => {
    // Print JSON string
    console.log(JSON.stringify(result))
})

