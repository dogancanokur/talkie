import React from "react";
import {signup} from "./apiCalls";
import Input from "./components/Input";
import ButtonWithProgress from "./components/ButtonWithProgress";
import {withTranslation} from "react-i18next";

class UserSignUpPage extends React.Component {

    state = {
        username: null, displayName: null, password: null, repeatPassword: null, errors: {}
    }

    render() {
        const {errors} = this.state;
        const {t, pendingApiCall} = this.props;
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
                <ButtonWithProgress id={'signup_button'}
                                    type={'submit'}
                                    className={'btn btn-lg btn-primary'}
                                    containerClassName={'text-center'}
                                    disabled={pendingApiCall || errors.repeatPassword}
                                    onClick={this.onClickSignUp}
                                    pendingApiCall={pendingApiCall}
                                    text={t('signup.submit')}></ButtonWithProgress>
            </form>
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
    onClickSignUp = async (event) => {
        event.preventDefault();
        const {username, displayName, password} = this.state;
        const body = {username, displayName, password};
        try {
            const response = await signup(body);
            console.info(response.status + ' -> ' + response.data.message);
        } catch (e) {
            console.error(e.response.data);
            let {validationErrors} = e.response.data;
            this.setState({errors: validationErrors ? validationErrors : {}});
        }
    }
}

const SignUpPageWithTranslations = withTranslation()(UserSignUpPage);
export default SignUpPageWithTranslations;