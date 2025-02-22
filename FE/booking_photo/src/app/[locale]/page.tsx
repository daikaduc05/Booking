"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../(component)/navbar";
import Home from "../(element)/home";
import Explore from "../(element)/explore";
import Packages from "../(element)/packages";
import RatingForm from "../(element)/ratingForm";
import Footer from "../(element)/footer";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { IPackages } from "@/model/packages";
import { IProduct, IProductShow } from "@/model/product";

const page = () => {
  const [packageList, setPackagesList] = useState<IPackages[]>([]);
  const [productItem, setProductItem] = useState<IProduct[]>([]);
  const [productShow, setProductShow] = useState<IProductShow[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const packagesResponse = await axios.get(
          "https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/packages"
        );
        const productsResponse = await axios.get(
          "https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/products"
        );
        setPackagesList(packagesResponse.data);
        setProductItem(productsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPackages();
  }, []);

  useEffect(() => {
    if (packageList.length > 0 && productItem.length > 0) {
      const productShowArray = generateProductShowArray(packageList, productItem);
      setProductShow(productShowArray);
    }
  }, [packageList, productItem]);

  const generateProductShowArray = (packages: IPackages[], products: IProduct[]): IProductShow[] => {
    const productShowArray: IProductShow[] = [];

    packages.forEach((packageItem) => {
      const packageProducts = products.filter(
        (product) => product.packageId === packageItem.id
      );

      if (packageProducts.length >= 3) {
        const productShow: IProductShow = {
          id: packageItem.id,
          title: packageItem.name,
          img: packageProducts.slice(0, 3).map((product) => product.img),
          packageId: packageItem.id,
        };
        productShowArray.push(productShow);
      }
    });

    return productShowArray;
  };

  return (
    <div>
      <Navbar />
      <section id="home">
        <Home />
      </section>
      <section id="discover">
        <Explore productShow={productShow} />
      </section>
      <section id="packages">
        <Packages packageList={packageList} />
      </section>
      <section id="reviews">
        <RatingForm />
      </section>
      <section id="contacts">
        <Footer />
      </section>
      <ToastContainer />
    </div>
  );
};

export default page;
