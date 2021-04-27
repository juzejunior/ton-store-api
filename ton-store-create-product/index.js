const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event, context) => {
   
  const headers = {
    "Content-Type": "application/json"
  };

  const tableName = "product";
  
  let body;
  let statusCode = 200;
  
  try {
      let requestJSON = JSON.parse(event.body);
      let product = { 
         id: uuidv4(),
         price: requestJSON.price,
         name: requestJSON.name,
      }
      await dynamo
          .put({
            TableName: tableName,
            Item: product
          }).promise();
      body = product;    
  } catch(err) {
      statusCode = 400;
      body = err.message;        
  } finally {
      body = JSON.stringify(body);
  }  
   
  const response = {
        statusCode: statusCode,
        body: body,
        headers: headers
  };
  
  return response;
};