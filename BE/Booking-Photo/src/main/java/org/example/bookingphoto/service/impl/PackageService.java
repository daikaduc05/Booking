package org.example.bookingphoto.service.impl;

import org.example.bookingphoto.dto.PackageCreateDTO;
import org.example.bookingphoto.dto.PackageEditDTO;
import org.example.bookingphoto.model.Package;
import org.example.bookingphoto.repository.IPackageRepository;
import org.example.bookingphoto.service.IPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class PackageService implements IPackageService {
    @Autowired
    private IPackageRepository packageRepository;



    @Override
    public void create (PackageCreateDTO packageCreateDTO) {
        Package newPackage = new Package();
        newPackage.setName(packageCreateDTO.getName());
        newPackage.setPrice(packageCreateDTO.getPrice());
        newPackage.setDescription(packageCreateDTO.getDescription());
        packageRepository.save(newPackage);
    }

    @Override
    public Package edit(Integer id, PackageEditDTO packageEditDTO) {
        Optional<Package> optionalPackage = packageRepository.findById(id);
        if (optionalPackage.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Package not found with id " + id);
        }
        Package editPackage = optionalPackage.get();
        editPackage.setName(packageEditDTO.getName());
        editPackage.setDescription(packageEditDTO.getDescription());
        editPackage.setPrice(packageEditDTO.getPrice());
        return packageRepository.save(editPackage);
    }

    @Override
    public Package findById(Integer id) {
        return packageRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(Integer id) {
        Optional<Package> optionalPackage = packageRepository.findById(id);
        if (optionalPackage.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Package not found with id " + id);
        }
        Package aPackage = optionalPackage.get();

        packageRepository.delete(aPackage);
    }
}
