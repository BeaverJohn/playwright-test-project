import { test as base, APIRequestContext } from '@playwright/test';

export const apiLoggerFixtures = base.extend<{ loggingRequest: APIRequestContext }>({
    loggingRequest: async ({ request }, use, testInfo) => {
        const loggingApiContext = new Proxy(request, {
            get(target, prop, receiver) {
                const originalMethod = Reflect.get(target, prop, receiver);

                if (typeof originalMethod === 'function' && ['get', 'post', 'put', 'patch', 'delete'].includes(prop as string)) {
                    return async (...args: any[]) => {
                        const [url, config] = args;
                        const method = (prop as string).toUpperCase();

                        const requestLog = `[API REQUEST] ${method} -> ${url}\nData: ${JSON.stringify(config?.data || {}, null, 2)}`;
                        console.log(requestLog);
                        testInfo.attachments.push({
                            name: `${method} Request - ${url}`,
                            contentType: 'text/plain',
                            body: Buffer.from(requestLog),
                        });

                        const response = await originalMethod.apply(target, args);

                        const status = response.status();
                        let bodyText = '';
                        try {
                            bodyText = await response.text();
                        } catch {
                            bodyText = '[Non-text response]';
                        }

                        const responseLog = `[API RESPONSE] ${status} ${response.statusText()}\nBody: ${bodyText}`;
                        console.log(responseLog);
                        testInfo.attachments.push({
                            name: `${status} Response - ${url}`,
                            contentType: 'application/json',
                            body: Buffer.from(bodyText),
                        });

                        return response;
                    };
                }
                return originalMethod;
            }
        });

        await use(loggingApiContext);
    }
});