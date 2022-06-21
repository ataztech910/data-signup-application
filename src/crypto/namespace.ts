import { appConfig } from "../../config";

enum CryptoActions {
    SIGN = 'sign',
    GENERATE_KEY_PAIR = 'generateKeyPair'
}

enum CryptoTypes {
    ec = 'ec',
    rsa = 'rsa'
}

enum Errors {
  NO_STRATEGY = 'No strategy selected',
  DEVICE_IS_NOT_READY = 'Device is not ready'
}

const cryptoOptions = {
    [CryptoTypes.ec]: {
        namedCurve: 'secp256k1',
        publicKeyEncoding: {
          type: 'spki',
          format: 'der'
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'der'
        }
    },
    [CryptoTypes.rsa]: {
        modulusLength: 2048,
        publicExponent: 0x10101,
        publicKeyEncoding: {
          type: 'pkcs1',
          format: 'der'
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'der',
          cipher: appConfig.aes,
          passphrase: appConfig.salt
        }
      }
};

export { CryptoActions, CryptoTypes, cryptoOptions, Errors };