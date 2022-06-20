import { ResponseKeys } from "../persistance/namespace";

export default interface IResponse {
    [ResponseKeys.SIGNATURE]: string;
    [ResponseKeys.SIGNED_DATA]: string;
}