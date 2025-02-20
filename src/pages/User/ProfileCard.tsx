import { useRef } from "react";
import EditComponent from "./EditUser";
import { GitHub, Linkedin, Mail, MapPin } from "react-feather";
import { ProfileData } from "@utils/definitions";

interface ProfileCardProps {
  editedProfileData: ProfileData;
  onValueChange: (f: string, val: string | File) => void;
  isEditing: boolean;
}

export default function ProfileCard({
  editedProfileData,
  onValueChange,
  isEditing,
}: ProfileCardProps) {
  const imgRef = useRef<HTMLInputElement>(null);

  return (
    <div className="profile text-zinc-800 h-fit mt-28 p-10 rounded shadow-lg">
      <div className="upper_segment flex items-center gap-6 w-full">
        <div
          className="imageContainer border-white h-32 w-36 aspect-square flex justify-center items-center border-4 rounded-full overflow-hidden"
          onClick={() => isEditing && imgRef.current && imgRef.current.click()}
        >
          <input
            style={{ display: "none" }}
            type="file"
            ref={imgRef}
            onChange={(e) => {
              const file = e.target.files || null;
              if (file && file.length) {
                onValueChange("userFile", file[0]);
              }
            }}
          />
          <img
            src={editedProfileData.profileImage}
            className="h-32 w-32 rounded-full object-cover flex-shrink-0"
          />
        </div>
        <div className="personalData w-full flex-col gap-5">
          <div className="flex w-full justify-between">
            <div className="title_role mt-4">
              <EditComponent
                isEdit={isEditing}
                value={editedProfileData.name}
                field="name"
                styles="main-title tracking-wider text-3xl font-bold"
                inputStyle="text-3xl font-bold border-white mr-2 border rounded pxf-2"
                onUpdate={onValueChange}
              />

              <EditComponent
                isEdit={isEditing}
                value={editedProfileData.role}
                field="role"
                styles="text-lg text-gray-100"
                inputStyle="text-lg text-gray-600 border-white border rounded px-2 mt-2"
                onUpdate={onValueChange}
              />
            </div>
            <div className="location_otherDetai flex gap-5">
              <span className="flex gap-2">
                <MapPin />
                <EditComponent
                  isEdit={isEditing}
                  value={editedProfileData.location}
                  field="location"
                  styles=""
                  inputStyle="p-2 w-full"
                  onUpdate={onValueChange}
                />
              </span>
              <span>{0} Followers</span>
              <span>{0} Following</span>
            </div>
          </div>
          <EditComponent
            isEdit={isEditing}
            value={editedProfileData.bio}
            field="bio"
            styles="description text-zinc-400 mt-10"
            inputStyle="w-full text-gray-700 border rounded p-2"
            onUpdate={onValueChange}
          />
        </div>
      </div>
      <div className="lower_segment text-zinc-700 w-full p-8">
        <hr />
        <div className="flex justify-between  px-12 pt-6">
          <div className="flex flex-1 flex-col gap-3">
            <h2 className="text-lg font-bold">Contact Information</h2>
            <div className="flex gap-3">
              <Mail />{" "}
              <span>
                <EditComponent
                  isEdit={isEditing}
                  value={editedProfileData.email}
                  field="email"
                  inputStyle=" text-gray-700 border rounded p-2"
                  styles=""
                  onUpdate={onValueChange}
                />
              </span>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-5 flex-start">
            <h2 className="text-lg font-bold">Social Links</h2>
            <div className="flex gap-4 pl-4">
              <GitHub />{" "}
              <span>
                <EditComponent
                  isEdit={isEditing}
                  value={editedProfileData.github}
                  field="github"
                  styles=""
                  inputStyle="text-gray-700 border rounded p-2"
                  onUpdate={onValueChange}
                />
              </span>
            </div>
            <div className="flex gap-4 pl-3">
              <Linkedin />{" "}
              <span>
                <EditComponent
                  isEdit={isEditing}
                  value={editedProfileData.linkedIn}
                  field="linkedIn"
                  styles=""
                  inputStyle="text-gray-700 border rounded p-2"
                  onUpdate={onValueChange}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
