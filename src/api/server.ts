
import bodyParser from 'body-parser';
import { router } from './router';
import IRouter from '../types/router.interface';
import express, { Express } from 'express';
import { makeUrl } from '../utils/build-url';

const server: Express = express();
server.use(bodyParser.json());

/**
 * Function to initiate the router rules for any endpoint
 */
router.forEach( (routerItem: IRouter) => {
    /**
     * Here can be any high ordered function that can be used as a middlware or specific for each 
     * router url param (or any param that we can provide in IRouter type)
     */
    server[routerItem.type](makeUrl(routerItem.url), routerItem.actionObject);
});


export default server;