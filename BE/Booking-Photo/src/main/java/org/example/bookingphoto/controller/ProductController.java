package org.example.bookingphoto.controller;
import org.example.bookingphoto.dto.ProductCreateDTO;
import org.example.bookingphoto.dto.ProductEditDTO;
import org.example.bookingphoto.dto.ProductShowDTO;
import org.example.bookingphoto.model.Product;
import org.example.bookingphoto.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin("*")
public class ProductController {
    @Autowired
    private IProductService productService;

    @GetMapping("")
    public ResponseEntity<List<ProductShowDTO>> showProducts () {
        List<ProductShowDTO> productShowDTOList = productService.showProducts();
        return new ResponseEntity<>(productShowDTOList, HttpStatus.OK);
    }

    @GetMapping("/{packageId}")
    public ResponseEntity<List<ProductShowDTO>> showProductByPackage (@PathVariable("packageId") Integer packageId) {
        List<ProductShowDTO> productShowDTOList = productService.showProductByPackage(packageId);
        return new ResponseEntity<>(productShowDTOList, HttpStatus.OK);
    }

    @PostMapping("/create/{packageId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> create (@PathVariable("packageId") Integer packageId, @RequestBody ProductCreateDTO productCreateDTO) {
        Product product = productService.create(packageId, productCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(product);
    }

    @PutMapping("/update/{packageId}/{productId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> update (@PathVariable("packageId") Integer packageId, @PathVariable("productId") Integer productId, @RequestBody ProductEditDTO productEditDTO) {
        Product updateProduct = productService.update(packageId, productId, productEditDTO);
        return ResponseEntity.status(HttpStatus.OK).body(updateProduct);
    }

    @DeleteMapping("/delete/{packageId}/{productId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> delete (@PathVariable("packageId") Integer packageId, @PathVariable("productId") Integer productId) {
        productService.delete(packageId, productId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
