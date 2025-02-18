package org.example.bookingphoto.service.impl;

import org.example.bookingphoto.dto.ProductCreateDTO;
import org.example.bookingphoto.dto.ProductEditDTO;
import org.example.bookingphoto.dto.ProductShowDTO;
import org.example.bookingphoto.model.Package;
import org.example.bookingphoto.model.Product;
import org.example.bookingphoto.repository.IPackageRepository;
import org.example.bookingphoto.repository.IProductRepository;
import org.example.bookingphoto.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService implements IProductService {
    @Autowired
    private IProductRepository productRepository;
    @Autowired
    private IPackageRepository packageRepository;

    @Override
    public List<ProductShowDTO> showProductByPackage(Integer packageId) {
        return productRepository.showProductByPackage(packageId);
    }

    @Override
    public void create(Integer packageId, ProductCreateDTO productCreateDTO) {
        Package aPackage = packageRepository.findById(packageId).orElse(null);
        if (aPackage == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Package not found with id " + packageId);
        }
        Product newProduct = new Product();
        newProduct.setPackageField(aPackage);
        newProduct.setImage(productCreateDTO.getImage());
        productRepository.save(newProduct);
    }
    @Override
    public Product update(Integer packageId, Integer productId, ProductEditDTO productEditDTO) {
        Optional<Package> optionalPackage = packageRepository.findById(packageId);
        if (optionalPackage.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Package not found with id " + packageId);
        }
        Package aPackage = optionalPackage.get();
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found with id " + productId);
        }
        Product updateProduct = optionalProduct.get();
        updateProduct.setPackageField(aPackage);
        updateProduct.setImage(productEditDTO.getImage());
        return productRepository.save(updateProduct);
    }

    @Override
    public void delete(Integer packageId, Integer productId) {
        Package aPackage = packageRepository.findById(packageId).orElse(null);
        if (aPackage == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Package not found with id " + packageId);
        }
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found with id " + productId);
        }
        Product product = optionalProduct.get();
        productRepository.delete(product);
    }
}
