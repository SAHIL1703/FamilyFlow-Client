import React from "react";

const Working = () => {
  return (
    <>
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        {/* Subtitle / Eyebrow Text */}
        <p className="mb-3 text-lg font-bold uppercase tracking-wider text-blue-500">
          How It Works
        </p>

        {/* Main Heading */}
        <h2 className="mb-6 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
          Get Started in Minutes
        </h2>

        {/* Description */}
        <p className="mx-auto max-w-2xl text-lg text-gray-500">
          Setting up FamilyFlow is quick and easy. Have your whole family
          connected in just four simple steps.
        </p>
      </div>

      <div className="px-6 grid grid-col-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
        <div className="mx-auto flex flex-col items-center justify-center gap-4 p-4">
          {/* logo  */}
          <div className="w-20 h-20 border-4 border-blue-500 rounded-full flex items-center justify-center p-6 ">
            <i class="text-3xl text-blue-600 font-extrabold fa-regular fa-user"></i>
          </div>
          <div>
            <p className="mb-2 text-center font-bold text-xl">
              Create Your Account
            </p>
            <p className="text-gray-500 text-center">
              Sign up in seconds with just your email. No credit card required
              to get started.
            </p>
          </div>
        </div>

        <div className="mx-auto flex flex-col items-center gap-4 p-4">
          {/* logo  */}
          <div className="w-20 h-20 border-4 border-blue-500 rounded-full flex items-center justify-center p-6 ">
            <i class="text-3xl text-blue-600 font-extrabold fa-solid fa-plus"></i>
          </div>
          <div>
            <p className="mb-2 text-center font-bold text-xl">
              Invite Family Members
            </p>
            <p className="text-gray-500 text-center">
              Send invite links to your family. They can join with just one
              click.
            </p>
          </div>
        </div>

        <div className="mx-auto flex flex-col items-center gap-4 p-4">
          {/* logo  */}
          <div className="w-20 h-20 border-4 border-blue-500 rounded-full flex items-center justify-center p-6 ">
            <i class="text-3xl text-blue-600 font-extrabold fa-regular fa-user"></i>
          </div>
          <div>
            <p className="mb-2 text-center font-bold text-xl">Start Chatting</p>
            <p className="text-gray-500 text-center">
              Once everyone's in, start sharing messages, photos, and updates
              instantly.
            </p>
          </div>
        </div>

        <div className="mx-auto flex flex-col items-center gap-4 p-4">
          {/* logo  */}
          <div className="w-20 h-20 border-4 border-blue-500 rounded-full flex items-center justify-center p-6 ">
            <i class="text-3xl text-blue-600 font-extrabold fa-regular fa-user"></i>
          </div>
          <div>
            <p className="mb-2 text-center font-bold text-xl">
              Track & Connect
            </p>
            <p className="text-gray-500 text-center">
              See everyone's location on the map and stay connected wherever
              life takes you.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Working;
