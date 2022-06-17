import { Actions, CryptoTypes } from "../crypto/namespace";
import KeyPair from "./key-pair.interface";

export default interface ICrypto {
    name: keyof typeof CryptoTypes;
    [Actions.SIGN](dataToBeSigned: string, keyPair: KeyPair): string;
}