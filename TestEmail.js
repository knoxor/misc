const AWS = require('aws-sdk');

const credentials = new AWS.SharedIniFileCredentials({profile: 'centrica-dev-git'});
AWS.config.credentials = credentials;
AWS.config.region = 'eu-west-1';

const sqs = new AWS.SQS();

const params = {
	QueueUrl: 'https://sqs.eu-west-1.amazonaws.com/728141290039/bge-website-api-general-dev-EmailNotificationQueue-71KX3MFJLKA8',
	MessageBody: `{
		"from": "aws_bge_website_dev@bordgais.ie",
		"destination": "pknox@bordgais.ie",
		"subject": "Test email from BGE",
		"body": "body",
		"type": "GENERIC",
		"vars": {"uniqueId": "abcde"}
	}`
};
let notSentCount = 0;
for (step = 0; step < 1; step++) {
	sqs.sendMessage(params)
		.promise()
		.catch((error) => {
			console.log(`not sent: ${notSentCount++}`);
			console.log(error);
		});
}
