import React from "react";
import Navbar from "../components/Navbar";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import LoginPage from "../LoginPage";
import UserSignUpPage from "../UserSignUpPage";
import 'bootstrap';
import HomePage from "../HomePage";
import {UserPage} from "../UserPage";

function App() {
    return (<div>
        <Router>{/*<BrowserRouter>*/}
            <Navbar></Navbar>
            <div className={'container'}>
                <div className={'row'}>
                    <Switch>
                        <Route exact path={'/'} component={HomePage}></Route>
                        <Route path={'/login'} component={LoginPage}></Route>
                        <Route path={'/signup'} component={UserSignUpPage}></Route>
                        <Route path={'/user/:username'} component={UserPage}></Route>
                        <Redirect to={'/'}></Redirect>
                    </Switch>
                </div>
            </div>
        </Router>
    </div>);
}

export default App;
