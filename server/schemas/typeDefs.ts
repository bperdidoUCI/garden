import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type SavedPlant {
    _id: ID!
    userId: ID!
    trefleId: String!
    nickname: String
    location: String
    imageUrl: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    me: User
    getSavedPlantsByUser(userId: ID!): [SavedPlant]
    getSavedPlantById(id: ID!): SavedPlant
  }

  type Mutation {
    addSavedPlant(trefleId: String!, nickname: String, location: String, imageUrl: String): SavedPlant
    removeSavedPlant(id: ID!): SavedPlant
    updateSavedPlant(id: ID!, nickname: String, location: String): SavedPlant
  }
`;

export default typeDefs;