"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Login = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      router.push("/admin");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // debugger;
    e.preventDefault();
    const data = {
      username: user,
      password: pass,
    };

    try {
      const res = await axios.post(
        "https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/auth/authenticate",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res) {
        sessionStorage.setItem("token", res.data.token);
        router.push("/admin");
        Swal.fire({
          icon: "success",
          title: "Đăng nhập thành công",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Vui lòng kiểm tra lại tài khoản mật khẩu",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Vui lòng kiểm tra lại tài khoản mật khẩu",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Enter your username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
