package org.example.bookingphoto.service;

import org.example.bookingphoto.dto.PackageCreateDTO;
import org.example.bookingphoto.dto.PackageEditDTO;
import org.example.bookingphoto.dto.PackageShowDTO;
import org.example.bookingphoto.dto.ProductShowDTO;
import org.example.bookingphoto.model.Package;

import java.util.List;

public interface IPackageService {
    Package create (PackageCreateDTO packageCreateDTO);

    Package edit(Integer id, PackageEditDTO packageEditDTO) throws Exception;

    void delete(Integer id) throws Exception;
    List<PackageShowDTO> showPackages();

}
