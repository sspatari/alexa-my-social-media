import Requests from './requests';

let requests = new Requests();
requests.redditTIL();
requests.webhoseio('google', 0).then((text) => {
    console.log(text);
})
requests.forums(0).then((text) => {
    console.log(text);
})