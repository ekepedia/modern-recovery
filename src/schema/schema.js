const { gql } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { merge } = require("lodash");

const Test = require("./test");
const News = require("./news");


// Main Query Schema
const Query = gql`
    type Query {
        _empty: String
    }
`;

// Main Query Schema
const Mutation = gql`
    type Mutation {
        _empty: String
    }
`;

// Main Resolver
const resolvers = { };

const jsSchema = makeExecutableSchema({

    typeDefs: [
        Query,
        Mutation,
        Test.typeDef,
        News.typeDef
    ],

    resolvers: merge(
        resolvers,
        Test.resolver,
        News.resolver
    )
});

module.exports = jsSchema;