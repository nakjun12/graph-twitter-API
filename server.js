import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    text: String
  }
`;

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
  console.log(`Running on ${url} `);
});
/*listen은 promise를 의미한다.
graphql은 data 의 shap을 알고 있어야함
REST API는 URL들의 집합
GraphQL은 타입들의 집합
*/
