"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsUser = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefsUser = (0, apollo_server_express_1.gql) `
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
