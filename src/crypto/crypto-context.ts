import ICrypto from "../types/crypto-type.interface";
import KeyPair from "../types/key-pair.interface";
import { CryptoActions, cryptoOptions } from "./namespace";
import crypto, { KeyObject } from 'crypto';

export default class CryptoContext {
    private strategy: ICrypto;

    constructor(strategy: ICrypto) {
        this.strategy = strategy;
    }

    /**
     * This method is not neccessary for current realisation but can be useful if we will need 
     * to change strategy while having a user session
     */
    public setStrategy(strategy: ICrypto) {
        this.strategy = strategy;
    }

    [CryptoActions.GENERATE_KEY_PAIR](): Promise<KeyPair> {
      return new Promise<KeyPair>((resolve, reject) => {
            const cryptoType: any = this.strategy.name;
            try {
              crypto.generateKeyPair(cryptoType, cryptoOptions[this.strategy.name], 
                  (err: Error | null, publicKey: KeyObject, privateKey: KeyObject) => {
                if (err) {
                  console.log(`Encountered an error during ${cryptoType} key pair generation: ${err.message}`);
                }
        
                const keyPair: KeyPair = {
                  public: publicKey.toString(),
                  private: privateKey.toString(),
                };
                console.log(`Created ${this.strategy.name} key pair: ${keyPair}`);
                resolve(keyPair);
              });
            } catch (e) {
              console.log(`Failed to generated ${this.strategy.name} key pair`);
              reject(e);
            }
          });
    }
    
    [CryptoActions.SIGN](dataToBeSigned: string, keyPair: KeyPair) {
       console.log(this.strategy.name);
        const result = this.strategy[CryptoActions.SIGN](dataToBeSigned, keyPair);
        console.log(result);
    }
}