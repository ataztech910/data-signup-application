/**
 * We can define here only supported by the system http methods. As example only get/post
 */
enum HttpMethods {
    get = 'get',
    post = 'post' 
}

/**
 * We can define here only supported by the system http codes
 */
enum HttpCodes {
    OK = 200,
    ERROR = 500
}

/**
 * We can define here only supported by the system http answers
 */
enum HttpAnswers {
    PASS = 'pass',
    WRONG_REQUEST = 'wrong request',
    WRONG_CRYPTO_TYPE = 'wrong crypto type'
}

export { HttpMethods, HttpCodes, HttpAnswers };