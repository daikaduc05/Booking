package org.example.bookingphoto.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serializable;

/**
 * DTO for {@link org.example.bookingphoto.model.Package}
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PackageCreateDTO {
    private Integer id;
    @NotNull
    @Size(max = 255)
    private String name;
    @NotNull
    private Integer price;
    @NotNull
    @Size(max = 500)
    private String description;
}