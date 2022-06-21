import { CryptoTypes } from "../crypto/namespace";

export default interface IDevice {
    uuid: string;
    label: string;
    cryptoAlgorythm: CryptoTypes;
    publicKey: string;
    privateKey: string;
    signatureCounter: number;
    lastSignature: string;
    isActive: boolean;
}