package org.example.bookingphoto.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.example.bookingphoto.dto.RatingCreateDTO;
import org.example.bookingphoto.dto.RatingShowDTO;
import org.example.bookingphoto.exception.MessageError;
import org.example.bookingphoto.exception.RatingAlreadyExistsException;
import org.example.bookingphoto.model.Rating;
import org.example.bookingphoto.service.IRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ratings")
@CrossOrigin("*")
public class RatingController {
    @Autowired
    private IRatingService ratingService;

    @GetMapping("")
    public ResponseEntity<List<RatingShowDTO>> showRatings () {
        List<RatingShowDTO> ratingShowDTOList = ratingService.showRatings();
        return new ResponseEntity<>(ratingShowDTOList, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createRating(@RequestBody RatingCreateDTO ratingCreateDTO) {
        try {
            Rating rating = ratingService.create(ratingCreateDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(rating);
        } catch (RatingAlreadyExistsException ex) {
            MessageError messageError = new MessageError();
            messageError.setMessage(ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(messageError);
        }
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Rating> delete (@PathVariable("id") Integer id) {
        Rating rating = ratingService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
