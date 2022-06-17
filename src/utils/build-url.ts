import { appConfig } from "../../config";

const makeUrl = (url: string): string => {
    return `${appConfig.root}${url}`;
};

export { makeUrl };