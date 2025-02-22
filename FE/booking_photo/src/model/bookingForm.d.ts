export interface IBookingForm {
    location: string;
    email: string;
    name: string;
    bookTime: Date;
    note?: string;
    packageId : number;
}

export interface IBookingFormShow  {
    id : number;
    location : string;
    email : string;
    name : string;
    message : string;
    createdAt : Date;
    bookingTime : Date;
    status : boolean;
    packageId : number;
    packageName : string;
    packagePrice : number;
}