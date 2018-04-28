import request from 'request';
import Feed from 'rss-to-json';

class Requests {
    constructor() {
    
    }

    redditTIL() {
        let url = 'https://www.reddit.com/r/todayilearned/.json';
        request.get(url, (err, res, body) => {
            let children = JSON.parse(body).data.children;
            let firstPostTitle = children[0].data.title.slice(4);

            return firstPostTitle;
        });
    }

    webhoseio(query, number) {
        return new Promise((resolve, reject) => {
            const webhoseio = require('webhoseio');

            const client = webhoseio.config({token: '2b5d099b-2fd5-4a51-a9c8-b3a7ad8d7426'});
            const query_params = {
                "q": `title:\"${query}\" -text:\"${query}\" language:english`,
                "sort": "relevancy"
            }
            client.query('filterWebContent', query_params)
            .then(output => {
                resolve(output['posts'][number]['text'] + ' ' + output['posts'][number]['published']);
            });
        });
        
        
    }
	
     forums(query, number) {
        return new Promise((resolve, reject) => {
            	
		Feed.load('https://forum.electricunicycle.org/discover/all.xml/', function(err, rss){
	//Feed.load('https://forum.electricunicycle.org/discover/5.xml/?member=6847&key=8e3835fe2723e4943fc3177616ff83e7', function(err, rss){
	  //sconsole.log(rss);
	  console.log(rss.items[number].title);
	  console.log(rss.items[number].description);
	   resolve(rss.items[number].title + ' ' + rss.items[number].description);

	});
	
			
        });
        
        
    }


}

export default Requests;