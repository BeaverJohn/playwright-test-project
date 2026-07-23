import { test as setup } from '../../fixtures/index';
// @ts-ignore
import * as fs from 'node:fs';
// @ts-ignore
import * as path from 'node:path';

const authFile = 'playwright/.auth/user_api.json';

setup('authenticate via API', async ({ request }) => {
  const response = await request.post('/auth', {
    data: {
      username: process.env.API_ADMIN_USERNAME!,
      password: process.env.API_ADMIN_PASSWORD!,
    }
  });

  const body = await response.json();
  const tokenValue = body.token;

  const apiState = {
    cookies: [
      {
        name: 'token',
        value: tokenValue,
        domain: 'restful-booker.herokuapp.com',
        path: '/',
        expires: Math.floor(Date.now() / 1000) + 120, // Valid for 2 mins
        httpOnly: false,
        secure: false,
        sameSite: 'Lax' as const,
      }
    ],
    origins: []
  };

  const targetDir = path.dirname(authFile);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.writeFileSync(authFile, JSON.stringify(apiState, null, 2), 'utf-8');
});