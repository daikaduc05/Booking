export interface IBookingForm {
    location: string;
    email: string;
    name: string;
    bookTime: Date;
    note?: string;
    packageId : number;
}

export interface IBookingFormShow {
    formBookingId: number;  // ID của booking form
    location?: string | null;  // Địa chỉ (có thể null hoặc không có)
    email: string;  // Email của người đặt
    name: string;  // Tên của người đặt
    message?: string | null;  // Tin nhắn (có thể null hoặc không có)
    createAt: Date;  // Thời gian tạo form booking
    bookTime: Date;  // Thời gian đặt
    status: boolean;  // Trạng thái (true - đã duyệt, false - chờ duyệt)
    packageId: number;  // ID của gói
    packageName: string;  // Tên gói
    pricePackage: number;  // Giá của gói (số tiền)
  }
  
  