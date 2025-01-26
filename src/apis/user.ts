import Supabase, { TABLES } from "@utils/supabase";

export async function getUsers() {
  const res = await Supabase.from(TABLES.USERS).select();
  console.log(res);

  return res?.data;
}
