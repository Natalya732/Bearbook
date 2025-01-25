import { gql } from "@apollo/client";


   export const GET_ALL_USER = gql`
   query GetAllUsers{
   users {
     name
     }
    }
`;


   export const GET_USER = gql`
   query GetUser($id: ID!) {
     user(id: $id) {
       name
       email
       age
     }
   }
 `;