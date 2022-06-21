import { DataActions } from "../core/namespace";
import IDevice from "./device.interface";
import IResponse from "./response.interface";

export default interface IDataBase {
    driver: string;
    isConnected: boolean;
    [DataActions.CONNECT](): boolean;
    [DataActions.READ_DEVICES_LIST](): Array<IDevice>;
    [DataActions.WRITE_INTO_DEVICES_LIST](device: IDevice): IDevice | Error;
    [DataActions.GET_ACTIVE_DEVICE](): IDevice | void
    [DataActions.UPDATE_SIGNATURES](response: IResponse): IResponse | void
    [DataActions.READ_SIGNATURES](): IResponse[]
}
