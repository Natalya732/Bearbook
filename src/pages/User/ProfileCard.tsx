import EditComponent from "./EditUser";
import { GitHub, Linkedin, Mail, MapPin } from "react-feather";

export default function ProfileCard() {
  return (
    <div className="profile h-fit mt-28 p-10 rounded shadow-lg">
      <div className="upper_segment flex gap-6">
        <div
          className="imageContainer
          border-white max-h-32 min-w-32 border-4 rounded-full
        "
        >
          <input style={{ display: "none" }} />
          <img></img>
        </div>
        <div className="personalData w-full flex-col gap-5">
          <div className="flex w-full justify-between">
            <div className="title_role mt-4">
              <EditComponent
                isEdit={false}
                value="Nikita pandey"
                field="name"
                styles="main-title tracking-wider text-3xl font-bold"
                inputStyle="text-3xl font-bold border-white mr-2 border rounded pxf-2"
                onUpdate={() => {}}
                // onUpdate={onValueChange}
              />

              <EditComponent
                isEdit={false}
                value={"adfa"}
                field="role"
                styles="text-lg text-gray-100"
                inputStyle="text-lg text-gray-600 border-white border rounded px-2 mt-2"
                onUpdate={() => {}}
              />
            </div>
            <div className="location_otherDetai flex gap-5">
              <span className="flex gap-2">
                <MapPin />
                <EditComponent
                  isEdit={false}
                  value={"India"}
                  field="location"
                  styles=""
                  inputStyle="p-2 w-full"
                  onUpdate={() => {}}
                />
              </span>
              <span>{0} Followers</span>
              <span>{0} Following</span>
            </div>
          </div>
          <EditComponent
            isEdit={false}
            value={
              "lorem asdlfjas lasdjfla sd asdflasjdfl asdflasjldfalsdfjas ldfasld flaskd flasjdflsajkdf dlfjas lasdjfla sd asdflasjdfl asdflasjldfalsdfjas ldfasld flaskd flasjdflsajkdf"
            }
            field="bio"
            styles="description text-zinc-400 mt-10"
            inputStyle="w-full text-gray-700 border rounded p-2"
            onUpdate={() => {}}
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
                  isEdit={false}
                  value={"email"}
                  field="email"
                  inputStyle=" text-gray-700 border rounded p-2"
                  styles=""
                  onUpdate={() => {}}
                />
              </span>
            </div>
          </div>
          <div
            className="flex flex-1 flex-col gap-5 flex-start
      "
          >
            <h2 className="text-lg font-bold">Social Links</h2>
            <div className="flex gap-4 pl-4">
              <GitHub />{" "}
              <span>
                <EditComponent
                  isEdit={false}
                  value={"Asdfasdf"}
                  field="github"
                  styles=""
                  inputStyle="text-gray-700 border rounded p-2"
                  onUpdate={() => {}}
                />
              </span>
            </div>
            <div className="flex gap-4 pl-3">
              <Linkedin />{" "}
              <span>
                <EditComponent
                  isEdit={false}
                  value={"adfasdf"}
                  field="linkedIn"
                  styles=""
                  inputStyle="text-gray-700 border rounded p-2"
                  onUpdate={() => {}}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
{
  /* <div className="flex gap-6 p-10 rounded">
        <div
          className="flex-1 m-5 h-32 max-w-32 border-white border-4 rounded-full"
          onClick={() => imgRef.current && imgRef.current?.click()}
        >
          {isEditing ? (
            <div>
              <input
                className="h-32 w-32 rounded-full object-cover"
                type="file"
                ref={imgRef}
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files || null;
                  if (file && file.length) {
                    console.log("E", file[0]);
                    setEditedProfileData((prev) => ({
                      ...prev,
                      userFile: file[0],
                    }));
                  }
                }}
              />
            </div>
          ) : (
            <img
              src={profileData.profileImage}
              className="h-full w-full rounded-full object-cover"
            ></img>
          )}
        </div>
        <div className="flex flex-col flex-1 w-full p-4">
          <div className="flex justify-between text-white">
            <div className="title mt-4">
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
            <div className="float-right flex gap-6">
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
              <span>{profileData.followers || 0} Followers</span>
              <span>{profileData.following || 0} Following</span>
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
      <div className="text-zinc-700 w-full p-8">
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
          <div
            className="flex flex-1 flex-col gap-5 flex-start
      "
          >
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
      </div> */
}
