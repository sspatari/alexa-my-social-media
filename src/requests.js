import request from 'request';

class Requests {
    constructor() {

    }

    redditTIL() {
      let url = 'https://www.reddit.com/r/todayilearned/.json';
      return new Promise((resolve, reject) => {
        request.get(url, (err, res, body) => {
          if(err)
            reject(`GET failed, ${err}`);
          else {
            let children = JSON.parse(body).data.children;
            let firstPostTitle = children[0].data.title.slice(4);
            resolve(firstPostTitle);
          }
        });
      });
    }
}

export default Requests;
