import { apiFixtures } from './api_fixture';
import { BookingPayload } from '../utils/models/BookingPayload';


type ApiBookingFixtures = {
    trackedBooking: (payload: BookingPayload) => Promise<{ id: number; response: any }>;
};

export const apiBookingFixtures = apiFixtures.extend<ApiBookingFixtures>({
    trackedBooking: async ({ bookingApiClient }, use) => {
        const createdBookingIds: number[] = [];
        await use(async (payload) => {
            const res = await bookingApiClient.createBooking(payload);
            const json = await res.json();
            
            if (json.bookingid) {
                createdBookingIds.push(json.bookingid);
            }
            
            return { id: json.bookingid, response: res };
        });

        for (const id of createdBookingIds) {
            console.log(`[Teardown] Cleaning up created booking ID: ${id}`);
            await bookingApiClient.deleteBooking(id);
        }
    }
});