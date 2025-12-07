import { gql } from "apollo-server-express";
export const typeDefsUser = gql`
  type User {
    id: ID!
    email: String
    fullName: String
    token: String
    code: Int
    message: String
  }
  input RegisterInput {
    email: String
    password: String
    fullName: String
  }
  input LoginUser {
    email: String
    password: String
  }

  type Query {
    getUser: User
  }

  type Mutation {
    createUser(user: RegisterInput): User
    loginUser(user: LoginUser): User
  }
`;
