package org.example.bookingphoto.controller;

import org.example.bookingphoto.dto.FormBookingApproveDTO;
import org.example.bookingphoto.dto.FormBookingCreateDTO;
import org.example.bookingphoto.dto.FormBookingShowDTO;
import org.example.bookingphoto.model.FormBooking;
import org.example.bookingphoto.service.IFormBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/formBookings")
public class FormBookingController {
    @Autowired
    private IFormBookingService formBookingService;

    @GetMapping("showAll")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<FormBookingShowDTO>> showFormBookings () {
        List<FormBookingShowDTO> formBookingShowDTOList = formBookingService.showFormBookings();
        return new ResponseEntity<>(formBookingShowDTOList, HttpStatus.OK);
    }

    @PostMapping("/create/{packageId}")
    public ResponseEntity<?> create (@PathVariable("packageId") Integer packageId, @RequestBody FormBookingCreateDTO formBookingCreateDTO) {
        FormBooking formBooking = formBookingService.create(packageId, formBookingCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(formBooking);
    }

    @PutMapping("/approve/{formBookingId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FormBookingApproveDTO> approveFormBooking (@PathVariable("formBookingId") Integer formBookingId) {
        FormBookingApproveDTO formBookingApproveDTO = formBookingService.approveFormBooking(formBookingId);
        return ResponseEntity.status(HttpStatus.OK).body(formBookingApproveDTO);
    }

    @DeleteMapping("/delete/{formBookingId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FormBooking> deleteFormBooking (@PathVariable("formBookingId") Integer formBookingId) {
        formBookingService.delete(formBookingId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
