import envs from "@/configs/envs";
import { SUPABASE_GRAPHQL_ENDPOINT } from "@utils/supabase";

export async function getUserDetails(userId: string) {
  const query = ` 
    query($userId: UUID!) {  # ✅ Define the type properly
      userCollection(filter: { id: { eq: $userId } }) {
        edges {
          node {
            id
            followers
            bio
            github
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
  return result.data.userCollection.edges;
}

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
  // 550e8400-e29b-41d4-a716-446655440000

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

export async function createUserProfile(
  id: string,
  email: string,
  created_at: string
) {
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

    return result;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
}
