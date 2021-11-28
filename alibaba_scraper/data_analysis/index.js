const alibaba = require('../../index.js');
const argv = process.argv.slice(2);


// Command line arguments [node [FILE] [SEARCH] [RANGE]] 

alibaba.scraper(argv[0], argv[1], { 
        headers: { 
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0' 
        }
    })
        
    .then(() => {      
        console.log(JSON.stringify(ads))
    })

