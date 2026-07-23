import { pageFixtures } from './page_init_fixture';
import { dataFixtures } from './data_gen_fixture';
import { apiFixtures } from './api_fixture';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(pageFixtures, dataFixtures, apiFixtures);

export { expect } from '@playwright/test';