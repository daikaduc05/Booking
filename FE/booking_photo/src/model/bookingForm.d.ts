
export interface IBookingFormShow {
    formBookingId: number;  
    location?: string | null;  
    email: string;  
    name: string;  
    message?: string | null;  
    createAt: Date;  
    bookTime: Date;  
    status: boolean;  
    packageId: number;  
    packageName: string;  
    pricePackage: number;  
  }
  
  