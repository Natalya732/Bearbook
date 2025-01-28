import { createClient } from "@supabase/supabase-js";

import envs from "@/configs/envs";

export enum TABLES {
  USERS = "User",
  POSTS = "Posts",
}

const Supabase = createClient(
  envs.SUPABASE_PROJECT_URL,
  envs.SUPABASE_ANON_KEY
);

export const SUPABASE_GRAPHQL_ENDPOINT = `${envs.SUPABASE_PROJECT_URL}/graphql/v1`;


export default Supabase;
