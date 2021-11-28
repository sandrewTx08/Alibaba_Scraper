const alibaba_scraper = require('./alibaba_scraper/alibaba_scraper.js');
const argv = process.argv.slice(2);


global.config = {
        search: argv[0],
        options: { 
            headers: { 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0' 
            }
        }

}

    
alibaba_scraper
    .request
    .range_catalog_ads_attributes(argv[1])
        .then(data => {
            return data
        })
        
        // JSON
        // .then(list => {
        //     return JSON.stringify(list)
        // })

        .then(list => {
            console.log(list)
        })

