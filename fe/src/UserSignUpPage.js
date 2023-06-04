import React from "react";
import {signup} from "./apiCalls";
import Input from "./components/Input";

class UserSignUpPage extends React.Component {

    state = {
        username: null, displayName: null, password: null, repeatPassword: null, pendingApiCall: false, errors: {}
    }

    render() {
        const {pendingApiCall, errors} = this.state;
        return <div>
            <h1 className="text-center">Sign Up</h1>
            <form className="container">
                {/*<Input id={'email'} name={'email'} label="E-Mail" container={'mb-3'}*/}
                {/*       info="We'll never share your email with anyone else."*/}
                {/*       error={errors.email} onChange={this.onChangeInput} isRequired={true}*/}
                {/*       type={'text'}/>*/}
                <Input id={'username'} name={'username'} label="Username" container={'mb-3'}
                       error={errors.username} onChange={this.onChangeInput} isRequired={true}
                       type={'text'}/>
                <Input id={'displayName'} name={'displayName'} label="Display Name" container={'mb-3'}
                       error={errors.displayName} onChange={this.onChangeInput} isRequired={true}/>
                <Input id={'password'} name={'password'} label="Password" container={'mb-3'}
                       error={errors.password} onChange={this.onChangeInput} isRequired={true}
                       type={'password'}/>
                <Input id={'repeatPassword'} name={'repeatPassword'} label="Repeat Password" container={'mb-3'}
                       onChange={this.onChangeInput} isRequired={true} type={'password'} error={errors.repeatPassword}/>
                <div className={'text-center'}>
                    <button type="submit" className="btn btn-lg btn-primary"
                            disabled={pendingApiCall || errors.repeatPassword}
                            onClick={this.onClickSignUp}>
                        {pendingApiCall && <div className="spinner-border spinner-border-sm mr-1" role="status">
                            <span className="visually-hidden">Loading...</span></div>}
                        Submit
                    </button>
                </div>
            </form>
        </div>;
    }

    onChangeInput = (event) => {
        const {name, value} = event.target;
        const errors = {...this.state.errors};
        errors[name] = undefined;
        if ((name === 'password' && this.state.repeatPassword !== value) || (name === 'repeatPassword' && this.state.password !== value)) {
            errors.repeatPassword = 'Password mismatch';
        } else {
            errors.repeatPassword = undefined;
        }
        this.setState({
            [name]: value, errors
        });
    }

    onClickSignUp = async (event) => {
        event.preventDefault();
        this.setState({pendingApiCall: true});
        const {username, displayName, password} = this.state;
        const body = {username, displayName, password};
        try {
            const response = await signup(body);
            console.info(response.status + ' -> ' + response.data.message);
            this.setState({pendingApiCall: false});
        } catch (e) {
            console.error(e.response.data);
            let {validationErrors} = e.response.data;
            this.setState({errors: validationErrors ? validationErrors : {}});
            this.setState({pendingApiCall: false});
        }
    }
}

export default UserSignUpPage;