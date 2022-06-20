enum DataActions {
    CONNECT = 'connect',
    READ_LIST = 'read_list',
    WRITE_INTO_LIST = 'write_into_list',
}

enum ResponseKeys {
    SIGNATURE = 'signature',
    SIGNED_DATA = 'signed_data'
}

enum DbDrivers {
    FILE_BASE = 'file_base'
}

export { DataActions, ResponseKeys, DbDrivers };