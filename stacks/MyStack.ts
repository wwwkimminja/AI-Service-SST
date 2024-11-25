import { StackContext, Api } from 'sst/constructs';

export function API({ stack }: StackContext) {
    const api = new Api(stack, 'raymong_lecture', {
        cors: true,
        defaults: {
            function: {
                bind: [],
            },
        },
        routes: {
            'GET /{proxy+}': 'packages/functions/src/lambda.handler',
            'POST /{proxy+}': 'packages/functions/src/lambda.handler',
        },
    });

    stack.addOutputs({
        ApiEndpoint: api.url,
    });
}