import React from "react";
import Input from "./components/Input";
import {withTranslation} from "react-i18next";
import {login} from "./apiCalls";
import axios from "axios";
import ButtonWithProgress from "./components/ButtonWithProgress";

class LoginPage extends React.Component {
    state = {
        username: null, password: null, error: null, pendingApiCall: false
    }

    render() {
        const {t} = this.props;
        const {username, password, pendingApiCall} = this.state;
        const buttonEnabled = username && password;
        return <div>
            <h1 className="text-center">{t('login')}</h1>
            <form className="container">
                <Input id={'login_username'} name={'username'} label={t('signup.username')} autoComplete={'username'}
                       isRequired={true} onChange={this.onChangeInput} type={'text'} container={'mb-3'}/>
                <Input id={'login_password'} name={'password'} label={t('signup.password')} autoComplete={'password'}
                       isRequired={true} onChange={this.onChangeInput} type={'password'} container={'mb-3'}/>
                {this.state.error && <div className="alert alert-danger mt-2" role="alert">
                    {this.state.error}
                </div>}
                <ButtonWithProgress id={'login_button'}
                                    type={'button'}
                                    className={'btn btn-lg btn-primary'}
                                    containerClassName={'text-center'}
                                    disabled={!buttonEnabled || pendingApiCall}
                                    onClick={this.onClickLogin}
                                    pendingApiCall={pendingApiCall}
                                    text={t('login')}></ButtonWithProgress>
            </form>
        </div>;
    }

    onChangeInput = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value, error: null
        });
    }
    onClickLogin = async (event) => {
        event.preventDefault();
        const {username, password} = this.state;
        const creds = {username, password};
        this.setState({error: null});
        try {
            const response = await login(creds);
            console.table(response.data);
        } catch (apiError) {
            this.setState({
                error: apiError.response.data.message
            });
        }
    }

    componentDidMount() {
        axios.interceptors.request.use(request => {
            this.setState({pendingApiCall: true});
            return request;
        });
        axios.interceptors.response.use(response => {
            this.setState({pendingApiCall: false});
            return response;
        }, error => {
            this.setState({pendingApiCall: false});
            throw error;
        });
    }
}


const LoginPageWithTranslations = withTranslation()(LoginPage);
export default LoginPageWithTranslations;