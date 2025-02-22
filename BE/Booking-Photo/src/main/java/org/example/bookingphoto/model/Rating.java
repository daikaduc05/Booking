package org.example.bookingphoto.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "ratings")
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotNull
    @Column(name = "rating_index", nullable = false)
    private Integer ratingIndex;

    @Size(max = 255)
    @NotNull
    @Nationalized
    @Column(name = "email", nullable = false)
    private String email;

    @Size(max = 255)
    @NotNull
    @Nationalized
    @Column(name = "ip_user", nullable = false)
    private String ipUser;

    @NotNull
    @Nationalized
    @Column(name = "content", nullable = false)
    private String content;

    @NotNull
    @Nationalized
    @Column(name = "create_at", nullable = false)
    private LocalDateTime createAt;

}