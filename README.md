English / [日本語](README.ja.md)

# Ghost String Parameter for CDK

Provides access control over parameters in [Parameter Store on AWS Systems Manager](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html).

This library is supposed to be combined with the [AWS Cloud Development Kit (CDK)](https://aws.amazon.com/cdk/) version 2.

## Installation

```sh
npm install https://github.com/codemonger-io/cdk-ghost-string-parameter.git#v0.2.0
```

### Installing from GitHub Packages

Every time commits are pushed to the `main` branch, a _developer package_ is published to the npm registry managed by GitHub Packages.
A _developer package_ bears the next release number but followed by a dash (`-`) plus the short commit hash; e.g., `0.2.0-abc1234` where `abc1234` is the short commit hash of the commit used to build the package (_snapshot_).
You can find _developer packages_ [here](https://github.com/codemonger-io/cdk-ghost-string-parameter/pkgs/npm/cdk-ghost-string-parameter).

#### Configuring a GitHub personal access token

To install a _developer package_, you need to configure a **classic** GitHub personal access token (PAT) with at least the `read:packages` scope.
Below briefly explains how to configure a PAT.
Please refer to the [GitHub documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry) for more details.

Once you have a PAT, please create a `.npmrc` file in your home directory with the following content:

```
//npm.pkg.github.com/:_authToken=$YOUR_GITHUB_PAT
```

Please replace `$YOUR_GITHUB_PAT` with your PAT.

In the root directory of your project, create another `.npmrc` file with the following content:

```
@codemonger-io:registry=https://npm.pkg.github.com
```

Then you can install a _developer package_ with the following command:

```sh
npm install @codemonger-io/cdk-ghost-string-parameter@0.2.0-abc1234
```

Please replace `abc1234` with the short commit hash of the _snapshot_ you want to install.

## Example

The only class this library provides is [`GhostStringParameter`](./api-docs/markdown/cdk-ghost-string-parameter.md).
Here is an example to use it:

```ts
import { GhostStringParameter } from '@codemonger-io/cdk-ghost-string-parameter';
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

    grantReadParameter(grantee: iam.IGrantable): iam.Grant {
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
pnpm install --frozen-lockfile
```

### Building

```sh
pnpm build
```

### Generating the API documentation

```sh
pnpm build:doc
```
