package org.example.bookingphoto.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PackageShowDTO {
    private Integer packageId;
    private String name;
    private Integer price;
    private String description;
}
