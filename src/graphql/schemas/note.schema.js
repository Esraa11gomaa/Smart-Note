// graphql/schemas/note.schema.js
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Date

  type User {
    _id: ID!
    username: String
    email: String
  }

  type Note {
    _id: ID!
    title: String!
    content: String!
    createdAt: Date!
    updatedAt: Date!
    owner: User!
  }

  type PaginatedNotes {
    notes: [Note!]!
    totalPages: Int!
    currentPage: Int!
  }

  input NoteFilterInput {
    userId: ID
    title: String
    from: Date
    to: Date
    page: Int = 1
    limit: Int = 10
  }

  type Query {
    notes(filter: NoteFilterInput): PaginatedNotes!
  }
`;
