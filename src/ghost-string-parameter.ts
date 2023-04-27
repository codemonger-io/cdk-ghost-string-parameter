import { Stack, aws_iam as iam } from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * Properties given to the constructor of {@link GhostStringParammeter}.
 *
 * @beta
 */
export interface GhostStringParameterProps {
    /**
     * Name of the parameter.
     *
     * @remarks
     *
     * Must be a path-like (not simple) name.
     */
    readonly parameterName: string;
    // TODO: support simple name option like CDK's StringParameter
}

/**
 * String parameter stored in Parameter Store on AWS Systems Manager.
 *
 * @remarks
 *
 * The main goal of this class is to provide access control over a parameter
 * in Parameter Store on AWS Systems Manager.
 *
 * To grant access to parameters stored in Parameter Store on AWS Systems
 * Manager, the simplest way is to use CDK's {@link https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ssm.StringParameter.html | StringParameter}.
 * However, to instantiate a `StringParameter`, you have to provision it in the
 * CDK stack or bind it to an already existing one; you cannot bind
 * a `StringParameter` to a parameter supposed to exist afterwards.
 *
 * You can bind this class to a parameter that does not exist in Parameter Store
 * on AWS Systems Manager without provisioning it.
 *
 * Note that this class is not a `Construct`.
 *
 * @beta
 */
export class GhostStringParameter {
    /** Scope of this parameter. */
    readonly scope: Construct
    /** Name of this parameter. */
    readonly parameterName: string;

    constructor(scope: Construct, props: GhostStringParameterProps) {
        this.scope = scope;
        this.parameterName = props.parameterName;
    }

    /** Allows a given principal to read this parameter. */
    grantRead(grantee: iam.IGrantable): iam.Grant {
        // https://github.com/aws/aws-cdk/blob/740d6f00943ebd5dc20b199c6c753cc85325fb8d/packages/%40aws-cdk/aws-ssm/lib/util.ts#L33-L36
        const paramArn = Stack.of(this.scope).formatArn({
            service: 'ssm',
            resource: `parameter${this.parameterName}`,
        });
        // https://github.com/aws/aws-cdk/blob/740d6f00943ebd5dc20b199c6c753cc85325fb8d/packages/%40aws-cdk/aws-ssm/lib/parameter.ts#L179-L188
        return iam.Grant.addToPrincipal({
            grantee,
            actions: [
                'ssm:DescribeParameters',
                'ssm:GetParameters',
                'ssm:GetParameter',
                'ssm:GetParameterHistory',
            ],
            resourceArns: [paramArn],
        }); 
    }
}
