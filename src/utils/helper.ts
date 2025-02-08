import supabase from "./supabase";

export function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function uploadImage(file: File, bucket: string) {
  let response = {
    data: null as any,
    error: "",
    success: false,
  };

  if (!file) {
    response.error = "No file is selected";
    return response;
  }

  if (!file.name.toLowerCase().endsWith(".jpg")) {
    response.error = "Only JPG files are allowed";
    return response;
  }

  const { data: user, error: authError } = await supabase.auth.getUser();
  if (!user || authError) {
    response.error = "Only authenticated users are allowed to upload images.";
    return response;
  }

  const filePath = `${Date.now()}_${file.name}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    response.error = `Upload failed: ${error.message}`;
  } else {
    response.data = data;
    response.success = true;
  }
  console.log("upload image", response);
  return response;
}
