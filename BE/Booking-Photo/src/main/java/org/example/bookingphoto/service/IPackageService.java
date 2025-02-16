package org.example.bookingphoto.service;

import org.example.bookingphoto.dto.PackageCreateDTO;
import org.example.bookingphoto.dto.PackageEditDTO;
import org.example.bookingphoto.model.Package;

public interface IPackageService {
    void create (PackageCreateDTO packageCreateDTO);

    Package edit(Integer id, PackageEditDTO packageEditDTO) throws Exception;

    Package findById (Integer id);

//    void delete(Integer id, Package aPackage) throws Exception;

    void delete(Integer id) throws Exception;
//    void delete (Package aPackage);

}
