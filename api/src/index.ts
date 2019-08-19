import * as path from "path";
import { ApolloServer } from "apollo-server";
import { objectType, makeSchema } from "@prisma/nexus";
import { nexusPrismaPlugin } from "@generated/nexus-prisma";
import Photon from "@generated/photon";

const Query = objectType({
  name: "Query",
  definition(t) {
    t.crud.findOneUser();
    t.crud.findManyUser();
  }
});

const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.name();
  }
});

const photon = new Photon();

const nexusPrisma = nexusPrismaPlugin({
  photon: ctx => ctx.photon
});

const schema = makeSchema({
  types: [Query, User, nexusPrisma],

  outputs: {
    schema: path.join(__dirname, "./generated/schema.graphql"),
    typegen: path.join(__dirname, "./generated/nexus.ts")
  }
});

const server = new ApolloServer({
  schema,
  context: { photon }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
