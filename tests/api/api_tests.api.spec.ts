import { expect, test } from '../../fixtures/index';
import { BookingPayload } from '../../utils/models/BookingPayload';
import { BookingFilterParams } from '../../api/BookingApiClient';

test('create new booking and retreive it', { tag: '@smoke' }, async ({ bookingApiClient, newBooking }) => {
    
    const responseCreate = await bookingApiClient.createBooking(newBooking)
    expect(responseCreate.status()).toBe(200)

    const jsonCreate = await responseCreate.json()
    const bookingId = jsonCreate.bookingid

    const responseGet = await bookingApiClient.getBookingById(bookingId)
    expect(responseGet.status()).toBe(200)

    const jsonGet = await responseGet.json()
    expect(jsonGet).toEqual(newBooking);
})

test('create new booking and delete it', { tag: '@smoke' }, async ({ bookingApiClient, newBooking }) => {
    
    const responseCreate = await bookingApiClient.createBooking(newBooking)
    expect(responseCreate.status()).toBe(200)

    const jsonCreate = await responseCreate.json()
    const bookingId = jsonCreate.bookingid

    const responseDelete = await bookingApiClient.deleteBooking(bookingId)

    expect(responseDelete.status()).toBe(201)

    const responseGet = await bookingApiClient.getBookingById(bookingId)
    expect(responseGet.status()).toBe(404)
})

test('create new booking and fully update it', { tag: '@smoke' }, async ({ bookingApiClient, newBooking }) => {
    
    const responseCreate = await bookingApiClient.createBooking(newBooking)
    expect(responseCreate.status()).toBe(200)

    const jsonCreate = await responseCreate.json()
    const bookingId = jsonCreate.bookingid

    const newBookingData = BookingPayload.createDefault({firstname: "test", lastname: "test", totalprice: 222, depositpaid: false, bookingdates: {checkin: '2026-12-01', checkout: '2026-12-11'}, additionalneeds: "Dinner"})

    const responseUpdate = await bookingApiClient.updateBooking(bookingId, newBookingData)

    expect(responseUpdate.status()).toBe(200)

    const responseGet = await bookingApiClient.getBookingById(bookingId)
    expect(responseGet.status()).toBe(200)

    const jsonGet = await responseGet.json()
    expect(jsonGet).toEqual(newBookingData);
})

test('create new booking and partially update it', { tag: '@smoke' }, async ({ bookingApiClient, newBooking }) => {
    
    const responseCreate = await bookingApiClient.createBooking(newBooking)
    expect(responseCreate.status()).toBe(200)

    const jsonCreate = await responseCreate.json()
    const bookingId = jsonCreate.bookingid

    const responseUpdate = await bookingApiClient.partialUpdateBooking(bookingId, {firstname: 'test', lastname: 'test'})

    expect(responseUpdate.status()).toBe(200)

    const responseGet = await bookingApiClient.getBookingById(bookingId)
    expect(responseGet.status()).toBe(200)

    const jsonGet = await responseGet.json()
    expect(jsonGet.firstname).toEqual("test");
    expect(jsonGet.lastname).toEqual("test");
})

test('create new bookings and filter them', { tag: '@smoke' }, async ({ bookingApiClient }) => {
    
    const newBookingData1 = BookingPayload.createDefault({firstname: "test", lastname: "test", totalprice: 222, depositpaid: false, bookingdates: {checkin: '2026-12-01', checkout: '2026-12-11'}, additionalneeds: "Dinner"})
    const newBookingData2 = BookingPayload.createDefault({firstname: "test", lastname: "test", totalprice: 222, depositpaid: false, bookingdates: {checkin: '2026-12-01', checkout: '2026-12-11'}, additionalneeds: "Dinner"})

    const responseCreate1 = await bookingApiClient.createBooking(newBookingData1)
    expect(responseCreate1.status()).toBe(200)
    const jsonCreate1 = await responseCreate1.json()
    const bookingId1 = jsonCreate1.bookingid

    const responseCreate2 = await bookingApiClient.createBooking(newBookingData2)
    expect(responseCreate2.status()).toBe(200)
    const jsonCreate2 = await responseCreate2.json()
    const bookingId2 = jsonCreate2.bookingid

    const nameFilter: BookingFilterParams = {
        firstname: 'test',
        lastname: 'test'
    };

    const responseGetDates = await bookingApiClient.getBookingIds(nameFilter)
    expect(responseGetDates.status()).toBe(200)

    const jsonGet = await responseGetDates.json()

    expect(jsonGet).toEqual(
        expect.arrayContaining([
            { bookingid: bookingId1 },
            { bookingid: bookingId2 }
        ])
    );
})