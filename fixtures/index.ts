import { pageFixtures } from './page_init_fixture';
import { dataFixtures } from './data_gen_fixture';
import { apiFixtures } from './api_fixture';
import { uiErrorFixtures } from './ui_error_fixture';
import { apiLoggerFixtures } from './api_logger_fixture';
import { apiBookingFixtures } from './api_booking_fixture';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(apiLoggerFixtures, pageFixtures, dataFixtures, apiFixtures, apiBookingFixtures, uiErrorFixtures);

export { expect } from '@playwright/test';