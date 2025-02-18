export interface IBookingForm {
    location: string;
    email: string;
    name: string;
    bookTime: Date;
    note?: string;
}