import React from "react";
import Navbar from "../components/Navbar";
import {HashRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import LoginPage from "../LoginPage";
import UserSignUpPage from "../UserSignUpPage";
import 'bootstrap';
import HomePage from "../HomePage";
import UserPage from "../UserPage";

class App extends React.Component {
    render() {
        const {isLoggedIn} = false;
        return (<div>
            <Router>
                <Navbar/>
                <div className={'container mt-3'}>
                    <div className={'row'}>
                        <Switch>
                            <Route exact path={'/'} component={HomePage}></Route>
                            {!isLoggedIn && <Route path={'/login'} component={LoginPage}></Route>}
                            {!isLoggedIn && <Route path={'/signup'} component={UserSignUpPage}></Route>}
                            <Route path={'/user/:username'} component={UserPage}></Route>
                            <Redirect to={'/'}></Redirect>
                        </Switch>
                    </div>
                </div>
            </Router>
        </div>);
    }
}

export default App;
