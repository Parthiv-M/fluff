const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { PutCommand, GetCommand, DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const md5 = require("md5");

module.exports.handler = async (event) => {
    if (event.requestContext.httpMethod === "POST") {
        const { pasteContent } = JSON.parse(event.body);

        const userIP = event.headers && event.headers["X-Forwarded-For"].split(",")[0]
        let hashedIP = "";
        if (userIP) {
            hashedIP = md5(userIP);
        }
        const pasteId = Math.random().toString(36).substring(2, 20);
        const FIVE_DAYS_AFTER_TODAY = new Date(Date.now() + (1000 * 60 * 60 * 24 * 5)).getTime();

        const paste = {
            id: pasteId,
            pasteContent: pasteContent,
            sourceIP: hashedIP,
            createdAt: Date.now(),
            deleteAt: FIVE_DAYS_AFTER_TODAY
        }

        const client = new DynamoDBClient();
        const docClient = DynamoDBDocumentClient.from(client);
        const command = new PutCommand({
            TableName: "pastes",
            Item: paste
        });
        const response = await docClient.send(command);

        if (response.$metadata.httpStatusCode === 200) {
            return {
                statusCode: 200,
                body: pasteId
            }
        } else {
            return {
                statusCode: response.$metadata.httpStatusCode,
                body: JSON.stringify({ message: "Something went wrong" }),
            }
        }
    } else {
        const { id } = event.pathParameters;

        const client = new DynamoDBClient();
        const docClient = DynamoDBDocumentClient.from(client);

        const command = new GetCommand({
            TableName: "pastes",
            Key: {
                id: id
            },
            ConsistentRead: true
        });

        const response = await docClient.send(command);

        if (response.$metadata.httpStatusCode === 200) {
            if (!response.Item) {
                return {
                    statusCode: 200,
                    body: JSON.stringify({ message: "Paste does not exist" })
                }
            }
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Here is your paste", data: response.Item })
            }
        } else {
            return {
                statusCode: response.$metadata.httpStatusCode,
                body: JSON.stringify({ message: "Something went wrong" })
            }
        }
    }
}
