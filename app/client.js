import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom';

import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';

import Routing from "./components/infrastructure/Routing";
import "./style.css";

const client = new ApolloClient({
    uri: window.location.origin + "/graphql",
});

const app = document.getElementById('app');

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <Routing/>
        </ApolloProvider>
    </BrowserRouter>,
    app
);