import React from "react";
import Navbar from "../(component)/navbar";
import Home from "../(element)/home";
import Explore from "../(element)/explore";
import Packages from "../(element)/packages";
import RatingForm from "../(element)/ratingForm";
import Footer from "../(element)/footer";
import { ToastContainer } from "react-toastify";

const page = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <Explore />
      <Packages />
      <RatingForm />
      <Footer />
      <ToastContainer />
    </div>
  );  
};

export default page;
