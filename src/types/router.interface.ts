import { Request, Response } from 'express';
import { HttpMethods } from '../api/namespaces';
export default interface IRouter {
    type: keyof typeof HttpMethods,
    url: string,
    actionObject: (req: Request, res: Response) => void
}