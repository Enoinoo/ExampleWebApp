const { ApolloServer } = require("apollo-server");

const typeDefs = `
    type User {
        id: ID
        name: String
    }  
    type Query {
        user: User
    }
`;
const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
