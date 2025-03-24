import { Post } from "@utils/definitions";
import supabase from "@utils/supabase";
import toast from "react-hot-toast";
import { handleError } from "./UserApi";

interface postApiType {
    content: string,
    imageUrl: string,
    id: string,
    author: string,
}
console.log("have done api chnages")

export async function fetchAllPosts(userId: string): Promise<Post[] | null> {
    try {
        const { data: posts, error } = await supabase
            .from("User")
            .select(`name, profileImage, Posts (content, imageUrl, created_at,id)`)
            .order("created_at", {ascending : false})
            .eq("id", userId);

        if (error) throw new Error(error.message);

        const postsArray: Post[] = posts
            .map((item) => {
                return item.Posts.map((post) => ({
                    authorName: item.name,
                    authorImage: item.profileImage,
                    ...post,
                }));
            })
            .flat();

        return postsArray;
    } catch (err) {
        handleError(err, "Something went wrong in fetching User Posts");
        return null;
    }
}


export async function insertPost(newPost: postApiType, userId: string) {
    try {
        const { error, status } = await supabase
            .from("Posts")
            .insert([newPost]);

        if (error) throw new Error(error.message);
        if (status === 201) toast.success("Successfully Post created");
        console.log("userId", userId)
        await fetchAllPosts(userId);
    } catch (err) {
        handleError(err, "Something went wrong in creating Post");
        return null;
    }
}


export async function updatePost(post: postApiType) {
    try {
        const { error } = await supabase
            .from("Posts")
            .update({
                ...post,
            })
            .eq("id", post.id);

        if (error) {
            throw new Error(error.message);
            return null;
        }

    } catch (err) {
        handleError(err, "Something went wrong in updating your post");
    }
}


export async function deletePost(postId: string) {
    try {
        const { error } = await supabase.from("Posts").delete().eq("id", postId);
        if (error) {
            toast.error(error.message);
            return;
        }

    } catch (err) {
        handleError(err, "Something went wrong in deleting your post");
    }
}