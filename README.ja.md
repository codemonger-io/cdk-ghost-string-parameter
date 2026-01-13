[English](README.md) / 日本語

# Ghost String Parameter for CDK

[AWS Systems ManagerのParameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html)に格納されたパラメータに対するアクセスコントロールを提供します。

このライブラリは[AWS Cloud Development Kit (CDK)](https://aws.amazon.com/cdk/)バージョン2と組み合わせる想定です。

## インストール

```sh
npm install https://github.com/codemonger-io/cdk-ghost-string-parameter.git#v0.2.1
```

### GitHub Packagesからインストールする

`main`ブランチにコミットがプッシュされるたびに、*開発者用パッケージ*がGitHub Packagesが管理するnpmレジストリにパブリッシュされます。
*開発者用パッケージ*のバージョンは次のリリースバージョンにハイフン(`-`)と短いコミットハッシュをつなげたものになります。例、`0.2.1-abc1234` (`abc1234`はパッケージをビルドするのに使ったコミット(*スナップショット*)の短いコミットハッシュ)。
*開発者用パッケージ*は[こちら](https://github.com/codemonger-io/cdk-ghost-string-parameter/pkgs/npm/cdk-ghost-string-parameter)にあります。

#### GitHubパーソナルアクセストークンの設定

*開発者用パッケージ*をインストールするには、最低限`read:packages`スコープの**クラシック**GitHubパーソナルアクセストークン(PAT)を設定する必要があります。
以下、簡単にPATの設定方法を説明します。
より詳しくは[GitHubのドキュメント](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry)をご参照ください。

PATが手に入ったら以下の内容の`.npmrc`ファイルをホームディレクトリに作成してください。

```
//npm.pkg.github.com/:_authToken=$YOUR_GITHUB_PAT
```

`$YOUR_GITHUB_PAT`はご自身のPATに置き換えてください。

プロジェクトのルートディレクトリに以下の内容の`.npmrc`ファイルを作成してください。

```
@codemonger-io:registry=https://npm.pkg.github.com
```

これで以下のコマンドで*開発者用パッケージ*をインストールできます。

```sh
npm install @codemonger-io/cdk-ghost-string-parameter@0.2.1-abc1234
```

`abc1234`はインストールしたい*スナップショット*の短いコミットハッシュに置き換えてください。

## サンプル

このライブラリが提供する唯一のクラスが[`GhostStringParameter`](./api-docs/markdown/cdk-ghost-string-parameter.md)です。
以下は使用例です。

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
pnpm install --frozen-lockfile
```

### ビルド

```sh
pnpm build
```

### APIドキュメントの生成

```sh
pnpm build:doc
```
