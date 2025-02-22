import React from "react";
import Skeleton from "react-loading-skeleton"; 

const LoadingSkeletonPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <Skeleton height={50} width={300} />
      <Skeleton height={300} width={300} className="mt-4" /> 
    </div>
  );
};

export default LoadingSkeletonPage;
