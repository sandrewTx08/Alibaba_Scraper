const cheerio = require('cheerio');


// All catalogs
global.ads = []


const catalog_ads = async (html) => {
    let $ = cheerio.load(html)
                
    // Check reCAPTCHA
    if (! $(html).find('.captcha-tips').length > 0 
        && ! html.includes('captcha') ) { 
        
        let catalog_box = $('.app-organic-search__list')
        let catalog_box_item = catalog_box.find('.list-no-v2-outter')
    
        // Check if found catalog ads
        if ( catalog_box_item.length > 0 ) {
            
            // Return all details on page
            await catalog_box_item.each((i, el) => { 
                ads.push( 
                {
                    // Unique ID related ad post
                    id: (() => {
                        a = $(el).find('.J-img-switcher-item').attr('data-search-gt-img') 
                        b = $(el).find('.elements-title-normal.one-line').attr('data-p4plog')
                        c = $(el).find('.J-favorite-manager-wrap-product.list-no-v2-favorite-container.J-sc-fav-item-wrap').attr('data-fav-id') 
                        d = $(el).find('.list-no-v2-inner.m-gallery-product-item-v2.img-switcher-parent').attr('data-ctrdot')
                        
                        if ( a != undefined && a != '') {
                            return a
                        
                        } else if ( b != undefined && b != '' ) {
                            return b
                        
                        } else if ( c != undefined && c != '' ) {
                            return c
                        
                        } else if ( d != undefined && d != '' ) {
                            return d
                        
                        } else {
                            return undefined
                        }
                    })(),
                      
                    // Title
                    title: (() => {
                        a = $(el).find('.elements-title-normal.one-line').attr('title') 
                        b = $(el).find('.elements-title-normal__outter').text()

                        if ( a != undefined && a != '') {
                            return a
                        
                        } else if ( b != undefined && b != '' ) {
                            return b
                        
                        } else {
                            return undefined
                        }
                    })(),
                    
                    // Price
                    price: (() => {
                        a = $(el).find('.elements-offer-price-normal').attr('title') 
                        b = $(el).find('.elements-offer-price-normal__price').text() 

                        if ( a != undefined && a != '') {
                            return a
                        
                        } else if ( b != undefined && b != '' ) {
                            return b
                        
                        } else {
                            return undefined
                        } 
                    })(),
                    
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
        }  
    }
    
    else {
        throw Error('Alibaba is blocking network traffic, please resolve the reCAPTCHA')
    }

}

module.exports = { catalog_ads }

