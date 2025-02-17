package org.example.bookingphoto.service.impl;

import org.example.bookingphoto.dto.FormBookingCreateDTO;
import org.example.bookingphoto.dto.FormBookingShowDTO;
import org.example.bookingphoto.model.FormBooking;
import org.example.bookingphoto.model.Package;
import org.example.bookingphoto.repository.IFormBookingRepository;
import org.example.bookingphoto.repository.IPackageRepository;
import org.example.bookingphoto.service.IFormBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FormBookingService implements IFormBookingService {
    @Autowired
    private IFormBookingRepository formBookingRepository;
    @Autowired
    private IPackageRepository packageRepository;

    @Override
    public void create(Integer packageId, FormBookingCreateDTO formBookingCreateDTO) {
        Package aPackage = packageRepository.findById(packageId).orElse(null);
        if (aPackage == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Package not found with id " + packageId);
        }
        FormBooking formBooking = new FormBooking();
        formBooking.setPackageField(aPackage);
        formBooking.setLocation(formBookingCreateDTO.getLocation());
        formBooking.setEmail(formBookingCreateDTO.getEmail());
        formBooking.setName(formBookingCreateDTO.getName());
        formBooking.setCreateAt(LocalDateTime.now());
        formBooking.setBookTime(formBookingCreateDTO.getBookTime());
        formBooking.setStatus(false);
        formBooking.setMessage(formBookingCreateDTO.getMessage());
        formBookingRepository.save(formBooking);
    }

    @Override
    public List<FormBookingShowDTO> showFormBookings() {
        return formBookingRepository.showFormBookings();
    }

    @Override
    public FormBooking findById(Integer id) {
        return formBookingRepository.findById(id).orElse(null);
    }

    @Override
    public void approveFormBooking(Integer formBookingId) {
        FormBooking formBooking = formBookingRepository.findById(formBookingId).orElse(null);
        if (formBooking == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Package not found with id " + formBookingId);
        }
        formBooking.setStatus(true);
        formBookingRepository.save(formBooking);
    }
    @Override
    public void delete(Integer formBookingId) {
        Optional<FormBooking> optionalFormBooking = formBookingRepository.findById(formBookingId);
        if (optionalFormBooking.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Package not found with id " + formBookingId);
        }
        FormBooking formBooking = optionalFormBooking.get();
        formBookingRepository.delete(formBooking);
    }
}
