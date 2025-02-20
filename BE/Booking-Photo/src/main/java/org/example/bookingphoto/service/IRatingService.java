package org.example.bookingphoto.service;

import jakarta.servlet.http.HttpServletRequest;
import org.example.bookingphoto.dto.RatingCreateDTO;
import org.example.bookingphoto.dto.RatingShowDTO;
import org.example.bookingphoto.model.Rating;

import java.util.List;

public interface IRatingService {
    void create(RatingCreateDTO ratingCreateDTO, String ipUser);

    Rating delete(Integer ratingId);
    List<RatingShowDTO> showRatings();
}
