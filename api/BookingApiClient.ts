import { APIRequestContext, APIResponse } from '@playwright/test';
import { BookingPayload } from '../utils/models/BookingPayload';

export interface BookingFilterParams {
    firstname?: string;
    lastname?: string;
    checkin?: string;
    checkout?: string;
}

export class BookingApiClient {

    private readonly request: APIRequestContext

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createBooking(bookingData: BookingPayload): Promise<APIResponse> {
        const response = await this.request.post('/booking', {
            data: bookingData
        });

        return response
    }

    async updateBooking(bookingId: number, bookingData: BookingPayload): Promise<APIResponse> {
        const response = await this.request.put(`/booking/${bookingId}`, {
            data: bookingData
        });

        return response
    }

    async partialUpdateBooking(bookingId: number, bookingData: Partial<BookingPayload>): Promise<APIResponse> {
        const response = await this.request.patch(`/booking/${bookingId}`, {
            data: bookingData
        });

        return response
    }

    async deleteBooking(bookingId: number): Promise<APIResponse> {
        const response = await this.request.delete(`/booking/${bookingId}`, {
        });

        return response
    }

    async getBookingIds(params?: BookingFilterParams): Promise<APIResponse> {
        const response = await this.request.get('/booking', {
            params: params as Record<string, string>
        });

        return response
    }

    async getBookingById(bookingId: number): Promise<APIResponse> {
        const response = await this.request.get(`/booking/${bookingId}`, {
        });

        return response
    }
}