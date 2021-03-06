import request from 'request';
import Feed from 'rss-to-json';
import webhoseio from 'webhoseio';

class Requests {
    constructor() {

    }

    redditTIL(postNumber) {
      let url = 'https://www.reddit.com/r/todayilearned/.json';
      return new Promise((resolve, reject) => {
        request.get(url, (err, res, body) => {
          if(err)
            reject(`GET failed, ${err}`);
          else {
            let children = JSON.parse(body).data.children;
            let firstPostTitle = 'Today I learned ' + children[postNumber].data.title.slice(4);
            resolve(firstPostTitle);
          }
        });
      });
    }

    webhose(query, number) {
        return new Promise((resolve, reject) => {
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

     forums(number) {
        return new Promise((resolve, reject) => {
            Feed.load('https://forum.electricunicycle.org/discover/all.xml/', function(err, rss){
            //Feed.load('https://forum.electricunicycle.org/discover/5.xml/?member=6847&key=8e3835fe2723e4943fc3177616ff83e7', function(err, rss){
            //sconsole.log(rss);
            resolve(rss.items[number].title + ' ' + rss.items[number].description);
            });
        });
    }
}

export default Requests;
