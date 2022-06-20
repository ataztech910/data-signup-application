import { DataActions } from "../persistance/namespace";
import IDevice from "./device.interface";


export default interface IDataBase {
    driver: string;
    isConnected: boolean;
    [DataActions.CONNECT](): boolean;
    [DataActions.READ_LIST](): Array<IDevice>;
    [DataActions.WRITE_INTO_LIST](device: IDevice): IDevice | Error;
}
