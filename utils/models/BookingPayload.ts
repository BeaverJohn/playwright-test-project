export interface BookingDates {
    checkin: string;
    checkout: string;
}

export class BookingPayload {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: BookingDates;
    additionalneeds?: string;

    constructor(firstname: string, lastname: string, totalprice: number, depositpaid: boolean, bookingdates: BookingDates, additionalneeds?: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.totalprice = totalprice;
        this.depositpaid = depositpaid;
        this.bookingdates = bookingdates;
        this.additionalneeds = additionalneeds;
    }


    static createDefault(overrides?: Partial<BookingPayload>): BookingPayload {
        return new BookingPayload(
            overrides?.firstname ?? 'Jim',
            overrides?.lastname ?? 'Brown',
            overrides?.totalprice ?? 111,
            overrides?.depositpaid ?? true,
            overrides?.bookingdates ?? {
                checkin: '2026-08-01',
                checkout: '2026-08-05'
            },
            overrides?.additionalneeds ?? 'Breakfast'
        );
    }
}