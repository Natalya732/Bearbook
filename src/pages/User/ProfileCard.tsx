import { useEffect, useRef, useState } from "react";
import EditComponent from "./EditUser";
import { GitHub, Linkedin, Mail, MapPin } from "react-feather";
import { ProfileData } from "@utils/definitions";
import { Button } from "@components/ui/button";

interface ProfileCardProps {
  editedProfileData: ProfileData & { userFile: null | File };
  onValueChange: (f: string, val: string | File) => void;
  isEditing: boolean;
  handleEditProfile: () => void;
  errors: Partial<
    Record<keyof ProfileData & { userFile: null | File }, string>
  >;
  handleCancel: () => void;
}

export default function ProfileCard({
  editedProfileData,
  onValueChange,
  isEditing,
  handleEditProfile,
  handleCancel,
  errors,
}: ProfileCardProps) {
  const imgRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (editedProfileData.userFile) {
      const objectUrl = URL.createObjectURL(editedProfileData.userFile);
      setImageUrl(objectUrl);
    }
  }, [editedProfileData.userFile]);

  return (
    <div
      className={`profile text-zinc-800 h-fit p-6 rounded shadow-lg ${
        isEditing
          ? "mt-14 bg-gradient-to-r from-blue-100 to-purple-100"
          : "mt-28"
      }`}
    >
      <div className="upper_segment flex items-center gap-6 w-full">
        <div
          className="imageContainer"
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
          <img src={imageUrl || editedProfileData.profileImage} />
        </div>
        <div className="personalData w-full flex-col gap-5">
          <div className="flex w-full justify-between">
            <div>
              <EditComponent
                isEdit={isEditing}
                value={editedProfileData.name}
                field="name"
                error={(errors as any)?.name ?? ""}
                styles="title"
                inputStyle=""
                onUpdate={onValueChange}
              />

              <EditComponent
                isEdit={isEditing}
                value={editedProfileData.role}
                field="role"
                error={(errors as any)?.role ?? ""}
                styles="role"
                inputStyle=""
                onUpdate={onValueChange}
              />
            </div>
            <div className="location_otherDetail flex gap-3 mt-auto text-sm">
              <span className="flex gap-1">
                <MapPin
                  className={`${isEditing ? "text-zinc-800" : "text-zinc-100"}`}
                />
                <EditComponent
                  isEdit={isEditing}
                  value={editedProfileData.location}
                  field="location"
                  styles="location"
                  error={(errors as any)?.location ?? ""}
                  inputStyle=""
                  onUpdate={onValueChange}
                />
              </span>
              {!isEditing && (
                <>
                  <span className="location">{0} Followers</span>
                  <span className="location">{0} Following</span>
                </>
              )}
            </div>
          </div>
          <EditComponent
            isEdit={isEditing}
            value={editedProfileData.bio}
            field="bio"
            error={(errors as any)?.bio ?? ""}
            styles="bio text-zinc-500"
            inputStyle=""
            onUpdate={onValueChange}
          />
        </div>
      </div>
      <div className="lower_segment text-zinc-700 w-full p-8">
        <hr />
        <div className="flex justify-between pt-6">
          <div className="flex flex-1 flex-col gap-3">
            <h2 className="text-lg font-bold">Contact Information</h2>
            <div className="flex gap-3">
              <Mail />
              <span>
                <EditComponent
                  isEdit={isEditing}
                  value={editedProfileData.email}
                  field="email"
                  error={(errors as any)?.email ?? ""}
                  inputStyle="text-gray-700 border rounded p-2"
                  styles="text-zinc-500"
                  onUpdate={onValueChange}
                />
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col pl-14 gap-5 flex-start">
            <h2 className="text-lg font-bold ">Social Links</h2>
            <div className="flex gap-4">
              <GitHub />
              <span>
                <EditComponent
                  isEdit={isEditing}
                  value={editedProfileData.github}
                  field="github"
                  error={(errors as any)?.github ?? ""}
                  styles="text-zinc-500"
                  inputStyle="text-gray-700 border rounded p-2"
                  onUpdate={onValueChange}
                />
              </span>
            </div>
            <div className="flex gap-4">
              <Linkedin />{" "}
              <span>
                <EditComponent
                  isEdit={isEditing}
                  value={editedProfileData.linkedIn}
                  field="linkedIn"
                  error={(errors as any)?.linkedIn ?? ""}
                  styles="text-zinc-500"
                  inputStyle="text-gray-700 border rounded p-2"
                  onUpdate={onValueChange}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      {isEditing && (
        <div className="flex gap-4 justify-center items-center float-right my-3">
          <span className="cursor-pointer" onClick={handleCancel}>
            Cancel
          </span>
          <Button onClick={handleEditProfile}>Save Profile</Button>
        </div>
      )}
    </div>
  );
}
