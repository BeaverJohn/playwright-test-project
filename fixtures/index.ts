import { pageFixtures } from './page_init_fixture';
import { dataFixtures } from './data_gen_fixture';
import { apiFixtures } from './api_fixture';
import { apiBookingFixtures } from './api_booking_fixture';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(pageFixtures, dataFixtures, apiFixtures, apiBookingFixtures);

export { expect } from '@playwright/test';