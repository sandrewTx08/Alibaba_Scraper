const alibaba_scraper = require('./alibaba_scraper/index.js');
const argv = process.argv.slice(2);


// Command line arguments [node [FILE] [SEARCH] [RANGE]] 
alibaba_scraper
    .alibaba_scraper(argv[0], argv[1], { 
        headers: { 
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0' 
        }
    })
        
    .then(() => {      
        console.log(ads)
    })

