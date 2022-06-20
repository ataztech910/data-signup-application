export default interface IDevice {
    uuid: string;
    label: string;
    signatureCounter: number;
    lastSignature: string;
}