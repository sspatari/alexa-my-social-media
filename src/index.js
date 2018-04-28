import Requests from './requests';

let requests = new Requests();
// requests.redditTIL(0);
requests.webhoseio('moldova', 0).then((text) => {
    console.log(text);
})

requests.forums(0).then((text) => {
    console.log(text);
})
