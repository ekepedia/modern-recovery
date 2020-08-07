const { gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDef = gql`
    extend type Query {
        test(input: TestInput): Test
    }
    
    type Test {
        test_id: String
    }
    
    input TestInput {
        test_id: String
    }
`;

// Provide resolver functions for your schema fields
const resolver = {
    Query: {
        test: (_, { input }) => new Promise((res, rej) => {
            res({
                test_id: input.test_id
            })
        }),
    },
};

module.exports = {
    typeDef,
    resolver
};