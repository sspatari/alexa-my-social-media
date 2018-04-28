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
}

export default Requests;