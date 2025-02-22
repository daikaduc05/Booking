package org.example.bookingphoto.service.impl;

import org.example.bookingphoto.dto.RatingCreateDTO;
import org.example.bookingphoto.dto.RatingShowDTO;
import org.example.bookingphoto.exception.MessageError;
import org.example.bookingphoto.exception.RatingAlreadyExistsException;
import org.example.bookingphoto.model.Rating;
import org.example.bookingphoto.repository.IRatingRepository;
import org.example.bookingphoto.service.IRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RatingService implements IRatingService {
    @Autowired
    private IRatingRepository ratingRepository;

    @Override
    public Rating create(RatingCreateDTO ratingCreateDTO) {
        if (ratingRepository.existsByIpUser(ratingCreateDTO.getIpUser())) {
            throw new ResponseStatusException (HttpStatus.BAD_REQUEST,
                    "Rating already exists with ip " + ratingCreateDTO.getIpUser());    
        }
        Rating rating = new Rating();
        rating.setEmail(ratingCreateDTO.getEmail());
        rating.setRatingIndex(ratingCreateDTO.getRatingIndex());
        rating.setContent(ratingCreateDTO.getContent());
        rating.setCreateAt(LocalDateTime.now());
        rating.setIpUser(ratingCreateDTO.getIpUser());
        return ratingRepository.save(rating);
    }

    @Override
    public Rating delete(Integer ratingId) {
        Optional<Rating> optionalRating = ratingRepository.findById(ratingId);
        if (optionalRating.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Rating not found with id " + ratingId);
        }
        Rating rating = optionalRating.get();
        ratingRepository.delete(rating);
        return rating;
    }


    @Override
//    @Transactional
    public List<RatingShowDTO> showRatings() {
        return ratingRepository.showRatings();
    }
}
