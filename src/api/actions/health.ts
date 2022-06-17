import { Request, Response } from 'express';
import { appConfig } from '../../../config';
import { HttpAnswers, HttpCodes } from '../namespaces';

/**
 * Also can be improved with a higer ordered function 
 * that will always trigger status and send json responce
 * by default, but at current state I do not have requirements 
 * for the most of the endpoints
 */
const health = (req: Request, res: Response): void => {
    res.status(HttpCodes.OK);
    res.send(JSON.stringify({
        status: HttpAnswers.PASS,
        version: appConfig.apiVersion
    }));
};

export { health };