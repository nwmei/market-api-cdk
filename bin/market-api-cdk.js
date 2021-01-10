#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { MarketApiCdkStack } = require('../lib/market-api-cdk-stack');

const app = new cdk.App();
new MarketApiCdkStack(app, 'MarketApiCdkStack');
