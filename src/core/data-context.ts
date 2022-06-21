import { appConfig } from "../../config";
import CryptoContext from "../crypto/crypto-context";
import { CryptoActions, CryptoTypes, Errors } from "../crypto/namespace";
import { CryptoStrategies } from "../crypto/strategies";
import { DomainActions } from "../domain/namespace";
import IDataBase from "../types/data-base.interface";
import IDevice from "../types/device.interface";
import IResponse from "../types/response.interface";
import { buildSignedData } from "../utils/build-signed-data";
import { DataActions, Labels } from "./namespace";

export default class DataContext {
    private strategy: IDataBase;

    constructor(strategy: IDataBase) {
        this.strategy = strategy;
        this.strategy[DataActions.CONNECT]();
    }

    /**
     * These methods can be optimised to separated class to have a clean data context that contains 
     * only data. But at current state i know that application do only these 2 functions so looks more 
     * logicaly to have them here
     */
    async [DomainActions.CREATE_SIGNATURE_DEVICE](id: string, algorithm: CryptoTypes, label?: string): Promise<IDevice | Error> {
        const cryptoContext = new CryptoContext(CryptoStrategies[algorithm]);
        const context = await cryptoContext[CryptoActions.GENERATE_KEY_PAIR]();
        if (id.length === 0 || context.private.length === 0 || context.public.length === 0) {
            throw Error(Errors.DEVICE_IS_NOT_READY);
        }
        const device = {
            uuid: id,
            label: label? label : Labels.DEFAULT_DEVICE,
            privateKey: context.private,
            publicKey: context.public,
            cryptoAlgorythm: algorithm,
            signatureCounter: 0,
            lastSignature: Buffer.from(id).toString(appConfig.stringEncodeType as BufferEncoding),
            isActive: true
        };
        return this.strategy[DataActions.WRITE_INTO_DEVICES_LIST](device);
    }

    [DataActions.GET_ACTIVE_DEVICE]() {
        return this.strategy[DataActions.GET_ACTIVE_DEVICE]();
    }

    [DomainActions.SIGN_TRANSACTION](data: string): IResponse {
        const device = this[DataActions.GET_ACTIVE_DEVICE]();
        if (!device) {
            throw Error(Errors.DEVICE_IS_NOT_READY);
        }
        const cryptoContext = new CryptoContext(CryptoStrategies[device.cryptoAlgorythm]);
        const keyPair = {
            public: device.publicKey,
            private: device.privateKey
        };
        const signature = Buffer
                            .from(cryptoContext[CryptoActions.SIGN](data, keyPair))
                            .toString(appConfig.stringEncodeType as BufferEncoding);
        const lastSignatureEncoded = Buffer.from(device.lastSignature).toString(appConfig.stringEncodeType as BufferEncoding);
        const response = { 
            signature: signature,
            signed_data: buildSignedData(device.signatureCounter, data, lastSignatureEncoded)
        };
        device.signatureCounter += 1;
        device.lastSignature = signature;
        this.strategy[DataActions.WRITE_INTO_DEVICES_LIST](device);
        this.strategy[DataActions.UPDATE_SIGNATURES](response);
        return response;
    }
}