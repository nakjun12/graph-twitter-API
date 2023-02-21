import { ApolloServer, gql } from "apollo-server";

let tweets = [
  {
    id: "1",
    text: "hello1",
    userId: "3",
  },
  {
    id: "2",
    text: "hello2",
    userId: "1",
  },
  {
    id: "3",
    text: "hello3",
    userId: "1",
  },
];

let users = [
  {
    id: "1",
    firstName: "나",
    lastName: "준",
    fullName: "김치",
  },
  {
    id: "3",
    firstName: "김",
    lastName: "치",
  },
];

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    """
    Is the sum of first name + last name
    """
    fullName: String
  }

  type Tweet {
    id: ID
    text: String
    number: Int
    checked: Boolean
    author: User
  }

  type Query {
    allUsers: [User]!
    allTweets: [Tweet]!
    tweet(id: ID): Tweet
    ping: String!
  }
  type Mutation {
    postTweet(text: String, userId: ID): Tweet!
    """
    Deletes a Tweet if found, eles returns false
    """
    deleteTweet(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    tweet(root, { id }) {
      return tweets.find((tweet) => tweet.id === id);
    },
    ping() {
      return "pong";
    },
    allTweets() {
      return tweets;
    },
    allUsers() {
      console.log(`first`);
      return users;
    },
  },
  Mutation: {
    postTweet(root, { text, userId }) {
      const newTweet = { id: tweets.length + 1, text, userId };
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweet(_, { id }) {
      const tweet = tweets.find((tweet) => tweet.id === id);
      if (!tweet) return false;
      tweets = tweets.filter((tweet) => tweet.id !== id);
      return true;
    },
  },
  User: {
    fullName({ firstName, lastName }) {
      console.log(`second`);
      return `${firstName} ${lastName}`;
    },
  },
  Tweet: {
    author({ userId }) {
      console.log(userId);
      return users.find((user) => user.id === userId);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url} `);
});
/*listen은 promise를 의미한다.
graphql은 data 의 shap을 알고 있어야함
REST API는 URL들의 집합
GraphQL은 타입들의 집합
*/
