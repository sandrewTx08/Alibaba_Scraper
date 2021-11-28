const request = require('./request.js');


/*  
    EXAMPLE:
        SEARCH KEYWORD: 'bayblade'
        TOTAL PAGE SCANNED: 20
        OPTIONS: 
            User-Agent: 
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0' 
        
        CODE: 
            <START>
                alibaba_scraper('bayblade', 20, { 
                    
                    headers: { 
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0' 
                    } 
                    
                    }).then(() => {
                        // Print ads scraped
                        console.log(ads)
                    })
            </END>
*/


const alibaba_scraper = async (search, range, options) => {
    global.config = {
        search: search,
        options: options
    }

    await request.range_catalog_ads_attributes(range)
}


module.exports = { scraper: alibaba_scraper }

