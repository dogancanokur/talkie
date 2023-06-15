import React from "react";
import {login} from "./apiCalls";
import Input from "./components/Input";
import ButtonWithProgress from "./components/ButtonWithProgress";
import {withTranslation} from "react-i18next";
import {withApiProgress} from "./shared/ApiProgress";

class LoginPage extends React.Component {
    state = {
        username: null, password: null, error: null
    }

    render() {
        const {t, pendingApiCall} = this.props;
        const {username, password} = this.state;
        const buttonEnabled = username && password;
        return <div>
            <h1 className="text-center">{t('login')}</h1>
            <form className="container">
                <Input id={'login_username'} name={'username'} label={t('username')} autoComplete={'username'}
                       isRequired={true} onChange={this.onChangeInput} type={'text'} container={'mb-3'}/>
                <Input id={'login_password'} name={'password'} label={t('signup.password')} autoComplete={'password'}
                       isRequired={true} onChange={this.onChangeInput} type={'password'} container={'mb-3'}/>
                {this.state.error && <div className="alert alert-danger mt-2" role="alert">
                    {this.state.error}
                </div>}
                <ButtonWithProgress id={'login_button'}
                                    className={'btn btn-lg btn-primary'}
                                    containerClassName={'text-center'}
                                    disabled={!buttonEnabled || pendingApiCall}
                                    onClick={this.onClickLogin}
                                    pendingApiCall={pendingApiCall}
                                    text={t('login')}/>
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
        const {history, onLoginSuccess} = this.props;
        try {
            const response = await login(creds);
            history.push('/'); // redirect to '/'
            onLoginSuccess(response.data.username);
        } catch (apiError) {
            this.setState({
                error: apiError.response.data.message
            });
        }
    }

}


const LoginPageWithTranslations = withTranslation()(LoginPage);
const LoginPageWithApiProgress = withApiProgress(LoginPageWithTranslations, '/api/1.0/auth')
export default LoginPageWithApiProgress;