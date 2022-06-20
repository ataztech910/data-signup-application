import { CryptoTypes } from "../crypto/namespace";
import { DomainActions } from "../domain/namespace";
import IDataBase from "../types/data-base.interface";
import IDevice from "../types/device.interface";
import IResponse from "../types/response.interface";

export default class DataContext {
    private strategy: IDataBase;

    constructor(strategy: IDataBase) {
        this.strategy = strategy;
    }

    /**
     * These methods can be optimised to separated class to have a clean data context that contains 
     * only data. But at current state i do not have enough requirements so will keep it here for now
     */
    [DomainActions.CREATE_SIGNATURE_DEVICE](id: string, algorithm: CryptoTypes, label?: string): IDevice {
        return  {
            uuid: id,
            label: label as string,
            signatureCounter: 0,
            lastSignature: '0'
        };
    }

    [DomainActions.SIGN_TRANSACTION](data: string): IResponse {
        return { 
            "signature": "123",
            "signed_data": "<signature_counter>_<data_to_be_signed>_<last_signature_base64_encoded>"
        };
    }
}