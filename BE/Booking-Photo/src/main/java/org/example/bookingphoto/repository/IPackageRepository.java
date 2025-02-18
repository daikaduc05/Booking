package org.example.bookingphoto.repository;

import org.example.bookingphoto.dto.FormBookingShowDTO;
import org.example.bookingphoto.dto.PackageCreateDTO;
import org.example.bookingphoto.dto.PackageShowDTO;
import org.example.bookingphoto.model.Package;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IPackageRepository extends JpaRepository<Package, Integer> {
    @Query(value = "SELECT new org.example.bookingphoto.dto.PackageShowDTO(p.id, p.name, p.price, p.description) from Package as p")
    List<PackageShowDTO> showPackages();
}