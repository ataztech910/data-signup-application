import ICrypto from "../../types/crypto-type.interface";
import keyPairInterface from '../../types/key-pair.interface';
import crypto from 'crypto';
import { appConfig } from '../../../config';
import { Actions, CryptoTypes } from "../namespace";

export default class EcdsaStrategy implements ICrypto {
    name = CryptoTypes.ec;
    [Actions.SIGN](dataToBeSigned: string, keyPair: keyPairInterface): string {
        try {
            const cipher = crypto.createCipheriv(appConfig.ecdsa, crypto.scryptSync(keyPair.private, 'fiskaly is AWESOME!', 32), crypto.randomBytes(16));
            let encrypted = cipher.update(dataToBeSigned);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            return encrypted.toString(appConfig.stringEncodeType as BufferEncoding);
          } catch (e) {
            console.log(e);
            throw e;
          }
    }
}