import { randomBytes } from "crypto";

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

/**
 * Sample Lambda function which mocks the operation of buying a random number of shares for a stock.
 * For demonstration purposes, this Lambda function does not actually perform any  actual transactions. It simply returns a mocked result.
 * 
 * @param {Object} event - Input event to the Lambda function
 * @param {Object} context - Lambda Context runtime methods and attributes
 *
 * @returns {Object} object - Object containing details of the stock buying transaction
 * 
 */
export const lambdaHandler = async (event, context) => {
    // Get the price of the stock provided as input
    const idPessoa = event["idPessoa"];
    const creditoSolicitado = event["creditoSolicitado"];
    const creditoAprovado = event["creditoAprovado"];
    var date = new Date();
    // Mocked result of a stock selling transaction
    let transaction_result = {
        'id': randomBytes(16).toString("hex"),
        'idPessoa': idPessoa, 
        'tipoOperacao': 'NEGAR', 
        'creditoDisponivel': creditoAprovado.toString(), 
        'creditoSolicitado': creditoSolicitado.toString(),  
        'creditoConcedido': "0", 
        'timestamp': date.toISOString(), 
    }
    return transaction_result
};
