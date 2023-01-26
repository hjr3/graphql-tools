import { IResolvers } from '@graphql-tools/utils';
import { buildSubgraphSchema } from '../../../../src';

export const typeDefs = /* GraphQL */ `
  extend type Query {
    me: User
    users: [User]
  }

  type User @key(fields: "id") {
    id: ID!
    name: String
    birthDate: String
    username: String
  }
`;

const resolvers: IResolvers = {
  Query: {
    me() {
      return users[0];
    },
    users() {
      return users;
    },
  },
  User: {
    __resolveReference(object) {
      return users.find(user => user.id === object.id);
    },
  },
};

export const schema = buildSubgraphSchema({
  typeDefs,
  resolvers: resolvers as any,
});

const users = [
  {
    id: '1',
    name: 'Ada Lovelace',
    birthDate: '1815-12-10',
    username: '@ada',
  },
  {
    id: '2',
    name: 'Alan Turing',
    birthDate: '1912-06-23',
    username: '@complete',
  },
];
