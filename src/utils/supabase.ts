import { createClient } from "@supabase/supabase-js";

import envs from "@/configs/envs";

export enum TABLES {
  USERS = "users",
  POSTS = "posts",
  FOLLOWERS = "followers",
}

const Supabase = createClient(
  envs.SUPABASE_PROJECT_URL,
  envs.SUPABASE_ANON_KEY
);

export default Supabase;
