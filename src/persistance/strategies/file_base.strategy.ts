import IDataBase from "../../types/data-base.interface";
import IDevice from "../../types/device.interface";
import { DataActions } from "../namespace";
import fileSystem from 'fs';
import path from 'path';
import { appConfig } from "../../../config";

export default class FileBaseStrategy implements IDataBase {
    driver: string;
    isConnected: boolean;
    data: Array<IDevice>;

    constructor(driver: string) {
       this.driver = driver; 
       this.isConnected = false;
       this.data = [];
    }
    [DataActions.CONNECT](): boolean {
        /**
         * Can be optimised to async read but the file can be large so we would need 
         * more optimised file-store (like grouping by devices or use one file for each device)
         * I do not have requirements here for the store so will leave it as is for now.
         */
        try {
            const rawdata = fileSystem.readFileSync(path.join(__dirname, appConfig.dataFileName));
            this.data = JSON.parse(rawdata.toString());
           } catch (e) {
                throw new Error((<Error>e).message);
           }
        
        if (this.data) {
            this.isConnected = true;
        }
        return this.isConnected;
    }

    /**
     * These methods can be simplifyed while using any ORM. Its here just to show
     * what is under the hood of actions 
     */
    [DataActions.READ_LIST](): IDevice[] {
        console.log(this.data);
        return this.data;
    }
    [DataActions.WRITE_INTO_LIST](device: IDevice): IDevice | Error {
       console.log(device);
       const findIndex = this.data.findIndex((item: IDevice) => item.uuid === device.uuid);
       if (findIndex === -1) {
        this.data.push(device);
       } else {
        this.data[findIndex] = device;
       }
       try {
        fileSystem.writeFileSync(path.join(__dirname, appConfig.dataFileName), JSON.stringify(this.data));
       } catch (e) {
            throw new Error((<Error>e).message);
       }

       return this.data[findIndex];
    }
    
}