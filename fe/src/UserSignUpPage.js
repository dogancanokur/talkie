import React from "react";
import {changeLanguage, signup} from "./apiCalls";
import Input from "./components/Input";
import './i18n';
import {withTranslation} from "react-i18next";

class UserSignUpPage extends React.Component {

    state = {
        username: null, displayName: null, password: null, repeatPassword: null, pendingApiCall: false, errors: {}
    }

    render() {
        const {pendingApiCall, errors} = this.state;
        const {t} = this.props;
        return <div>
            <h1 className="text-center">{t('signup.header')}</h1>
            <form className="container">
                {/*<Input id={'email'} name={'email'} label="E-Mail" container={'mb-3'}*/}
                {/*       info="We'll never share your email with anyone else."*/}
                {/*       error={errors.email} onChange={this.onChangeInput} isRequired={true}*/}
                {/*       type={'text'}/>*/}
                <Input id={'username'} name={'username'} label={t('signup.username')} container={'mb-3'}
                       error={errors.username} onChange={this.onChangeInput} isRequired={true} autoComplete={'username'}
                       type={'text'}/>
                <Input id={'displayName'} name={'displayName'} label={t('signup.displayName')} container={'mb-3'}
                       autoComplete={'displayName'} error={errors.displayName} onChange={this.onChangeInput}
                       isRequired={true}/>
                <Input id={'password'} name={'password'} label={t('signup.password')} container={'mb-3'}
                       error={errors.password} onChange={this.onChangeInput} isRequired={true} type={'password'}/>
                <Input id={'repeatPassword'} name={'repeatPassword'} label={t('signup.repeatPassword')}
                       container={'mb-3'} onChange={this.onChangeInput} isRequired={true} type={'password'}
                       error={errors.repeatPassword}/>
                <div className={'text-center'}>
                    <button type="submit" className="btn btn-lg btn-primary"
                            disabled={pendingApiCall || errors.repeatPassword} onClick={this.onClickSignUp}>
                        {pendingApiCall && <div className="spinner-border spinner-border-sm mr-1" role="status">
                            <span className="visually-hidden"></span></div>}
                        {t('signup.submit')}
                    </button>
                </div>
            </form>
            <div className="container">
                <img onClick={() => this.onChangeLanguage('tr')}
                     style={{cursor: 'pointer'}}
                     src="https://flagsapi.com/TR/shiny/32.png"
                     alt="Flag of Turkiye"/>
                <img onClick={() => this.onChangeLanguage('en')}
                     style={{cursor: 'pointer'}}
                     src="https://flagsapi.com/GB/shiny/32.png"
                     alt="Flag of UK"/>
            </div>
        </div>;
    }

    onChangeInput = (event) => {
        const {t} = this.props;
        const {name, value} = event.target;
        const errors = {...this.state.errors};
        errors[name] = undefined;
        if ((name === 'password' && this.state.repeatPassword !== value) || (name === 'repeatPassword' && this.state.password !== value)) {
            errors.repeatPassword = t('signup.warning.passwordMismatch');
        } else {
            errors.repeatPassword = undefined;
        }
        this.setState({
            [name]: value, errors
        });
    }
    onChangeLanguage = (language) => {
        const {i18n} = this.props;
        i18n.changeLanguage(language);
        changeLanguage(language);
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

const UserSignUpPAgeWithTranslations = withTranslation()(UserSignUpPage);
export default UserSignUpPAgeWithTranslations;