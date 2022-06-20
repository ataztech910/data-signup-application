import crypto from 'crypto';
import { appConfig } from '../../../config';
import ICrypto from '../../types/crypto-type.interface';
import keyPairInterface from '../../types/key-pair.interface';
import { CryptoActions, CryptoTypes } from '../namespace';

export default class RsaStrategy implements ICrypto {
    name = CryptoTypes.rsa;
    [CryptoActions.SIGN](dataToBeSigned: string, keyPair: keyPairInterface): string {
        try {
            const cipher = crypto.createCipheriv(
                appConfig.aes, 
                crypto.scryptSync(keyPair.private, 
                                  appConfig.salt, 
                                  appConfig.keyLen), 
                crypto.randomBytes(appConfig.randomBytes)
            );
            let encrypted = cipher.update(dataToBeSigned);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            return encrypted.toString(appConfig.stringEncodeType as BufferEncoding);
          } catch (e) {
                console.log(e);
            throw e;
          }
    }
}
