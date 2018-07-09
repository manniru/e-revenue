import simpleRestProvider from 'ra-data-simple-rest';
import jsonServerProvider from 'ra-data-json-server';

const restProvider = simpleRestProvider('http://localhost:3001');
export default (type, resource, params) =>
    new Promise(resolve =>
        setTimeout(() => resolve(restProvider(type, resource, params)), 500)
    );
