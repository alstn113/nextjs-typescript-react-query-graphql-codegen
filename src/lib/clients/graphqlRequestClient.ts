import { GraphQLClient } from 'graphql-request';

const grahpqlRequestClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string,
  {},
);

export default grahpqlRequestClient;
