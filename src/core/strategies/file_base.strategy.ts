import IDataBase from "../../types/data-base.interface";
import IDevice from "../../types/device.interface";
import { DataActions } from "../namespace";
import fileSystem from 'fs';
import path from 'path';
import { appConfig } from "../../../config";
import IResponse from "../../types/response.interface";

export default class FileBaseStrategy implements IDataBase {
    driver: string;
    isConnected: boolean;
    devices: Array<IDevice>;
    signatures: Array<IResponse>;

    constructor(driver: string) {
       this.driver = driver; 
       this.isConnected = false;
       this.devices = [];
       this.signatures = [];
    }
    [DataActions.CONNECT](): boolean {
        /**
         * Can be optimised to async read but the file can be large so we would need 
         * more optimised file-store (like grouping by devices or use one file for each device)
         * I do not have requirements here for the store so will leave it as is for now.
         */
        try {
            const devicesRawdata = fileSystem.readFileSync(path.join(__dirname, appConfig.devicesFileName));
            this.devices = JSON.parse(devicesRawdata.toString());

            const signaturesRawdata = fileSystem.readFileSync(path.join(__dirname, appConfig.signaturesFileName));
            this.signatures = JSON.parse(signaturesRawdata.toString());

           } catch (e) {
                throw new Error((<Error>e).message);
           }
        
        if (this.devices && this.signatures) {
            this.isConnected = true;
        }
        return this.isConnected;
    }

    /**
     * These methods can be simplifyed while using any ORM. Its here just to show
     * what is under the hood of actions 
     */
    [DataActions.READ_DEVICES_LIST](): IDevice[] {
        const devicesRawdata = fileSystem.readFileSync(path.join(__dirname, appConfig.devicesFileName));
        this.devices = JSON.parse(devicesRawdata.toString());
        return this.devices;
    }
    [DataActions.WRITE_INTO_DEVICES_LIST](device: IDevice): IDevice | Error {
       const findIndex = this.devices.findIndex((item: IDevice) => item.uuid === device.uuid);
       if (findIndex === -1) {
        this.devices.push(device);
       } else {
        const signatureCounterCache = this.devices[findIndex].signatureCounter;
        this.devices.forEach((device: IDevice, index: number) => {
            if(index !== findIndex) {
                device.isActive = false;
            }
        });
        this.devices[findIndex] = device;
        this.devices[findIndex].signatureCounter = signatureCounterCache;
       }
       try {
        fileSystem.writeFileSync(path.join(__dirname, appConfig.devicesFileName), JSON.stringify(this.devices));
       } catch (e) {
            throw new Error((<Error>e).message);
       }
       return device;
    }
    /**
     * I found that in the task there is no mention of how user will choose the device to sign
     * so, I made the status for active device
     */
    [DataActions.GET_ACTIVE_DEVICE](): IDevice | void {
        return this.devices.find((device: IDevice) => device.isActive === true);
    }

    [DataActions.UPDATE_SIGNATURES](response: IResponse): IResponse | void {
        if (!response) {
            return void 0;
        }
        this.signatures.push(response);
        try {
            fileSystem.writeFileSync(path.join(__dirname, appConfig.signaturesFileName), JSON.stringify(this.signatures));
           } catch (e) {
                throw new Error((<Error>e).message);
           }
        return response;
    }

    [DataActions.READ_SIGNATURES](): IResponse[] {
        const signaturesRawdata = fileSystem.readFileSync(path.join(__dirname, appConfig.signaturesFileName));
        this.signatures = JSON.parse(signaturesRawdata.toString());
        return this.signatures;
    }
    
}