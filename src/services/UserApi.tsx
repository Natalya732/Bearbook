import { ProfileData } from "@utils/definitions";
import supabase from "@utils/supabase";
import toast from "react-hot-toast";


export async function handleError(err: Error | any, errorString?: string) {
    let errorMsg =
        err instanceof Error
            ? err.message
            : errorString;
    errorMsg && toast.error(errorMsg);
}


export async function fetchUserProfile(userId: string): Promise<ProfileData | null> {
    try {
        const { data, error } = await supabase.from("User").select("*").eq("id", userId).single();

        if (error) {
            console.log(error.message);
            throw new Error(error.message);
        }

        return data || null;
    } catch (err) {
        handleError(err, "Something went wrong in fetching User Profile");
        return null;
    }
}


export async function updateUserTable({ userId, data }: { userId: string, data: ProfileData }) {
    try {
        console.log("entered function")
        const { error } = await supabase.from("User").update({
            ...data
        }).eq("id", userId);

        if (error) {
            toast.error(error.message)
            return null;
        }

        toast.success("Profile Updated Successfully!")
    } catch (err) {
        handleError(err, "Something went wrong in updating User Profile");
    }
}


export async function signOut() {
    try {
        const res = await supabase.auth.signOut();
        return res;
    } catch (err) {
        handleError(err, "Something went wrong in signing out");
    }
}

