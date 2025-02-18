package org.example.bookingphoto.controller;

import org.example.bookingphoto.dto.PackageCreateDTO;
import org.example.bookingphoto.dto.PackageEditDTO;
import org.example.bookingphoto.dto.PackageShowDTO;
import org.example.bookingphoto.model.Package;
import org.example.bookingphoto.service.IPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
//
import java.util.List;

@RestController
@RequestMapping("/packages")
@CrossOrigin("*")
public class PackageController {
    @Autowired
    private IPackageService packageService;

    @GetMapping("")
    public ResponseEntity<List<PackageShowDTO>> showPackages () {
        List<PackageShowDTO> packageShowDTOList = packageService.showPackages();
        return new ResponseEntity<>(packageShowDTOList, HttpStatus.OK);
    }

    @PostMapping("create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> create (@RequestBody PackageCreateDTO packageCreateDTO) {
        packageService.create(packageCreateDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Package> update (@PathVariable("id") Integer id, @RequestBody PackageEditDTO packageEditDTO) throws Exception {
        Package updatePackage = packageService.edit(id, packageEditDTO);
        return new ResponseEntity<>(updatePackage, HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Package> delete (@PathVariable("id") Integer id) throws Exception {
        packageService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
