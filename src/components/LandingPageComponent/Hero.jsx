import React from "react";

const Hero = () => {
  return (
    <div className="w-full my-4 space-y-8 mt-12">
      {/* label */}
      <div className="border-blue-200 flex flex-row items-center justify-center text-sm mx-auto bg-blue-100 w-fit px-3 py-1 rounded-full space-x-1.5">
        <i className="text-blue-600 fa-solid fa-shield"></i>
        <p className="text-blue-500">Trusted by 100+ families worldwide</p>
      </div>

      {/* heading  */}
      <div className="text-center space-y-6">
        {/* heading text*/}
        <div className="">
          <h1 className="px-4 text-4xl md:text-5xl lg:text-8xl font-bold md:my-2">Keep Your Family</h1>
          <h1 className="px-4 text-4xl md:text-5xl lg:text-8xl font-bold md:my-2">
            <span className="text-blue-500">Connected</span> & <span className="text-amber-500">Safe</span>
          </h1>
        </div>

        {/* para text */}
        <div className="px-4 sm:px-8 md:px-16 lg:px-32 text-center">
          <p className="py-2 font-medium text-gray-500 md:text-xl lg:text-2xl">
            Create private family rooms, chat in real-time, and see where
            everyone is on the map. Stay connected with the people who matter most.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
