import React from 'react';
import {axiosChangeLanguage} from "../apiCalls";
import {withTranslation} from "react-i18next";

const LanguageSelector = (props) => {

    const onChangeLanguage = (language) => {
        const {i18n} = props;
        i18n.changeLanguage(language);
        axiosChangeLanguage(language);
    }
    return (
        <div className="container">
            <img onClick={() => onChangeLanguage('tr')}
                 style={{cursor: 'pointer'}}
                 src="https://flagsapi.com/TR/shiny/32.png"
                 alt="Flag of Turkiye"/>
            <img onClick={() => onChangeLanguage('en')}
                 style={{cursor: 'pointer'}}
                 src="https://flagsapi.com/GB/shiny/32.png"
                 alt="Flag of UK"/>
        </div>
    );
};
export default withTranslation()(LanguageSelector);
