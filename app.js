require('dotenv').config();
require("./logger");

const winston = require("winston");

const express = require('express');
const app     = express();

const { ApolloServer } = require('apollo-server-express');
const Schema = require("./src/schema/schema");

const server = new ApolloServer({ schema: Schema, playground: true });

server.applyMiddleware({ app });

app.use(require('express').static(__dirname + '/app/public'));

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.get("*", function (req, res) {
    res.render("main");
});

app.listen((process.env.PORT || 4000), function () {
    winston.info('App listening on port ', (process.env.PORT || 4000));
    winston.info(`GraphQL available at ${server.graphqlPath}`);
});
