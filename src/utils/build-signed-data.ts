const buildSignedData = (counter: number, data: string, lastSignature: string): string => {
    return `${counter}_${encodeURIComponent(data)}_${lastSignature}`;
};

export { buildSignedData };