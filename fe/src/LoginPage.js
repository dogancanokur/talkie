import React from "react";
import Input from "./components/Input";
import {withTranslation} from "react-i18next";
import {login} from "./apiCalls";

class LoginPage extends React.Component {
    state = {
        username: null, password: null
    }

    render() {
        const {t} = this.props;
        return <div>
            <h1 className="text-center">{t('login')}</h1>
            <form className="container">
                <Input id={'login_username'} name={'username'} label={t('signup.username')}
                       isRequired={true} onChange={this.onChangeInput} type={'text'} container={'mb-3'}/>
                <Input id={'login_password'} name={'password'} label={t('signup.password')}
                       isRequired={true} onChange={this.onChangeInput} type={'password'} container={'mb-3'}/>
                <div className={'text-center'}>
                    <button className="btn btn-lg btn-primary" id={'login_submit'} type={'button'}
                            onClick={this.onClickLogin}>{t('login')}</button>
                </div>
            </form>
        </div>;
    }

    onChangeInput = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }
    onClickLogin = async (event) => {
        event.preventDefault();
        const {username, password} = this.state;
        const creds = {username, password};
        try {
            const response = await login(creds);
            console.info(response.status + ' -> ' + response.data.message);
        } catch (e) {
            console.error(e.response.data);
        }
    }
}


const LoginPageWithTranslations = withTranslation()(LoginPage);
export default LoginPageWithTranslations;