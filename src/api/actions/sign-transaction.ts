import { Request, Response } from 'express';
import { DomainActions } from '../../domain/namespace';
import DataInstance from '../../core/data-instance';
import { makeError } from '../../utils/build-error';
import { HttpAnswers, HttpCodes } from '../namespaces';

const signTransaction = async (req: Request, res: Response): Promise<void | false> => {
    if (!req.body.data) {
        res.status(HttpCodes.ERROR);
        res.send(makeError(HttpCodes.ERROR, HttpAnswers.WRONG_REQUEST));
        return false;
    }
    let response = {};
    try {
        response = DataInstance.getInstance().getDataContext()[DomainActions.SIGN_TRANSACTION](req.body.data);
    } catch (e) {
        response = {
            error: (<Error>e).message
        };
    }
    
    res.send(JSON.stringify(response));
};

export { signTransaction };