import { Request, Response } from 'express';
import { CryptoTypes } from '../../crypto/namespace';
import { DomainActions } from '../../domain/namespace';
import DataInstance from '../../core/data-instance';
import { makeError } from '../../utils/build-error';
import { HttpAnswers, HttpCodes } from '../namespaces';

const createDevice = async (req: Request, res: Response): Promise<void | false> => {
    if (!req.body.algorithm && !req.body.id) {
        res.status(HttpCodes.ERROR);
        res.send(makeError(HttpCodes.ERROR, HttpAnswers.WRONG_REQUEST));
        return false;
    }
    else if (req.body.algorithm && !Object.values(CryptoTypes).includes(req.body.algorithm)) {
        res.status(HttpCodes.ERROR);
        res.send(makeError(HttpCodes.ERROR, HttpAnswers.WRONG_CRYPTO_TYPE));
        return false;
    }
    let device = {};
    try {
        device = await DataInstance.getInstance().getDataContext()[DomainActions.CREATE_SIGNATURE_DEVICE](req.body.id, req.body.algorithm, req.body.label);
    } catch (e) {
        device = {
            error: (<Error>e).message
        };
    }

    res.send(JSON.stringify(device));
};

export { createDevice };