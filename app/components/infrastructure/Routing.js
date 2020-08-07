import React from "react";
import { Switch, Route } from 'react-router-dom';

import Home from "../../scenes/Home";

export default class Routing extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='*' component={Home}/>
                </Switch>
            </main>
        );
    }
}