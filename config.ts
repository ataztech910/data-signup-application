const appConfig = {
    devServer: 'npm run dev',
    host: 'http://localhost',
    port: 3030,
    apiVersion: 'v1',
    root: '/',
    aes: 'aes-192-cbc',
    ecdsa: 'aes-256-gcm',
    salt: 'fiskaly is AWESOME!',
    keyLen: 24,
    randomBytes: 16,
    stringEncodeType: 'base64'
};

export { appConfig };
