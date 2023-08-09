import React from "react";
import Navbar from "../components/Navbar";
import {HashRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import LoginPage from "../LoginPage";
import UserSignUpPage from "../UserSignUpPage";
import 'bootstrap';
import HomePage from "../HomePage";
import UserPage from "../UserPage";

class App extends React.Component {
    state = {
        username: null,
        isLoggedIn: false,
    }
    onLoginSuccess = (username) => {
        this.setState({username, isLoggedIn: true});
    }
    onLogoutSuccess = () => {
        this.setState({username: null, isLoggedIn: false});
    }

    render() {
        const {username, isLoggedIn} = this.state;
        return (<div>
            <Router>
                <Navbar username={username} isLoggedIn={isLoggedIn} onLogoutSuccess={this.onLogoutSuccess}></Navbar>
                <div className={'container'}>
                    <div className={'row'}>
                        <Switch>
                            <Route exact path={'/'} component={HomePage}></Route>
                            {/*props => reactRouterProps*/}
                            {!isLoggedIn && <Route path={'/login'} component={(props) => {
                                return <LoginPage {...props} onLoginSuccess={this.onLoginSuccess}/>;
                            }}></Route>}
                            {!isLoggedIn && <Route path={'/signup'} component={UserSignUpPage}></Route>}
                            <Route path={'/user/:username'} component={(props) => {
                                return <UserPage {...props} username={username}/>
                            }}></Route>
                            <Redirect to={'/'}></Redirect>
                        </Switch>
                    </div>
                </div>
            </Router>
        </div>);
    }
}

export default App;
