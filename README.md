# Data signup application

This is an application to sign the provided data using different strategies

Related to https://github.com/fiskaly/coding-challenges/tree/main/signing-service-challenge-ts

To start using locally please do:

1. Clone the repository
2. Do `npm install` in root of the project
3. For local development use `npm run dev`
4. For test use `npm run test:<provide the type of test or text 'full'>`

Happy coding !

In the result you will have 2 endpoints that is used like this:

1. /create-device POST
as body you should provide this information :
{
    "id": "16557499016731",
    "algorithm": "rsa",
    "label": "Test device"
}
* label is not mandatory
** at this stage current device will be marked as active device 

2. /sign-transaction
as body you should provide this information: 
{
    "data": "data to sign"
}