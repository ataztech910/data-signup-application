import { appConfig } from "../../config";
import DataContext from "./data-context";
import { BaseStrategies } from "./strategies";

export default class DataInstance {
    private static instance: DataInstance;
    private dataContext: DataContext;

    private constructor() {
        this.dataContext = new DataContext(BaseStrategies[appConfig.dbDriver]);
    }

    public static getInstance(): DataInstance {
        if (!DataInstance.instance) {
            DataInstance.instance = new DataInstance();
        }

        return DataInstance.instance;
    }

    public getDataContext(): DataContext {
       return this.dataContext;
    }
}