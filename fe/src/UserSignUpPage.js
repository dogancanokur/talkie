import React from "react";
import {signup} from "./apiCalls";

class UserSignUpPage extends React.Component {

    state = {
        username: null, displayName: null, password: null, repeatPassword: null, pendingApiCall: false, errors: {}
    }

    render() {
        const {pendingApiCall, errors} = this.state;
        return <div>
            <h1 className="text-center">Sign Up</h1>
            <form className="container">
                {/*<div className="mb-3">*/}
                {/*    <label htmlFor={'email'} className="form-label">Email address</label>*/}
                {/*    <input type="text" className="form-control" id={'email'} aria-describedby="emailHelp"*/}
                {/*           autoComplete={'off'} name={'email'} onChange={this.onChangeInput}/>*/}
                {/*    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>*/}
                {/*</div>*/}
                <div className="mb-3">
                    <label htmlFor={'displayName'} className="form-label">Display Name</label>
                    <input className={(errors.displayName ? 'is-invalid ' : '') + 'form-control'}
                           id={'displayName'} name={'displayName'} required
                           autoComplete={'off'} onChange={this.onChangeInput} type="text"/>
                    <div className="invalid-feedback">{this.state.errors.displayName}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor={'username'} className="form-label">Username</label>
                    <div className="input-group has-validation">
                        <span className="input-group-text" id={'usernameInputGroupPrepend'}>@</span>
                        <input className={(errors.username ? 'is-invalid ' : '') + 'form-control'}
                               id={'username'} name={'username'} required
                               autoComplete={'off'} onChange={this.onChangeInput}
                               aria-describedby={'usernameInputGroupPrepend'} type="text"/>
                        <div className="invalid-feedback">{this.state.errors.username}</div>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor={'password'} className="form-label">Password</label>
                    <input className={(errors.password ? 'is-invalid ' : '') + 'form-control'}
                           id={'password'} name={'password'} required
                           onChange={this.onChangeInput} type="password"/>
                    <div className="invalid-feedback">{this.state.errors.password}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor={'repeatPassword'} className="form-label">Repeat Password</label>
                    <input className={'form-control'}
                           id={'repeatPassword'} name={'repeatPassword'} required
                           onChange={this.onChangeInput} type="password"/>
                </div>
                <div className={'text-center'}>
                    <button type="submit" className="btn btn-lg btn-primary" disabled={pendingApiCall}
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