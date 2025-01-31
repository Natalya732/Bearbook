import envs from "@/configs/envs";
import Supabase, { SUPABASE_GRAPHQL_ENDPOINT } from "@utils/supabase";

export async function fetchGraphQL(userId: string) {
  const query = `
    query GetPostsByUser($userId: ID!) { 
      postsCollection(filter: { userId: { eq: $userId } }) { 
        edges { 
          node { 
            id 
            username
            content
            imageUrl
          } 
        } 
      } 
    }
  `;

  const variables = { userId };

  const response = await fetch(SUPABASE_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: envs.SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({ query, variables }),
  });

  const result = await response.json();

  return result.data.postsCollection.edges;
}
export async function createUserProfile(id: string, email: string, created_at: string) {
  try {
    const mutation = `
      mutation createUser($id: uuid!, $email: String!, $created_at: timestamptz!) {
        insertIntoUserCollection(objects: [{ id: $id, email: $email, created_at: $created_at }]) {
          affectedCount
          records {
            id
            email
            created_at
          }
        }
      }
    `;

    const variables = {
      id,
      email,
      created_at,
    };

    const response = await fetch(SUPABASE_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: envs.SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ query: mutation, variables }),
    });

    const result = await response.json();
    console.log("user", result);

    return result;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
}

