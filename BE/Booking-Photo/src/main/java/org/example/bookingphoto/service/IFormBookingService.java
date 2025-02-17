package org.example.bookingphoto.service;

import org.example.bookingphoto.dto.FormBookingCreateDTO;
import org.example.bookingphoto.dto.FormBookingShowDTO;
import org.example.bookingphoto.model.FormBooking;

import java.util.List;

public interface IFormBookingService {
    void create (Integer packageId, FormBookingCreateDTO formBookingCreateDTO);
    List<FormBookingShowDTO> showFormBookings();

    FormBooking findById(Integer id);

    void approveFormBooking(Integer formBookingId);

    void delete(Integer formBookingId);
//    void approveFormBooking ()
}
