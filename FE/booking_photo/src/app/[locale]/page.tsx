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
import { IPackages, IPackagesAdmin, IPackagesShow } from "@/model/packages";
import { IProduct, IProductShow } from "@/model/product";
const Page = () => {
  const [productShow, setProductShow] = useState<IProductShow[]>([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      
      try {
        const res = await axios.get(
          "https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/products",{
            headers: {
              "Content-Type": "application/json",
            }
          }
        );
        console.log(res.data);
        if (res) {
          setProductShow(res.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProducts();
  }, []);



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
        <Packages productShow={productShow} />
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

export default Page;
