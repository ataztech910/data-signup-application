import { DbDrivers } from "../namespace";
import FileBaseStrategy from "./file_base.strategy";

const BaseStrategies = {
    [DbDrivers.FILE_BASE]: new FileBaseStrategy('file-base'),
};

export { BaseStrategies };