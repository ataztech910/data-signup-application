import { appConfig } from "../config";
import DataContext from "../src/core/data-context";
import { DataActions } from "../src/core/namespace";
import { BaseStrategies } from "../src/core/strategies";
import { CryptoTypes } from "../src/crypto/namespace";
import { DomainActions } from "../src/domain/namespace";
import IDevice from "../src/types/device.interface";

describe('Sign transaction test', () => {
    test('Should correctly sign by selected device', async () => {
        const dataContext = new DataContext(BaseStrategies[appConfig.dbDriver]);
        const mockDeviceData = {
            id: "1655749901673",
            algorithm: CryptoTypes.rsa,
            label: "Test device"
        };
        await dataContext[DomainActions.CREATE_SIGNATURE_DEVICE](mockDeviceData.id, mockDeviceData.algorithm, mockDeviceData.label);
        const sign = dataContext[DomainActions.SIGN_TRANSACTION]('Some test data');
        expect(sign.signed_data).toBe('0_Some%20test%20data_TVRZMU5UYzBPVGt3TVRZM013PT0=');
        
        const currentDevice = dataContext[DataActions.GET_ACTIVE_DEVICE]() as IDevice;
        expect(currentDevice.signatureCounter).toBe(1);
        
        dataContext[DomainActions.SIGN_TRANSACTION]('Some test data again');
        const currentDeviceDuplicete = dataContext[DataActions.GET_ACTIVE_DEVICE]() as IDevice;
        expect(currentDeviceDuplicete.signatureCounter).toBe(2);
    });
});