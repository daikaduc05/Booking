"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";


const Login = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();
  const params = useParams();
  useEffect(() => {
    console.log(params.locale);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      name,
      pass,
    }
    const res = await axios.post("https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/formBookings/create/1/admin/login", {
      data,
    });
    if (res) {
      Cookies.set("key", res.data.key, { expires: 1 / 24 });
      router.push(`${params.locale}/admin`);
      toast.success("Login success");
    } else {
      toast.error("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <p>Tên tài khoản</p>
              <input
                type="text"
                placeholder="Nhập tài khoản"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <p>Mật khẩu</p>
              <input
                type="text"
                placeholder="Nhập tài khoản"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white mt-2 py-2 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
