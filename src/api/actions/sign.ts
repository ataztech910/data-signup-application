import { Request, Response } from 'express';
import CryptoContext from '../../crypto/crypto-context';
import { CryptoActions, CryptoTypes } from '../../crypto/namespace';
import { CryptoStrategies } from '../../crypto/strategies';
import { makeError } from '../../utils/build-error';
import { HttpCodes, HttpAnswers } from '../namespaces';

const sign = async (req: Request, res: Response): Promise<void | false> => {
    /**
     * Break the action if the propertes are wrong. 
     * Can be optimised to separated function
     * if more requirements will be provided for the endpoints
     */
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
    //--------------------------------------------
    const cryptoContext = new CryptoContext(CryptoStrategies[req.body.type as keyof typeof CryptoTypes]);
    const context = await cryptoContext[CryptoActions.GENERATE_KEY_PAIR]();
    res.send(JSON.stringify(context));
};

export { sign };