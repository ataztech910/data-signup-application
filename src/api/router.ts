import IRouter from "../types/router.interface";
import { HttpMethods } from "./namespaces";
import { health } from "./actions/health";
import { sign } from "./actions/sign";


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
        url: 'sign',
        actionObject: sign
    }
];

export { router };