import { test as base } from '@playwright/test';
import { UserApiClient } from '../api/UserApiClient';
import { BookingApiClient } from '../api/BookingApiClient';

type ApiFixtures = {
    userApiClient: UserApiClient;
    bookingApiClient: BookingApiClient;
};

export const apiFixtures = base.extend<ApiFixtures>({
    userApiClient: async ({ request }, use) => {
        const client = new UserApiClient(request);
        await use(client);
    },

    bookingApiClient: async ({ request }, use) => {
        const client = new BookingApiClient(request);
        await use(client);
    }
});
