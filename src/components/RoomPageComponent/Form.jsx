import React, { useState } from "react";
import { ArrowLeft, Plus, X, Users, Mail, Home } from "lucide-react"; // Assuming you use lucide-react, or replace with FontAwesome

const CreateRoomForm = () => {
  // State to handle the UI interaction for adding members
  const [members, setMembers] = useState([]);
  const [emailInput, setEmailInput] = useState("");

  const handleAddMember = (e) => {
    e.preventDefault();
    if (emailInput && !members.includes(emailInput)) {
      setMembers([...members, emailInput]);
      setEmailInput("");
    }
  };

  const removeMember = (email) => {
    setMembers(members.filter((m) => m !== email));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* --- Header Section --- */}
        <div className="mb-8">
          {/* Dashboard Back Button - Styled as a 'Ghost' button for subtlety */}
          <button className="group flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-4">
            <div className="mr-2 p-1 rounded-full group-hover:bg-gray-200 transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            Back to Dashboard
          </button>

          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Create Family Room
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Set up a dedicated space to share moments with your loved ones.
          </p>
        </div>

        {/* --- Main Card --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <form className="p-6 sm:p-8 space-y-8">
            
            {/* 1. Room Details Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Room Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Home className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    placeholder="e.g., The Smith Family"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows="3"
                  className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none"
                  placeholder="What is this room for? (e.g., Vacation planning, Daily chat)"
                />
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* 2. Invite Members Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Invite Members
                  </h3>
                  <p className="text-sm text-gray-500">
                    Add family members by email address.
                  </p>
                </div>
                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full text-nowrap">
                  {members.length} Added
                </span>
              </div>

              {/* Input Area */}
              <div className="flex gap-3">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter email address"
                  />
                </div>
                <button
                  onClick={handleAddMember}
                  className="flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="w-5 h-5 mr-1" />
                  Add
                </button>
              </div>

              {/* Added Members List (Visual Feedback) */}
              {members.length > 0 && (
                <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <ul className="space-y-2">
                    {members.map((email, index) => (
                      <li key={index} className="flex items-center justify-between bg-white p-2 rounded-md shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                            {email.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm text-gray-700 font-medium">{email}</span>
                        </div>
                        <button
                          onClick={() => removeMember(email)}
                          className="text-gray-400 hover:text-red-500 p-1 hover:bg-red-50 rounded transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 3. Form Footer */}
            <div className="pt-4">
              <button className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform active:scale-[0.99]">
                Create Room
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRoomForm;