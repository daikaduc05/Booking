package org.example.bookingphoto.service;

import org.example.bookingphoto.dto.FormBookingApproveDTO;
import org.example.bookingphoto.dto.FormBookingCreateDTO;
import org.example.bookingphoto.dto.FormBookingShowDTO;
import org.example.bookingphoto.model.FormBooking;

import java.util.List;

public interface IFormBookingService {
    FormBooking create (Integer packageId, FormBookingCreateDTO formBookingCreateDTO);
    List<FormBookingShowDTO> showFormBookings();
    FormBookingApproveDTO approveFormBooking(Integer formBookingId);

    void delete(Integer formBookingId);
}
