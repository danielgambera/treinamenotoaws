import { randomBytes } from "crypto";
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);
// Get the DynamoDB table name from environment variables
const tableName = process.env.TABELA_CREDITO;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

export const lambdaHandler = async (event, context) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getPopulateItems only accept GET method, you tried: ${event.httpMethod}`);
    }
    console.info('received:', event);

    var params = {
        TableName : tableName
    };

    try {
        var erro = "";
        for (let index = 1; index < 101; index++) {
            try {

                var paraminclusao = {
                    TableName : tableName,
                    Item: { id : index.toString().padStart(3,"0"), 
                            nome: "Cliente " +  index.toString().padStart(2,"0"),
                            creditoPreAprovado: getRandomInt(100000),
                            creditoUtilizado: 0}
                };
                const data = await ddbDocClient.send(new PutCommand(paraminclusao));
                console.log("Success - item added or updated", data);
              } catch (err) {cd
                console.log("Error", err.stack);
                erro = err.stack;
              }
            
        }

    } catch (err) {
        console.log("Error", err);
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(erro)
    };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
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

