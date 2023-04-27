English / [日本語](README.ja.md)

# Ghost String Parameter for CDK

Provides access control over parameters in [Parameter Store on AWS Systems Manager](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html).

This library is supposed to be combined with the [AWS Cloud Development Kit (CDK)](https://aws.amazon.com/cdk/) version 2.

## Installation

```sh
npm install https://github.com/codemonger-io/cdk-ghost-string-parameter.git#v0.1.0
```

## Example

The only class this library provides is [`GhostStringParameter`](./api-docs/markdown/cdk-ghost-string-parameter.md).
Here is an example to use it:

```ts
import { GhostStringParameter } from 'cdk-ghost-string-parameter';
import { aws_iam as iam } from 'aws-cdk-lib';
import { Construct } from 'constructs';

class SampleConstruct extends Construct {
    readonly parameter: GhostStringParameter;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.parameter = new GhostStringParameter(this, {
            parameterName: '/parameters/SAMPLE_PARAMETER'
        });
    }

    grantReadParameter(grantee: iam.IGrantable): iam.IGrant {
        return this.parameter.grantRead(grantee);
    }
}
```

## API Documentation

You can find the API documentation in [`api-docs/markdown`](./api-docs/markdown/index.md).

## Motivation

The CDK provides [`aws-cdk-lib.aws_ssm.StringParameter (StringParameter)`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ssm.StringParameter.html) that represents a parameter in Parameter Store on AWS Systems Manager.
With `StringParameter`, you can control access to the parameter via the API like [`grantRead`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ssm.StringParameter.html#grantwbrreadgrantee).
However, to use `StringParameter`, you have to
- provision the parameter in the CDK stack
- or bind it to an existing parameter

Unfortunately, you cannot use `StringParameter` if you want to create the parameter in the futer after the CDK stack is deployed.
If you want to control access to a parameter that does not exist at deployment without provisioning it, this library could help you.

## Development

### Resolving dependencies

```sh
npm ci
```

### Building

```sh
npm run build
```

### Generating the API documentation

```sh
npm run build:doc
```