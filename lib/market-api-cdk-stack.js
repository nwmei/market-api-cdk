const cdk = require('@aws-cdk/core');
const lambda = require('@aws-cdk/aws-lambda');
const apiGateway = require('@aws-cdk/aws-apigateway');
const ec2 = require('@aws-cdk/aws-ec2');
const {
  ManagedPolicy,
  Role,
  ServicePrincipal,
  PolicyStatement,
  Effect,
} = require('@aws-cdk/aws-iam');
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

    const defaultVPC = ec2.Vpc.fromLookup(this, 'defaultVPC', {vpcId: 'vpc-70ce140d'});

    const graphqlLambdaRole = new Role(this, 'FargateTaskExecutionServiceRole', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com')
    });

    graphqlLambdaRole.addManagedPolicy(
      ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaVPCAccessExecutionRole')
    );

    const lambdaSecurityGroup = ec2.SecurityGroup.fromSecurityGroupId(this, "SG", "sg-75201e43");

    const subnet1a = ec2.PrivateSubnet.fromSubnetAttributes(this, "SUBNET1A", {
      subnetId: "us-east-1a"
    });
    const subnet1c = ec2.PrivateSubnet.fromSubnetAttributes(this, "SUBNET1C", {
      subnetId: "us-east-1c"
    });
    const subnet1d = ec2.PrivateSubnet.fromSubnetAttributes(this, "SUBNET1D", {
      subnetId: "us-east-1d"
    });
    const subnet1b = ec2.PrivateSubnet.fromSubnetAttributes(this, "SUBNET1B", {
      subnetId: "us-east-1b"
    });

    const graphqlLambda = new lambda.Function(this, 'graphqlLambda2', {
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
      handler: 'graphql.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      role: graphqlLambdaRole,
      vpc: defaultVPC,
      allowPublicSubnet: true,
      timeout: cdk.Duration.seconds(59),
      securityGroups: [lambdaSecurityGroup],
      vpcSubnets: [subnet1a, subnet1c, subnet1d, subnet1b]
    });

    const apiGateWay = new apiGateway.LambdaRestApi(this, 'graphqlEndpoint', {
      handler: graphqlLambda,
      proxy: false,
      defaultCorsPreflightOptions: {
        allowOrigins: apiGateway.Cors.ALL_ORIGINS,
        allowMethods: apiGateway.Cors.ALL_METHODS,
      },
    });

    const gqlEndpoint = apiGateWay.root.addResource('gql2', {
      defaultCorsPreflightOptions: {
        allowOrigins: apiGateway.Cors.ALL_ORIGINS,
        allowMethods: apiGateway.Cors.ALL_METHODS,
      }
    });
    gqlEndpoint.addMethod('POST'
    );
  }
}

module.exports = { MarketApiCdkStack };
