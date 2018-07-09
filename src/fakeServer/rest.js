import FakeRest from 'fakerest';
import fetchMock from 'fetch-mock';
import generateData from 'data-generator';

export default () => {
    const data = generateData({ serializeDate: true });
    const restServer = new FakeRest.FetchServer('http://localhost:4000');
    if (window) {
        window.restServer = restServer; // give way to update data in the console
    }
    /*
    fetch('https://moonlit-album-180012.firebaseio.com/ra/.json', {  
        method: 'POST',  
        headers: {  
          'auth': '1234'  
        },  
         body: JSON.stringify(data)
    })
    .then(function (data) {  
      console.log('Request success: ', data);  
    })  
    .catch(function (error) {  
      console.log('Request failure: ', error);  
    });
    */


    restServer.init(data);
    restServer.toggleLogging(); // logging is off by default, enable it
    fetchMock.mock('begin:http://localhost:4000', restServer.getHandler());
    return () => fetchMock.restore();
};
