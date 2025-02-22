package org.example.bookingphoto.repository;

import org.example.bookingphoto.dto.PackageShowDTO;
import org.example.bookingphoto.dto.ProductShowDTO;
import org.example.bookingphoto.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IProductRepository extends JpaRepository<Product, Integer> {
    @Query(value = "SELECT new org.example.bookingphoto.dto.ProductShowDTO(pr.id, pr.image, p.id) from Product as pr left join Package as p on pr.packageField.id = p.id where p.id = :packageId")
    List<ProductShowDTO> showProductByPackage(@Param("packageId") Integer packageId);

    @Query(value = "SELECT new org.example.bookingphoto.dto.ProductShowDTO(pr.id, pr.image, p.id) from Product as pr left join Package as p on pr.packageField.id = p.id")
    List<ProductShowDTO> showProducts();
}