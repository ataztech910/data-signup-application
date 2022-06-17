export default interface Signer {
    sign: (dataToBeSigned: string[]) => string[] | Error;
}
