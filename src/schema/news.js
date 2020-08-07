const { gql } = require('apollo-server-express');

const RSSService = require("../services/RSSService");

// Construct a schema, using GraphQL schema language
const typeDef = gql`
    extend type Query {
        news(input: NewsInput): [News]
    }
    
    type News {
        link: String
        title: String
        publisher: String
        date: Float
        sent_s: Float
        sent_n: Float
    }
    
    input NewsInput {
        state: String,
        limit: Int,
        offset: Int
    }
`;

// Provide resolver functions for your schema fields
const resolver = {
    Query: {
        news: (_, { input }) => new Promise((res, rej) => {
            RSSService.getRSSData(input).then((results) => {
                res(results);
            });
        }),
    },
};

module.exports = {
    typeDef,
    resolver
};