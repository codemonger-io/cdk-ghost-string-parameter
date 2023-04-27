[English](README.md) / 日本語

# Ghost String Parameter for CDK

[AWS Systems ManagerのParameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html)に格納されたパラメータに対するアクセスコントロールを提供します。

このライブラリは[AWS Cloud Development Kit (CDK)](https://aws.amazon.com/cdk/)バージョン2と組み合わせる想定です。

## インストール

```sh
npm install https://github.com/codemonger-io/cdk-ghost-string-parameter.git#v0.1.0
```

## サンプル

このライブラリが提供する唯一のクラスが[`GhostStringParameter`](./api-docs/markdown/cdk-ghost-string-parameter.md)です。
以下は使用例です。

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

## APIドキュメント

APIドキュメントは[`api-docs/markdown`](./api-docs/markdown/index.md)にあります(英語版のみ)。

## 動機

CDKでAWS Systems ManagerのParameter Storeに格納されているパラメータを表すのに[`aws-cdk-lib.aws_ssm.StringParameter (StringParameter)`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ssm.StringParameter.html)が使えます。
`StringParameter`を使うと、[`grantRead`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ssm.StringParameter.html#grantwbrreadgrantee)などのAPIを通じてパラメータに対するアクセスコントロールが行えます。
ところが、`StringParameter`を使うには、
- CDKスタックでパラメータをプロビジョンするか、
- 既存のパラメータにバインドするかしなければなりません。

CDKスタックをデプロイした後にパラメータを作成したい場合は、残念ながら`StringParameter`を使うことはできません。
デプロイ時に存在しないパラメータに対してプロビジョンせずにアクセスコントロールを行いたいときに、このライブラリが役に立つかもしれません。

## 開発

### 依存関係の解決

```sh
npm ci
```

### ビルド

```sh
npm run build
```

### APIドキュメントの生成

```sh
npm run build:doc
```