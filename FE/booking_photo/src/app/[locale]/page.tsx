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
      <section id="home">
        <Home />
      </section>
      <section id="discover">
        <Explore />
      </section>
      <section id="packages">
        <Packages />
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
