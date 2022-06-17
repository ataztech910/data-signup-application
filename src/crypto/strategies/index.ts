import { CryptoTypes } from "../namespace";
import EcdsaStrategy from "./ecdsa.strategy";
import RsaStrategy from "./rsa.strategy";

const CryptoStrategies = {
    [CryptoTypes.ec]: new EcdsaStrategy(),
    [CryptoTypes.rsa]: new RsaStrategy(),
};

export { CryptoStrategies };