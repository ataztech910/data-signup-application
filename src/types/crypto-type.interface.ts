import { CryptoActions, CryptoTypes } from "../crypto/namespace";
import KeyPair from "./key-pair.interface";

export default interface ICrypto {
    name: keyof typeof CryptoTypes;
    [CryptoActions.SIGN](dataToBeSigned: string, keyPair: KeyPair): string;
}