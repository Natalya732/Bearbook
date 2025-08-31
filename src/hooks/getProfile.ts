import { useEffect, useState } from "react";
import { fetchUserProfile } from "@/services/UserApi";
import { ProfileData } from "@utils/definitions";

type hookReturnType = {
  profile: ProfileData & { userFile: null | File };
  isLoading: boolean;
};

export const useGetProfile = (userId: string): hookReturnType => {
  const [profile, setProfile] = useState<
    ProfileData & { userFile: null | File }
  >({} as ProfileData & { userFile: null | File });
  const [isLoading, setIsLoading] = useState(false);

  async function getUserProfile(userId: string) {
    setIsLoading(true);
    const data = await fetchUserProfile(userId);
    if (data) {
      setProfile({ ...data, userFile: null });
    }
    setIsLoading(false);
  }


  useEffect(() => {
    getUserProfile(userId);
  }, [userId]);
  
  return { profile, isLoading };
};
