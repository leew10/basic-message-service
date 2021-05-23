var AWS = require("aws-sdk");

var dynamodb = new AWS.DynamoDB({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var params = {
    TableName : "messages",
    KeySchema: [       
        { AttributeName: "recipient", KeyType: "HASH"},  
        { AttributeName: "sentAt", KeyType: "RANGE" }  
    ],
    AttributeDefinitions: [       
        { AttributeName: "recipient", AttributeType: "S" },
        { AttributeName: "sentAt", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 1, 
        WriteCapacityUnits: 1
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});