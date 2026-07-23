import { test as base } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { UserPayload } from '../utils/models/UserPayload';
import { BookingPayload } from '../utils/models/BookingPayload';

type MyDataGenFixtures = {
    newUser: UserPayload;
    newBooking: BookingPayload;
}

export const dataFixtures = base.extend<MyDataGenFixtures>({
    newUser: async({}, use) => {
        const newUser = new UserPayload(faker.internet.username(), faker.internet.email());
        await use(newUser);
    },

    newBooking: async({}, use) => {
        const newBooking = BookingPayload.createDefault();
        await use(newBooking);
    },
});

export { expect } from '@playwright/test';