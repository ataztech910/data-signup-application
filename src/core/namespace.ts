enum DataActions {
    CONNECT = 'connect',
    READ_DEVICES_LIST = 'read_devices_list',
    WRITE_INTO_DEVICES_LIST = 'write_into_devices_list',
    GET_ACTIVE_DEVICE = 'get_active_DEVICE',
    UPDATE_SIGNATURES = 'update_signatures',
    READ_SIGNATURES = 'read_signatures'
}

enum ResponseKeys {
    SIGNATURE = 'signature',
    SIGNED_DATA = 'signed_data'
}

enum DbDrivers {
    FILE_BASE = 'file_base'
}

enum Labels {
    DEFAULT_DEVICE = 'default device'
}

export { DataActions, ResponseKeys, DbDrivers, Labels };