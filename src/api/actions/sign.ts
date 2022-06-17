import { Request, Response } from 'express';
import CryptoContext from '../../crypto/crypto-context';
import { Actions, CryptoTypes } from '../../crypto/namespace';
import { CryptoStrategies } from '../../crypto/strategies';
import { makeError } from '../../utils/build-error';
import { HttpCodes, HttpAnswers } from '../namespaces';

const sign = (req: Request, res: Response): void | false => {
    if (!req.body.type) {
        res.status(HttpCodes.ERROR);
        res.send(makeError(HttpCodes.ERROR, HttpAnswers.WRONG_REQUEST));
        return false;
    }
    else if (req.body.type && !Object.values(CryptoTypes).includes(req.body.type)) {
        res.status(HttpCodes.ERROR);
        res.send(makeError(HttpCodes.ERROR, HttpAnswers.WRONG_CRYPTO_TYPE));
        return false;
    }
    const cryptoContext = new CryptoContext(CryptoStrategies[req.body.type as keyof typeof CryptoTypes]);
    cryptoContext[Actions.GENERATE_KEY_PAIR]().then( result => {
        res.send(JSON.stringify(result));
    });
};

export { sign };