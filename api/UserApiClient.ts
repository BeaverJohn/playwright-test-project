import { APIRequestContext, APIResponse } from '@playwright/test';
import { UserPayload } from '../utils/models/UserPayload';

export class UserApiClient {

    private readonly request: APIRequestContext

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createUser(userData: UserPayload): Promise<APIResponse> {
        const response = await this.request.post('/api/createAccount', {
            data: {
                name: userData.username,
                email: userData.email,
                password: userData.password,
                firstname: userData.firstName,
                lastname: userData.lastName,
                address1: userData.address1,
                country: userData.country,
                state: userData.state,
                city: userData.city,
                zipcode: userData.zipcode,
                mobile_number: userData.phone
            }
        });

        return response
    }
}