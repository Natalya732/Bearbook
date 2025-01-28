import envs from "@/configs/envs";
import  { SUPABASE_GRAPHQL_ENDPOINT } from "@utils/supabase";

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

