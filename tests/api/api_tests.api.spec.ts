import { expect, test } from '../../fixtures/index';
import { BookingPayload } from '../../utils/models/BookingPayload';
import { BookingFilterParams } from '../../api/BookingApiClient';

test('create new booking and retreive it', { tag: '@smoke' }, async ({ bookingApiClient, newBooking, trackedBooking }) => {
    
    const { id, response } = await trackedBooking(newBooking);
    expect(response.status()).toBe(200)
    expect(id).toBeDefined();

    const responseGet = await bookingApiClient.getBookingById(id)
    expect(responseGet.status()).toBe(200)

    const jsonGet = await responseGet.json()
    expect(jsonGet).toEqual(newBooking);
})

test('create new booking and delete it', { tag: '@smoke' }, async ({ bookingApiClient, newBooking, trackedBooking }) => {
    
    const { id, response } = await trackedBooking(newBooking);
    expect(response.status()).toBe(200)
    expect(id).toBeDefined();

    const responseDelete = await bookingApiClient.deleteBooking(id)

    expect(responseDelete.status()).toBe(201)

    const responseGet = await bookingApiClient.getBookingById(id)
    expect(responseGet.status()).toBe(404)
})

test('create new booking and fully update it', { tag: '@smoke' }, async ({ bookingApiClient, newBooking, trackedBooking }) => {
    
    const { id, response } = await trackedBooking(newBooking);
    expect(response.status()).toBe(200)
    expect(id).toBeDefined();

    const newBookingData = BookingPayload.createDefault({firstname: "test", lastname: "test", totalprice: 222, depositpaid: false, bookingdates: {checkin: '2026-12-01', checkout: '2026-12-11'}, additionalneeds: "Dinner"})

    const responseUpdate = await bookingApiClient.updateBooking(id, newBookingData)

    expect(responseUpdate.status()).toBe(200)

    const responseGet = await bookingApiClient.getBookingById(id)
    expect(responseGet.status()).toBe(200)

    const jsonGet = await responseGet.json()
    expect(jsonGet).toEqual(newBookingData);
})

test('create new booking and partially update it', { tag: '@smoke' }, async ({ bookingApiClient, newBooking, trackedBooking }) => {
    
    const { id, response } = await trackedBooking(newBooking);
    expect(response.status()).toBe(200)
    expect(id).toBeDefined();

    const responseUpdate = await bookingApiClient.partialUpdateBooking(id, {firstname: 'test', lastname: 'test'})
    expect(responseUpdate.status()).toBe(200)

    const responseGet = await bookingApiClient.getBookingById(id)
    expect(responseGet.status()).toBe(200)

    const jsonGet = await responseGet.json()
    expect(jsonGet.firstname).toEqual("test");
    expect(jsonGet.lastname).toEqual("test");
})

test('create new bookings and filter them', { tag: '@smoke' }, async ({ bookingApiClient, trackedBooking }) => {
    
    const newBookingData1 = BookingPayload.createDefault({firstname: "test", lastname: "test", totalprice: 222, depositpaid: false, bookingdates: {checkin: '2026-12-01', checkout: '2026-12-11'}, additionalneeds: "Dinner"})
    const newBookingData2 = BookingPayload.createDefault({firstname: "test", lastname: "test", totalprice: 222, depositpaid: false, bookingdates: {checkin: '2026-12-01', checkout: '2026-12-11'}, additionalneeds: "Dinner"})

    const booking1 = await trackedBooking(newBookingData1)
    expect(booking1.response.status()).toBe(200)
    expect(booking1.id).toBeDefined();

    const booking2 = await trackedBooking(newBookingData2)
    expect(booking2.response.status()).toBe(200)
    expect(booking2.id).toBeDefined();

    const nameFilter: BookingFilterParams = {
        firstname: 'test',
        lastname: 'test'
    };

    const responseGetDates = await bookingApiClient.getBookingIds(nameFilter)
    expect(responseGetDates.status()).toBe(200)

    const jsonGet = await responseGetDates.json()

    expect(jsonGet).toEqual(
        expect.arrayContaining([
            { bookingid: booking1.id },
            { bookingid: booking2.id }
        ])
    );
})