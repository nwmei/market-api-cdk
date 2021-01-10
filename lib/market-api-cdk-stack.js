const cdk = require('@aws-cdk/core');
const lambda = require('@aws-cdk/aws-lambda');
const apiGateway = require('@aws-cdk/aws-apigateway');
const path = require('path');


class MarketApiCdkStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);


    const graphqlLambda = new lambda.Function(this, 'graphqlLambda', {
      // Where our function is located - in that case, in `lambda` directory at the root of our project
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
      // What should be executed once the lambda is invoked - in that case, the `handler` function exported by `graphql.ts`
      handler: 'graphql.handler',
      // Our runtime of choice - in that case, node.js 12.x
      runtime: lambda.Runtime.NODEJS_12_X,
    });

    new apiGateway.LambdaRestApi(this, 'graphqlEndpoint', {
      handler: graphqlLambda,
    });


  }
}

module.exports = { MarketApiCdkStack }
