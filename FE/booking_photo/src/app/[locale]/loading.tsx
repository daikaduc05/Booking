import React from "react";

const LoadingSpinnerPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-100 to-white p-4">
      <div className="flex flex-col justify-center items-center bg-white rounded-3xl shadow-lg p-8 space-y-6 w-full max-w-lg">
        {/* Spinner với màu sang trọng */}
        <div className="relative w-16 h-16 border-4 border-gray-300 border-t-amber-400 rounded-full animate-spin"></div>

        {/* Thêm một thông điệp hoặc tiêu đề */}
        <div className="mt-6">
          <p className="text-lg font-semibold text-gray-600">Loading, please wait...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinnerPage;
