import { DataActions, DbDrivers } from '../src/persistance/namespace';
import { BaseStrategies } from '../src/persistance/strategies/index';
import IDataBase from '../src/types/data-base.interface';
import IDevice from '../src/types/device.interface';
describe('File based strategy test', () => {
    let data: IDataBase;
    beforeEach(() => {
        data = BaseStrategies[DbDrivers.FILE_BASE];
    });

    test('Should connect to the file', () => {
        expect(data[DataActions.CONNECT]()).toBe(true);
    });

    test('Should return device list', () => {
        data[DataActions.CONNECT]();
        const list = data[DataActions.READ_LIST]();
        if (Array.isArray(list) && list.length > 0) {
            expect(typeof list[0].uuid).toBe('string');
            expect(typeof list[0].label).toBe('string');
            expect(typeof list[0].signatureCounter).toBe('number');
            expect(typeof list[0].lastSignature).toBe('string');
        } else {
            expect(list.length).toBe(0);
        }
        
    });

    test('Shoud write data to database', () => {
        data[DataActions.CONNECT]();
        const initList = data[DataActions.READ_LIST]();
        const dataLength = initList.length;
        const mockDevice = {
            uuid: Date.now().toString(),
            label: 'testDevice123',
            signatureCounter: 0,
            lastSignature: '0'
        };
        const insert = data[DataActions.WRITE_INTO_LIST](mockDevice);

        const listAfterInsert = data[DataActions.READ_LIST]();
        const dataLengthAfterInsert = listAfterInsert.length;
        expect(insert).toBe(insert);
        expect(dataLengthAfterInsert).toBe(dataLength + 1);

        const mockDeviceChangeCounter = {
            uuid: '12345',
            label: 'testDevice123',
            signatureCounter: 0,
            lastSignature: '0'
        };
        data[DataActions.WRITE_INTO_LIST](mockDeviceChangeCounter);
        mockDeviceChangeCounter.signatureCounter = 1;

        const update = data[DataActions.WRITE_INTO_LIST](mockDeviceChangeCounter);
        expect((update as IDevice).signatureCounter).toBe(1);
    });
});