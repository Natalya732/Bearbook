import React from "react";
import { InputText } from "primereact/inputtext";
const Profile: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col gap-3 bg-red-100">
      <div className="header p-4 h-20 bg-green-100 flex justify-between items-center">
        <span className="text-4xl font-bold">Welcome Nikita Pandey</span>
        <a className="text-blue-800 font-bold"> + Follow</a>
      </div>

      <div className="body flex gap-3 p-5">
        <div className="profile-image flex flex-col items-center flex-1 gap-4">
          <h1 className="text-2xl font-bold">Your Profile</h1>
          <img className="flex-grow w-40 p-4 h-40"></img>
        </div>
        <div className="profile-section grid grid-cols-2 flex-3 gap-5 w-full">
          <div className="flex flex-col gap-2 border-x-orange-500">
            <label>Name</label>
            <InputText/>
          </div>
          <div className="flex flex-1 flex-col gap-2 min-w border-x-orange-500 ">
            <label>Type</label>
            <InputText></InputText>
          </div>
          <div className="flex flex-1 flex-col gap-2 min-w border-x-orange-500 ">
            <label>Github</label>
            <InputText className="bg-blue-400"></InputText>
          </div>
          <div className="flex flex-1 flex-col gap-2 min-w border-x-orange-500 ">
            <label>LinkedIn</label>
            <InputText className="bg-blue-400"></InputText>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
