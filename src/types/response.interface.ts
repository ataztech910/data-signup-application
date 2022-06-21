import { ResponseKeys } from "../core/namespace";

export default interface IResponse {
    [ResponseKeys.SIGNATURE]: string;
    [ResponseKeys.SIGNED_DATA]: string;
}