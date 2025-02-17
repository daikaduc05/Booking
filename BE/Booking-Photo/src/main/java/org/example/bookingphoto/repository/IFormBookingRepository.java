package org.example.bookingphoto.repository;

import org.example.bookingphoto.dto.FormBookingShowDTO;
import org.example.bookingphoto.model.FormBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IFormBookingRepository extends JpaRepository<FormBooking, Integer> {
    @Query(value = "SELECT new org.example.bookingphoto.dto.FormBookingShowDTO(fb.id, fb.location, fb.email, fb.name, fb.message, fb.createAt, fb.bookTime, fb.status, p.id, p.name) from FormBooking as fb left join Package as p on fb.packageField.id = p.id")
    List<FormBookingShowDTO> showFormBookings();
}