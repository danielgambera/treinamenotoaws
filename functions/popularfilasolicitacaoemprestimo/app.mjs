import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

const sqsClient = new SQSClient();

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

export const lambdaHandler = async (event, context) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`PopularFila somente aceita método GET, você usou: ${event.httpMethod}`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    const params = {
        QueueUrl: process.env.QUEUE_URL,
        MessageBody: JSON.stringify(event)
      };

    try {
        var erro = "";
        for (let index = 1; index < 50; index++) {
            try {
                var Item = { idPessoa : getRandomInt(100).toString().padStart(3,"0"), 
                             creditoSolicitado: getRandomInt(110000)}
                var paraminclusao = {
                    QueueUrl: process.env.QUEUE_URL,
                    MessageBody: JSON.stringify(Item)
                };
                const command = new SendMessageCommand(paraminclusao);
                const data = await sqsClient.send(command);
                console.log("Success - item added or updated", data);
              } catch (err) {
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

