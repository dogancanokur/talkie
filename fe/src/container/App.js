import React from "react";
import UserSignUpPage from "../UserSignUpPage";
import LanguageSelector from "../components/LanguageSelector";
import LoginPage from "../LoginPage";

function App() {
    return (<div className={'row'}>
        <div className="col">
            <UserSignUpPage/>
        </div>
        <div className="col">
            <LoginPage/>
        </div>
        <LanguageSelector/>
    </div>);
}

export default App;
