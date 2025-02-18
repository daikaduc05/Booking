package org.example.bookingphoto.service;

import org.example.bookingphoto.dto.PackageShowDTO;
import org.example.bookingphoto.dto.ProductCreateDTO;
import org.example.bookingphoto.dto.ProductEditDTO;
import org.example.bookingphoto.dto.ProductShowDTO;
import org.example.bookingphoto.model.Product;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IProductService {
    List<ProductShowDTO> showProductByPackage(Integer packageId);

    void create (Integer packageId, ProductCreateDTO productCreateDTO);


    Product update(Integer packageId, Integer productId, ProductEditDTO productEditDTO);

    void delete(Integer packageId, Integer productId);
}
