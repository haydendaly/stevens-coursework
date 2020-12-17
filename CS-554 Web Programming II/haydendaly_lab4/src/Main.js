import React from "react";
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import Home from "./Home";
import List from "./Lists";
import Details from "./Details";
import Error from "./Error";
 
const Main = () => {
    return (
        <Router>
            <div>
                <h1>Marvel Database</h1>
                <ul className="header">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/characters/page/0">Characters</NavLink></li>
                    <li><NavLink to="/comics/page/0">Comics</NavLink></li>
                    <li><NavLink to="/series/page/0">Series</NavLink></li>
                </ul>
                <div className="content">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/:type/page/:pagenum" component={List}/>
                        <Route path="/:type/:id" component={Details}/>
                        <Route component={Error}/>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}
 
export default Main;