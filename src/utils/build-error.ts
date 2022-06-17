const makeError = (status: number, message: string) => {
    return JSON.stringify({
        status, 
        message
    });
};

export { makeError };