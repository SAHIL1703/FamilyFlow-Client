import React from "react";

const Buttons = () => {
  return (
    <div className="mx-4 sm:mx-auto flex flex-col sm:flex-row justify-center items-center gap-4 my-8 ">
      <button className="cursor-pointer flex gap-1 justify-center items-center w-full sm:flex sm:items-center sm:justify-center sm:w-60 px-6 py-2.5 bg-blue-500 text-white font-semibold rounded-md shadow-lg hover:bg-blue-600 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200">
        Sign In
        <i className="fa-solid fa-arrow-right"></i>
      </button>

      <button className="cursor-pointer w-full sm:w-60 px-6 py-2.5 border-2 border-blue-500 rounded-md  font-semibold text-blue-500 hover:bg-blue-50 hover:border-blue-600 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 ">
        See How It Works
      </button>
    </div>
  );
};

export default Buttons;
