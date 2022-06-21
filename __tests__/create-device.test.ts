import { appConfig } from "../config";
import { BaseStrategies } from "../src/core/strategies";
import DataContext from '../src/core/data-context';
import { DomainActions } from "../src/domain/namespace";
import { CryptoTypes, Errors } from "../src/crypto/namespace";
import IDevice from "../src/types/device.interface";

describe('Create the device using regular configuration test', () => {
    test('Should create or update the device', async () => {
        const dataContext = new DataContext(BaseStrategies[appConfig.dbDriver]);
        const mockDeviceData = {
            id: "1655749901673",
            algorithm: CryptoTypes.rsa,
            label: "Test device"
        };
        const device = await dataContext[DomainActions.CREATE_SIGNATURE_DEVICE](mockDeviceData.id, mockDeviceData.algorithm, mockDeviceData.label);
        expect((device as IDevice).lastSignature).toBe('MTY1NTc0OTkwMTY3Mw==');
        expect((device as IDevice).isActive).toBe(true);
        expect((device as IDevice).label).toBe('Test device');
    });

    test('Should not create or update the device', async () => {
        const dataContext = new DataContext(BaseStrategies[appConfig.dbDriver]);
        const mockDeviceData = {
            id: "1655749901673",
            algorithm: 'wrongCryptoType' as CryptoTypes,
            label: "Test device"
        };
        try {
            await dataContext[DomainActions.CREATE_SIGNATURE_DEVICE](mockDeviceData.id, mockDeviceData.algorithm, mockDeviceData.label);
        } catch(e) {
            expect(e).toBe(Errors.NO_STRATEGY);
        }

        const mockDeviceDataNoID = {
            id: "",
            algorithm: CryptoTypes.ec,
            label: "Test device 2"
        };

        try {
            await dataContext[DomainActions.CREATE_SIGNATURE_DEVICE](mockDeviceDataNoID.id, mockDeviceDataNoID.algorithm, mockDeviceDataNoID.label);
        } catch(e) {
            expect((<Error>e).message).toBe(Errors.DEVICE_IS_NOT_READY);
        }
    });
});