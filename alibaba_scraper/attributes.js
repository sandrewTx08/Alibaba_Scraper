

// All catalogs
global.ads = []


const attribute = (el) => {
    return {
        // Unique ID related ad post
        id: (() => {
            a = el.find('.J-img-switcher-item').attr('data-search-gt-img') 
            b = el.find('.elements-title-normal.one-line').attr('data-p4plog')
            c = el.find('.J-favorite-manager-wrap-product.list-no-v2-favorite-container.J-sc-fav-item-wrap').attr('data-fav-id') 
            d = el.find('.list-no-v2-inner.m-gallery-product-item-v2.img-switcher-parent').attr('data-ctrdot')
            
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
            a = el.find('.elements-title-normal.one-line').attr('title') 
            b = el.find('.elements-title-normal__outter').text()

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
            a = el.find('.elements-offer-price-normal').attr('title') 
            b = el.find('.elements-offer-price-normal__price').text() 
            c = el.find('.product-price.product-fob-wrap').text() 

            if ( a != undefined && a != '') {
                return a
            
            } else if ( b != undefined && b != '' ) {
                return b

            } else if ( c != undefined && c != '' ) {
                return c
            
            } else {
                return undefined
            } 
        })(),
        
        // Price discount
        price_discount: (() => {
            a = el.find('.element-promotion-shipping-price__price').text()
                .replace(/[^0-9]/g, '')

            if ( a != undefined && a != '') {
                return a
            
            } else {
                return undefined
            } 
        })(),
        
        // Discount percentage
        price_discount_percentage: (() => {
            a = el.find('.elements-offer-slashprice-normal__discount').text()
            
            if ( a != undefined && a != '') {
                return a
            
            } else {
                return undefined
            } 
        })(),
        
        // Avaliable pieces to buy
        pieces_stock: (() => {
            a = el.find('.element-offer-minorder-normal__value').text()
                .replace(/[^0-9]/g, '')
            
            if ( a != undefined && a != '') {
                return a
            
            } else if ( b != undefined && b != '' ) {
                return b

            } else if ( c != undefined && c != '' ) {
                return c
            
            } else {
                return undefined
            } 
        })(),

        // Avaliable pieces to buy
        pieces_stock_type: (() => {
            a = el.find('.element-offer-minorder-normal__value').text()
                .replace(/[0-9]/g, '')
                .replace(/\s+/g, '')
                .replace(/[&\/\\, +.]/g, '')
            
            if ( a != undefined && a != '') {
                return a
            
            } else {
                return undefined
            } 
        })(),
        
        // Review title
        review_title: (() => {
            a = el.find('.seb-supplier-review__reviews.has-score').text()
                .replace(/\"/g, '')

            if ( a != undefined && a != '') {
                return a
            
            } else {
                return undefined
            } 
        })(),
        
        // Review count
        review_count: (() => {
            a = el.find('.seb-supplier-review__review-count').text()
                .replace(/[^0-9]/g, '')
            
            if ( a != undefined && a != '') {
                return a
    
            } else {
                return undefined
            } 
        })(),
                        
        // Link related to ad post
        link: (() => {
            a = el.find('.elements-title-normal.one-line').attr('href')
                .replace(/[//]/, 'https:/')
            
            if ( a != undefined && a != '') {
                return a
            
            } else {
                return undefined
            } 
        })()
    }
    
}


const catalog_ads = ($) => {
    let catalog_box = $('.app-organic-search__list')
    let catalog_box_item = catalog_box.find('.list-no-v2-outter')

    // Check if found catalog ads
    if ( catalog_box_item.length > 0 ) {
        
        // Return all details on page
        catalog_box_item.each((i, el) => {          
            ads.push(attribute($(el)))
        })

    }  
}


module.exports = { catalog_ads }

