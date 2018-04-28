import request from 'request';

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
        const webhoseio = require('webhoseio');

        const client = webhoseio.config({token: '2b5d099b-2fd5-4a51-a9c8-b3a7ad8d7426'});
        const query_params = {
            "q": `title:\"${query}\" -text:\"${query}\" language:english`,
            "sort": "relevancy"
        }
        client.query('filterWebContent', query_params)
        .then(output => {
            return output['posts'][number]['text'] + ' ' + output['posts'][number]['published'];
        });
    }
}

export default Requests;