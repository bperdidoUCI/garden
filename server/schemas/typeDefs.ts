import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    token: String
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

  type JournalEntry {
    _id: ID!
    savedPlantId: ID!
    userId: ID!
    date: String!
    status: String
    notes: String
    image: String
    createdAt: String
    updatedAt: String
  }

  type PlantResult {
  id: ID!
  common_name: String
  scientific_name: String
  image_url: String
  }

  type Query {
    me: User
    getSavedPlantsByUser(userId: ID!): [SavedPlant]
    getSavedPlantById(id: ID!): SavedPlant
    getJournalEntriesByPlant(savedPlantId: ID!): [JournalEntry]
    getJournalEntryById(id: ID!): JournalEntry
    searchPlants(query: String!): [PlantResult]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User

    addSavedPlant(trefleId: String!, nickname: String, location: String, imageUrl: String): SavedPlant
    removeSavedPlant(id: ID!): SavedPlant
    updateSavedPlant(id: ID!, nickname: String, location: String): SavedPlant

    addJournalEntry(savedPlantId: ID!, date: String!, status: String, notes: String, image: String): JournalEntry
    updateJournalEntry(id: ID!, status: String, notes: String, image: String): JournalEntry
    deleteJournalEntry(id: ID!): JournalEntry
  }
`;

export default typeDefs;