import { SQSClient, ReceiveMessageCommand } from "@aws-sdk/client-sqs";
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

export const lambdaHandler = async (event, context) => {

    const sqsClient = new SQSClient();
    const queueUrl = process.env.QUEUE_URL;
    const tabelaCredito = process.env.TABELA_CREDITO

    const receiveParams = {
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 1
      };

      var retorno;

      try {
        const data = await sqsClient.send(new ReceiveMessageCommand(receiveParams));

        if (data.Messages) {
          for (const message of data.Messages) {
            console.log(`Received message: ${message.Body}`);
            var body = JSON.parse(message.Body);

            var parConsulta = { TableName : tabelaCredito, Key: { id : body.idPessoa } }
            console.log(`parConsulta: ${JSON.stringify(parConsulta)}`);
            
            const data = await ddbDocClient.send(new GetCommand(parConsulta));
            console.log(`consulta: ${JSON.stringify(data)}`);
            
            
            let creditoRestante = 0;
            if (data.Item)
            {
              const item = data.Item;
              creditoRestante = item.creditoPreAprovado - item.creditoUtilizado;
              console.log(`data.Item: ${JSON.stringify(data.Item)}`);
            }
            else
            {
              console.log(`data.Item (nulou?): ${JSON.stringify(data.Item)}`);
            }
            


            retorno = {     idPessoa : body.idPessoa,
                            creditoSolicitado: body.creditoSolicitado,
                            creditoAprovado: creditoRestante,
                            ReceiptHandler: message.ReceiptHandler
              }
              
              console.log(`retorno: ${JSON.stringify(retorno)}`);
    
          }
        } else {
          console.log('No messages to process');
        }
      } catch (error) {
        console.error(`Error receiving or deleting message: ${error}`);
      }
      
      return retorno;
};
