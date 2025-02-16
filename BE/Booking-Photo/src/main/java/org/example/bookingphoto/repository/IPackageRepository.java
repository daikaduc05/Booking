package org.example.bookingphoto.repository;

import org.example.bookingphoto.dto.PackageCreateDTO;
import org.example.bookingphoto.model.Package;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPackageRepository extends JpaRepository<Package, Integer> {
}