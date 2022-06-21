import IRouter from "../types/router.interface";
import { HttpMethods } from "./namespaces";
import { health } from "./actions/health";
import { signTransaction } from "./actions/sign-transaction";
import { createDevice } from "./actions/create-device";


/**
 * Router list for all application endpoints. 
 * Can be re-configured with any params. 
 * E.g. we can add param to each endpoint like 'isGuardedByAuth'
 */
const router: Array<IRouter> = [
    {
        type: HttpMethods.get,
        url: 'health',
        actionObject: health
    },
    {
        type: HttpMethods.post,
        url: 'sign-transaction',
        actionObject: signTransaction
    },
    {
        type: HttpMethods.post,
        url: 'create-device',
        actionObject: createDevice
    },
];

export { router };