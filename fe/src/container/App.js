import React from "react";
import ApiProgress from "../shared/ApiProgress";
import UserSignUpPage from "../UserSignUpPage";
import LanguageSelector from "../components/LanguageSelector";
import LoginPage from "../LoginPage";

function App() {
    return (<div className={'row'}>
        <div className="col">
            <ApiProgress path={'/api/1.0/users'}>
                <UserSignUpPage/>
            </ApiProgress>
        </div>
        <div className="col">
            <ApiProgress path={'/api/1.0/auth'}>
                <LoginPage/>
            </ApiProgress>
        </div>
        <LanguageSelector/>
    </div>);
}

export default App;
