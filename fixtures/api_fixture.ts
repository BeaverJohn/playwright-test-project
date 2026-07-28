import { test as base } from '@playwright/test';
import { UserApiClient } from '../api/UserApiClient';
import { BookingApiClient } from '../api/BookingApiClient';
import { apiLoggerFixtures } from './api_logger_fixture';

type ApiFixtures = {
    userApiClient: UserApiClient;
    bookingApiClient: BookingApiClient;
};

export const apiFixtures = apiLoggerFixtures.extend<{ bookingApiClient: BookingApiClient }>({
    bookingApiClient: async ({ loggingRequest }, use) => {
        const client = new BookingApiClient(loggingRequest);
        await use(client);
    }
});
