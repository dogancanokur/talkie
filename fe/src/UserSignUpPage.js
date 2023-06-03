import React from "react";
import axios from "axios";

class UserSignUpPage extends React.Component {

    state = {
        username: null, displayName: null, password: null, repeatPassword: null, pendingApiCall: false
    }

    render() {
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
                    <input className="form-control" id={'displayName'} name={'displayName'} autoComplete={'off'}
                           type="text" onChange={this.onChangeInput}/>
                </div>
                <div className="mb-3">
                    <label htmlFor={'username'} className="form-label">Username</label>
                    <input className="form-control" id={'username'} name={'username'} autoComplete={'off'}
                           type="text" onChange={this.onChangeInput}/>
                </div>
                <div className="mb-3">
                    <label htmlFor={'password'} className="form-label">Password</label>
                    <input type="password" className="form-control" id={'password'} name={'password'}
                           onChange={this.onChangeInput}/>
                </div>
                <div className="mb-3">
                    <label htmlFor={'repeatPassword'} className="form-label">Repeat Password</label>
                    <input type="password" className="form-control" id={'repeatPassword'} name={'repeatPassword'}/>
                </div>
                <div className={'text-center'}>
                    <button type="submit" className="btn btn-lg btn-primary" disabled={this.state.pendingApiCall}
                            onClick={this.onClickSignUp}>
                        {this.state.pendingApiCall &&
                            <div className="spinner-border spinner-border-sm mr-1" role="status">
                                <span className="visually-hidden">Loading...</span></div>}
                        Submit
                    </button>
                </div>
            </form>
        </div>;
    }

    onChangeInput = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    onClickSignUp = (event) => {
        event.preventDefault();
        this.setState({pendingApiCall: true});
        const {username, displayName, password} = this.state;
        const body = {username, displayName, password};
        axios.post("/api/1.0/users", body).then(value => {
            console.error(value.message);
            this.setState({pendingApiCall: false});

        }).catch(reason => {
            console.error(reason.code + " -> " + reason.message);
            this.setState({pendingApiCall: false});
        });
    }
}

export default UserSignUpPage;